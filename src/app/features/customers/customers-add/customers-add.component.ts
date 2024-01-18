import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MaxLengthValidator,
  NgForm,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { CustomersService } from 'src/app/services/features/customers/customers.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers-add',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.scss'],
})
export class CustomersAddComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  formBuilder: any;
  distributerForm: any;
  submitted = false;
  enterCustomer: any;
  customerList: any;
  popupbtn: string = '';
  formData: any;
  isEdit = false;
  isActive: boolean = false;
  siteData: any = [];
  siteList: any = [];
  stateList = [];
  state: any = '';
  cityList = [];
  customerId: any;
  is_siteForm_open: boolean = false;
  is_editData: boolean = false;
  customerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z0-9 ]*'),

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
      // Validators.pattern('^[789][0-9]{9}$'),
      Validators.pattern(/^[0-9-]+$/)
    ]),

    distributorId: new FormControl(
      JSON.parse(this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT))[
        'DISTRIBUTOR_ID'
      ],
      [Validators.required]
    ),
    defaultsite: new FormControl('', [Validators.required]),
  });

  @ViewChild('formDirective') private formDirective: NgForm;

  SiteCols = [
    {
      field: 'id',
      header: 'Sr.no',
      dataType: 'string',
    },
    {
      field: 'sitename',
      header: 'Site Name',
      dataType: 'string',
    },
    {
      field: 'city',
      header: 'City',
      dataType: 'string',
    },
    {
      field: 'state',
      header: 'State',
      dataType: 'string',
    },
    {
      field: 'pincode',
      header: 'Pincode',
      dataType: 'string',
    },
  ];

  constructor(
    private router: Router,
    private customerService: CustomersService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.formData = this.customerService.rowData;
  }

  SiteForm: any;

  ngOnInit(): void {
    this.SiteForm = new FormGroup({
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      //customerId: new FormControl(this.customerId,[Validators.required]),
      siteName: new FormControl('', [Validators.required]),
    });
    if (this.customerService.rowData) {
      this.customerId = this.customerService.rowData.id;
      this.renderSite();
      this.is_editData = true;
      this.customerForm.patchValue(this.formData);
    }

    this.route.queryParams.subscribe((params) => {
      this.isEdit = params['editing'];
    });

    this.renderStates();
  }
  get label(): string {
    return this.isEdit ? 'Edit Customer' : 'Add Customer';
  }

  get dist() {
    return this.customerForm.controls;
  }
 
  validateNumber(event: any) {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];
    // const specialChars = [
    //   33, 34, 35, 36, 38, 40, 41, 42, 43, 44, 45, 47, 58, 59, 60, 61,
    //   62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126
    // ];

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

  renderStates() {
    this.subscription.add(
      this.customerService.getStates().subscribe((res: any) => {
        console.log(res);
        if (res) {
          this.stateList = res;
        }
      })
    );
  }

  selectedState(event: any) {
    console.log(event.value);
    this.state = event.value;
    this.renderCityByState();
  }

  renderCityByState() {
    this.subscription.add(
      this.customerService
        .getCitiesByState(this.state)
        .subscribe((res: any) => {
          this.cityList = res;
        })
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }

    this.addCustomer();
  }

  validateText(event: any) {
    let numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (numericKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  addCustomer() {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }
    this.subscription.add(
      this.customerService
        .addCustomers(this.customerForm.value)
        .pipe(catchError((err) => of(err)))
        .subscribe((res: any) => {
          if (res.success) {
            Swal.fire({
              title: 'Customer added successfully',
              icon: 'success',
              showCancelButton: true,
              cancelButtonText: 'Add Site',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/features/customers']);
              }else if (result.dismiss === Swal.DismissReason.cancel) {
                this.is_siteForm_open = true;
              }
            });
            this.customerId = res.data.id;
            //this.SiteForm.get('customerId').setValue(this.customerId)
            this.renderSite();
            console.log(this.customerId);
          } else {
            console.log('in the error');

            if (res.status == 500) {
              Swal.fire({
                title: ' Internal Server Error',
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
    );
  }

  editCustomer() {

    this.submitted = true;

    this.customerForm.get('defaultsite')?.clearValidators();
    this.customerForm.get('defaultsite')?.updateValueAndValidity();  

    if (this.customerForm.invalid) {
      return;
    }

    this.subscription.add(
      this.customerService
        .editCustomers(this.customerForm.value, this.formData.id)
        .pipe(catchError((err) => of(err)))
        .subscribe((res: any) => {
          if (res.success) {
            this.renderSite();
            this.router.navigate(['features/customers']);
            Swal.fire({
              title: 'Customer edited successfully',
              icon: 'success',
            });
            this.customerService.rowData = null;
            this.formData = null;
            
          } else {
            if (res.status == 500) {
              Swal.fire({
                title: ' Internal Server Error',
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
    );
    this.customerForm.get('defaultsite')?.setValidators([Validators.required]);
    this.customerForm.get('defaultsite')?.updateValueAndValidity();
  }

  renderSite() {
    this.siteList = [];
    this.subscription.add(
      this.customerService
        .getSiteByCustomer(this.customerId)
        .subscribe((res: any) => {
          if (res) {
            console.log(res);
            this.siteData = res;
            this.siteData.map((item: any) => {
              return this.siteList.push({
                city: item.locationId?.locationCity,
                state: item.locationId.locationState,
                pincode: item.locationId.pincode,
                sitename: item.locationId.locationName,
              });
            });
          }
        })
    );
  }

  addSite() {
    if (this.SiteForm.invalid) {
      Object.keys(this.SiteForm.controls).forEach((controlName) => {
        this.SiteForm.controls[controlName].markAsTouched();
      });
    } else {
      console.log('now in else');
      console.log(this.SiteForm.value);
      this.subscription.add(
        this.customerService
          .addCustomerSite({
            ...this.SiteForm.value,
            customerId: this.customerId,
          })
          .pipe(catchError((err) => of(err)))
          .subscribe((res: any) => {
            this.renderSite();
            Object.keys(this.SiteForm.controls).forEach((controlName) => {
              this.SiteForm.controls[controlName].setErrors(null);
            });
            this.SiteForm.reset();
            this.SiteForm = new FormGroup({
              state: new FormControl('', [Validators.required]),
              city: new FormControl('', [Validators.required]),
              pincode: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
              ]),
              siteName: new FormControl('', [Validators.required]),
            });
            // Clear the form's 'touched' state
            this.formDirective.resetForm();
           
          })
      );
    }
  }

  onSiteFormSubmit() {
    this.addSite();
  }

  onclick() {
    this.router.navigate(['features/customers']);
    this.customerService.rowData = null;
    this.formData = null;
  }

  editRow(event: any) {
    console.log(event.value);
  }

  deleteRow(event: any) {
    console.log(event.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
