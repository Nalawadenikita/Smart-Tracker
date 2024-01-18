import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { RefillersService } from 'src/app/services/features/refillers/refillers.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-refiller-add',
  templateUrl: './refiller-add.component.html',
  styleUrls: ['./refiller-add.component.scss']
})
export class RefillerAddComponent implements OnInit {
  formBuilder: any;
  distributerForm: any;
  submitted = false;
  enterCustomer: any;
  customerList: any;
  popupbtn: string = '';
  formData: any;
  isEdit = false;
  isActive: boolean = false;
  public subscription: Subscription = new Subscription();
  refillerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(3),
    ]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[789][0-9]{9}$'),
    ]),
    // active: new FormControl(false),
    distributorId: new FormControl(
      JSON.parse(this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT))[
        'DISTRIBUTOR_ID'
      ],
      [Validators.required]
    ),
  });

  constructor(
    private router: Router,
    private refillerService: RefillersService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.formData = this.refillerService.rowData;
  }

  ngOnInit(): void {
    if (this.refillerService.rowData) {
      this.refillerForm.patchValue(this.formData);
    }
    this.subscription.add(

      this.route.queryParams.subscribe((params) => {
        this.isEdit = params['editing'];
      })
    )
  }
  get label(): string {
    return this.isEdit ? 'Edit Refiller' : 'Add Refiller';
  }

  get dist() {
    return this.refillerForm.controls;
  }

  validateNumber(event: any) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];
    const specialChars = [
      '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',',
      '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\',
      ']', '^', '_', '`', '{', '|', '}', '~'
    ];

    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      ) || (specialChars.includes(event.key))
    ) {
      event.preventDefault();
    }
  }

  restrictInitialSpace(event: KeyboardEvent) {    
    const inputElement = event.target as HTMLInputElement;
    
    const forbiddenKey = ' '; // Space character
    if (inputElement.value == '' && event.key === forbiddenKey) {
      event.preventDefault();
    }
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.refillerForm.invalid) {
      return;
    }

    this.addRefiller();
  }

  validateText(event: any) {
    let numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (numericKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  addRefiller() {
    this.submitted = true;
    if (this.refillerForm.invalid) {
      return;
    }
    this.subscription.add(

      this.refillerService
        .addRefillers(this.refillerForm.value)
        .pipe(catchError((err) => of(err)))
        .subscribe((res: any) => {
          // this.isLoading=false
          if (res.success) {
            this.router.navigate(['features/refillers']);
            Swal.fire({
              title: 'Refiller added successfully',
              icon: 'success',
            });
          } else {
            // this.isLoading=false
            if (res.status == 500) {
              Swal.fire({
                title: ' Internal Server Error',
                text: 'There was an error on the server. Please try again later.',
                icon: 'error',
              });
            } else if(res.error.message) {            
              Swal.fire({
                title: res.error.message,
                icon: 'error',
              });
            } 
            else {
              Swal.fire({
                title: res.error.data.message,
                icon: 'error',
              });
            }
          }
        })
    )
  }
  
  editRefiller() {
        this.submitted = true;

    this.refillerForm.get('defaultsite')?.clearValidators();
    this.refillerForm.get('defaultsite')?.updateValueAndValidity();  

    if (this.refillerForm.invalid) {
      return;
    }
    this.subscription.add(

      this.refillerService
        .editRefiller(this.refillerForm.value, this.formData.id)
        .pipe(catchError((err) => of(err)))
        .subscribe((res: any) => {
          console.log(res);
          if (res.success) {
            this.router.navigate(['features/refillers']);
            Swal.fire({
              title: 'Refiller edited successfully',
              icon: 'success',
            });
            this.refillerService.rowData = null;
            this.formData = null;
          } 
          else if(res.error.message) {            
            Swal.fire({
              title: res.error.message,
              icon: 'error',
            });
          } else {
            // this.isLoading=false
            if (res.status == 500) {
              Swal.fire({
                title: ' Internal Server Error',
                text: 'There was an error on the server. Please try again later.',
                icon: 'error',
              });
            } else {
              Swal.fire({
                title: res.error.data.message,
                icon: 'error',
              });
            }
          }
        })
    )
     this.refillerForm.get('defaultsite')?.setValidators([Validators.required]);
    this.refillerForm.get('defaultsite')?.updateValueAndValidity();
  }

  onclick() {
    this.router.navigate(['/features/refillers']);
    this.refillerService.rowData = null;
    this.formData = null;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
