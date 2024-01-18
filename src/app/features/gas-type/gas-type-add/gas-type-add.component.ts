import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GasTypeService } from 'src/app/services/features/gasType/gas-type.service';
import { Subscription, catchError, of } from 'rxjs';
@Component({
  selector: 'app-gas-type-add',
  templateUrl: './gas-type-add.component.html',
  styleUrls: ['./gas-type-add.component.scss'],
})
export class GasTypeAddComponent implements OnInit {
  submitted = false;
  enterGastype: any;
  gasTypeList: any;
  public subscription: Subscription = new Subscription();
  constructor(
    private router: Router,
    private dialogRef: MatDialog,
    private gasTypeServices: GasTypeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.gasFrom.patchValue(data);
    this.isEditing = false;
  }

  @Input() isEditing: boolean;
  get label(): string {
    return this.isEditing ? 'Edit GasType' : 'Add Gas Type';
  }

  ngOnInit(): void {}
  gasFrom = new FormGroup({
    gasName: new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    gasSymbol: new FormControl('', [Validators.required]),
  });

  get dist() {
    return this.gasFrom.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.gasFrom.invalid) {
      return;
    }
    this.addGastype();
  }

  onclick() {
    this.router.navigate(['/features/gas-type/gas-type-list']);
  }

  addGastype() {
    this.enterGastype = this.gasFrom.value;
this.subscription.add(

  this.gasTypeServices.addGastype(this.enterGastype).pipe(catchError((err)=> of(err))).subscribe((res:any)=>{
    if(res.success){
      this.dialogRef.closeAll();
    Swal.fire(
      {
        title:'Gas Type added successfully',
        icon:'success'
      }
    ) 
  }
  else{
    if (res.status == 500) {
      Swal.fire({
        title: ' Something went wrong',
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
     
    
  }

  validateText(event: any) {
    let numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (numericKeys.includes(event.key)) {
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

  editGasType() {
this.subscription.add(

  this.gasTypeServices
    .editGasType(this.gasFrom.value, this.data.id).pipe(catchError((err)=> of(err))).subscribe((res: any) => {
      if(res.success){
        this.dialogRef.closeAll();
      Swal.fire(
        {
          title:'Gas Type edited successfully',
          icon:'success'
        }
      ) 
    }
    else{
      if (res.status == 500) {
        Swal.fire({
          title: ' Something went wrong',
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

    }
     )
)
  }
  
  closeDialog() {
    this.dialogRef.closeAll();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
