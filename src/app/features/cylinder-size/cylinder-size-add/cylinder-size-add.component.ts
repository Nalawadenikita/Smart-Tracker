import { Component, OnInit, Inject, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { CylinderSizeService } from 'src/app/services/features/cylinderSize/cylinder-size.service';
import Swal from 'sweetalert2';
import { Subscription, catchError, of } from 'rxjs';

@Component({
  selector: 'app-cylinder-size-add',
  templateUrl: './cylinder-size-add.component.html',
  styleUrls: ['./cylinder-size-add.component.scss'],
})
export class CylinderSizeAddComponent {
  private subscription: Subscription = new Subscription();
  submitted: boolean = false;
  enteredCylinderSize: any;
  cylinderSizeList: any;
  cylinderFormData: any;
  constructor(
    private dialogRef: MatDialog,
    private cylinderSizeService: CylinderSizeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.CylinderFrom.patchValue(data);
    this.isEditing = false;
   
  }
  @Input() isEditing: boolean;
  get label(): string {
    return this.isEditing ? 'Edit Cylinder Size' : 'Add Cylinder Size';
  }

  CylinderFrom = new FormGroup({
    cylinderType: new FormControl('', [Validators.required]),
  });

  get dist() {
    return this.CylinderFrom.controls;
  }

  onSubmit() {
    this.submitted = true;

 
    if (this.CylinderFrom.invalid) {
      return;
    }
    this.addCylinderSize();
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

  addCylinderSize() {
    this.enteredCylinderSize = {
      cylinderType: this.CylinderFrom.value.cylinderType.trim(),
    };
    this.subscription.add(
      
      this.cylinderSizeService
        .addCylinderSize(this.enteredCylinderSize)
        .pipe(catchError((err) => of(err)))
        .subscribe((res) => {
          this.cylinderSizeList = res;
          if (res.success) {
            this.dialogRef.closeAll();
            Swal.fire({
              title: 'Cylinder size added successfully',
              icon: 'success',
            });
          } else {
            if (res.status == 500) {
              Swal.fire({
                title: ' Something went wrong',
                text: 'There was an error on the server. Please try again later.',
                icon: 'error',
              });
            } 
            else if(res.status==400){
              Swal.fire({
                title: "Enter Valid Size",
                text:"there must be no spaces in cylinder size",
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

  editCylinderSize() {
    this.subscription.add(

      this.cylinderSizeService
        .editCylinderSize(this.CylinderFrom.value, this.data.id)
        .pipe(catchError((err) => of(err)))
        .subscribe((res: any) => {
          if (res.success) {
            this.dialogRef.closeAll();
            Swal.fire({
              title: 'Cylinder size edited successfully',
              icon: 'success',
            });
          } else {
            if (res.status == 500) {
              Swal.fire({
                title: ' Something went wrong',
                text: 'There was an error on the server. Please try again later.',
                icon: 'error',
              });
            } 
            else if(res.error.cylinderType) {
              Swal.fire({
                title: res.error.cylinderType,
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

  closeDialog() {
    this.dialogRef.closeAll();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
