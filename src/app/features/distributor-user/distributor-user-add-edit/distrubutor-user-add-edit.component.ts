import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributorUserService } from 'src/app/services/features/distributorUser/distributor-user.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { Subscription, catchError, of } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-distrubutor-user-add-edit',
  templateUrl: './distrubutor-user-add-edit.component.html',
  styleUrls: ['./distrubutor-user-add-edit.component.scss'],
})
export class DistributorAddEditComponent implements OnInit {
  public subscription: Subscription = new Subscription();

  formBuilder: any;
  distributerForm: any;
  submitted = false;
  Mode = '';
  formData: any;
  id = JSON.parse(this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT))[
    'DISTRIBUTOR_ID'
  ];
  isEdit = false;

  constructor(
    private router: Router,
    private distributorUserService: DistributorUserService,
    private storageService: StorageService,
    private route: ActivatedRoute
  ) {
    this.formData = this.distributorUserService.rowData;
  }
  distForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[789][0-9]{9}$'),
    ]),
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), this.noWhitespaceValidator()]),
    password: new FormControl('', [Validators.required]),
  });
  noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value: string = control.value;
      const hasWhitespace = /\s/.test(value); // Check if input contains whitespace

      if (hasWhitespace) {
        // Remove whitespace from the input
        const newValue = value.replace(/\s/g, '');
        control.setValue(newValue); // Update the control's value without whitespace

        return { whitespace: true }; // Return validation error
      }

      return null; // No whitespace, return null for no validation error
    };
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
      !((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))
      || (specialChars.includes(event.key))
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

  ngOnInit() {
    if (this.distributorUserService.rowData) {
      this.distForm.patchValue(this.formData);
    }
    this.subscription.add(

      this.route.queryParams.subscribe((params) => {
        this.isEdit = params['editing'];
      })
    )
  }

  get label(): string {
    return this.isEdit ? 'Edit User' : 'Add User';
  }

  get dist() {
    return this.distForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.distForm.invalid) {
      return;
    }

    this.addDistributorUser();
  }

  addDistributorUser() {
    this.submitted = true;
    if (this.distForm.invalid) {
      return;
    }
    this.subscription.add(


      this.distributorUserService
        .addDistributerUser(this.distForm.value, this.id).pipe(catchError((err) => of(err))).subscribe((res) => {
          if (res.success) {
            this.router.navigate(['/features/distributor-user']);
            Swal.fire({
              title: 'Distributor user added successfully',
              icon: 'success',
            });
          }
          else {
            if (res.status == 500) {
              Swal.fire({
                title: ' Something went wrong',
                text: 'There was an error on the server. Please try again later.',
                icon: 'error',
              });
            } else if (res.error.message) {
              Swal.fire({
                title: res.error.message,
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

  editUsers() {
    this.submitted = true;

    this.distForm.get('password')?.clearValidators();
    this.distForm.get('password')?.updateValueAndValidity();  

    if (this.distForm.invalid) {
      return;
    }

    this.subscription.add(

      this.distributorUserService
        .editDistributorUser(this.distForm.value, this.formData.id).pipe(catchError((err) => of(err)))
        .subscribe((res) => {
          if (res.success) {
            this.router.navigate(['/features/distributor-user']);
            Swal.fire({
              title: 'distributor-user edited successfully',
              icon: 'success',
            });
            this.distributorUserService.rowData = null;
            this.formData = null;
          }
          else {

            if (res.status == 500) {
              Swal.fire({
                title: ' Something went wrong',
                text: 'There was an error on the server. Please try again later.',
                icon: 'error',
                customClass: {
                  container: 'custome_title'
                }
              });
            } else if (res.error.message) {
              Swal.fire({
                title: res.error.message,
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

    this.distForm.get('password')?.setValidators([Validators.required]);
    this.distForm.get('password')?.updateValueAndValidity();
  }

  onclick() {
    this.router.navigate(['/features/distributor-user']);
    this.distributorUserService.rowData = null;
    this.formData = null;
  }
  visible: boolean = true;
  changetype = true;
  viewPass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
