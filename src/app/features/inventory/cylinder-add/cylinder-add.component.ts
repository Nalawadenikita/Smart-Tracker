import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CylinderSizeService } from 'src/app/services/features/cylinderSize/cylinder-size.service';
import { DistributorService } from 'src/app/services/features/distributor/distributor.service';
import { GasTypeService } from 'src/app/services/features/gasType/gas-type.service';
import { InventoryService } from 'src/app/services/features/invetory/inventory.service';
import { OwnerService } from 'src/app/services/features/owner/owner.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import Swal from 'sweetalert2';
import { Subscription, catchError, of } from 'rxjs';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { codeFormatValidator } from '../inventory.component';

@Component({
  selector: 'app-cylinder-add',
  templateUrl: './cylinder-add.component.html',
  styleUrls: ['./cylinder-add.component.scss'],
})
export class CylinderAddComponent implements OnInit {
  loggedInDistributorId = JSON.parse(
    atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1])
  )['DISTRIBUTOR_ID'];
  public gasTypeCylinder: any = [];
  submitted = false;
  enterinventory: any;
  inventoryList: any;
  title = 'matselect';
  dialogRef: any;
  cylindereditdata: any;
  isEdit = false;
  inProgress = false;
  constructor(
    private router: Router,
    private gasTypeServices: GasTypeService,
    private CylinderSizeServices: CylinderSizeService,
    private inventoryServices: InventoryService,
    private storageService: StorageService,
    private distributerUserService: DistributorService,
    private ownerServices: OwnerService,
    private route: ActivatedRoute
  ) {}
  public subscription: Subscription = new Subscription();
  public cylinderSize = [];
  public distributorId = [];
  public ownertype = [];
  selectedValue: string | undefined;
  CylinderValue: string | undefined;
  DistributorId: string | undefined;

  selectedGasName: any;
  selectCylindersize: any;
  ngOnInit(): void {
    this.gasTypeList();
    this.cySize();
    // this.distId();
    this.ownerTypes();
    if (this.inventoryServices.rowData) {
      this.cylindereditdata = this.inventoryServices.rowData;
      this.cylinderForm.patchValue({
        gasType: this.inventoryServices.rowData.gasTypeId,
        cylinderType: this.inventoryServices.rowData.cylinderSizeId,
        cylinderCode: this.inventoryServices.rowData.cylinderCode,
        owner: this.inventoryServices.rowData.owner,
        rented: this.inventoryServices.rowData.rented,
        cylinderQrCode:this.inventoryServices.rowData.cylinderQrCode
      });
    }
this.subscription.add(

  this.route.queryParams.subscribe((params) => {
    this.isEdit = params['editing'];
  })
)
  }
  get label(): string {
    return this.isEdit ? 'Edit Cylinder' : 'Add Cylinder';
  }

  gasTypeList() {
    this.subscription.add(

      this.gasTypeServices.getGasType({page: 1, pageSize: 1000}).subscribe((data: any) => {
        if (data) {        
          this.gasTypeCylinder = data.data.data;
        }
      })
    )
  }

  cySize() {
    this.subscription.add(

      this.CylinderSizeServices.getCylinderSize({page: 1, pageSize: 1000}).subscribe((res: any) => {
        this.cylinderSize = res.data.data;
      })
    )
    this.selectCylindersize = this.cylinderSize[0];
  }
  distId() {
    this.subscription.add(

      this.ownerServices.getOwner().subscribe((data: any) => {
        this.ownertype = data;
      })
    )
  }
  ownerTypes() {
    this.subscription.add(

      this.ownerServices.getOwner().subscribe((data: any) => {
  
        this.ownertype = data;
      })
    )
  }
  cylinderForm = new FormGroup({
    gasType: new FormControl('', [Validators.required]),
    cylinderType: new FormControl('', [Validators.required]),
    cylinderCode: new FormControl('', [Validators.required ,codeFormatValidator()]),
    owner: new FormControl('', [Validators.required]),
    cylinderQrCode:new FormControl(''),
    rented: new FormControl(false),
    distributor_id: new FormControl(
      JSON.parse(
        atob(
          this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1]
        )
      )['DISTRIBUTOR_ID'],
      [Validators.required]
    ),
  });




 


  get dist() {
    return this.cylinderForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.cylinderForm.invalid) {
      return;
    }
    this.addInventory();
  }

  addInventory() {
    this.inProgress = true;
    this.subscription.add(

      this.inventoryServices
        .addInventory({
          gasType: this.cylinderForm.value.gasType,
          cylinderSize: this.cylinderForm.value.cylinderType,
          cylinderCode: this.cylinderForm.value.cylinderCode.trim(),
          owner: this.cylinderForm.value.owner,
          rented: this.cylinderForm.value.rented,
          cylinderQrCode:this.cylinderForm.value.cylinderQrCode,
          distributor_id: this.cylinderForm.value.distributor_id,
        }).pipe(catchError((err) => of(err)))
        .subscribe(
          (res) => {
            this.inventoryList = res;
            this.inProgress = false;
            if(res.success){
  
            this.router.navigate(['/features/inventory']);
            Swal.fire({
              title: 'Cylinder added successfully',
              icon: 'success',
            });
          }
          else{
  
            if (res.status == 500) {
              Swal.fire({
                title: ' Something went wrong',
                text: 'There was an error on the server. Please try again later.',
                icon: 'error',
              });
              this.inProgress = false;
            } else if(res.status==400){
              Swal.fire({
                title: res.error.cylinderCode,
                icon: 'error',
              });
              this.inProgress = false;
            }
            else{
              Swal.fire({
                title: res.error.data.message,
                icon: 'error',
              });
              this.inProgress = false;
            }
  
          }
          }
        )
    )
  }

  editInventory() {

    this.submitted = true;

    if(this.cylinderForm.invalid) {
      return
    }
  
    this.subscription.add(

      this.inventoryServices
        .editInventory(
          {
            cylinderCode: this.cylinderForm.value.cylinderCode,
            cylinderQrCode:this.cylinderForm.value.cylinderQrCode,
            cylinderSize: this.cylinderForm.value.cylinderType,
            distributor_id: JSON.parse(
              atob(
                this.storageService
                  .get(LOCALSTORAGE_KEYS.ACCESS_TOKEN)
                  .split('.')[1]
              )
            )['DISTRIBUTOR_ID'],
            gasType: this.cylinderForm.value.gasType,
            owner: this.cylinderForm.value.owner,
            rented: this.cylinderForm.value.rented,
          },
          this.cylindereditdata.id
        )
        .pipe(catchError((err) => of(err))).subscribe(
          (res) => {
           
            this.inventoryServices.rowData = null;
            this.cylindereditdata.value = null;
            if(res.success){
            this.router.navigate(['/features/inventory']);
            Swal.fire({
              title: 'Cylinder edited successfully',
              icon: 'success',
            });
          }
          else{
            if (res.status == 500) {
              Swal.fire({
                title: ' Something went wrong',
                text: 'There was an error on the server. Please try again later.',
                icon: 'error',
              });
            } else if(res.status==400){
              Swal.fire({
                title: res.error.cylinderCode,
                icon: 'error',
              });
            }
            else{
              Swal.fire({
                title: res.error.data.message,
                icon: 'error',
              });
            }
          }
          }
        )
    )
  }


  restrictSpace(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const forbiddenKey = ' '; // Space character

    if (event.key === forbiddenKey) {
      event.preventDefault();
    }
  }

  onclick() {
    this.router.navigate(['/features/inventory']);
    this.inventoryServices.rowData = null;
    this.cylindereditdata.value = null;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
