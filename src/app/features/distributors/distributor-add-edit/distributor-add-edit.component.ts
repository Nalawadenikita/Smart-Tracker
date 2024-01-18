import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributorService } from 'src/app/services/features/distributor/distributor.service';
import Swal from 'sweetalert2';
import { Observable, Subscription, catchError, map, of, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { StorageService } from 'src/app/services/storage/storage.service';
import { codeFormatValidator } from '../distributors.component';

@Component({
  selector: 'app-distributor-add-edit',
  templateUrl: './distributor-add-edit.component.html',
  styleUrls: ['./distributor-add-edit.component.scss'],
})


export class DistributorAddEditComponent implements OnInit {
  public subscription:Subscription=new Subscription();
  countryCtrl: FormControl | undefined;
  filteredCountry: Observable<any[]> | undefined;
  formBuilder: any;
  distributerForm: any;
  submitted = false;
  formData: any;
  isEdit = false;
  public Cities: any = [];
  data: any;
  id = JSON.parse(this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT))[
    'DISTRIBUTOR_ID']

  constructor(
    private router: Router,
    private distributorService: DistributorService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private storageService: StorageService

  ) {
    this.formData = this.distributorService.rowData;
  }

  ngOnInit(): void {
    if (this.distributorService.rowData) {
      this.distForm.patchValue(this.formData);
    }this.subscription.add(

      this.route.queryParams.subscribe((params) => {
        this.isEdit = params['editing'];
      })
    )

  }

  distForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
      Validators.minLength(3),
    ]),
    code: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      codeFormatValidator()
    ]),

    city: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[789][0-9]{9}$'),
    ]),

    username: new FormControl('', [Validators.required,  Validators.pattern('[a-zA-Z ]*'),this.noWhitespaceValidator() ]),
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
  get dist() {
    return this.distForm.controls;
  }
  get label(): string {
    return this.isEdit ? 'Edit Distributor' : 'Add Distributor';
  }

  validateNumber(event: any) {
    const keyCode = event.keyCode
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

  validateText(event: any) {
    let numericKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (numericKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  add() {
    this.submitted = true;
    if (this.distForm.invalid) {
      return;
    }
    this.subscription.add(

      this.distributorService
        .addDistributor(this.distForm.value)
        .pipe(catchError((err) => of(err)))
        .subscribe((res: any) => {
          if (res.success) {
            this.router.navigate(['//features/distributors']);
            Swal.fire({
              title: 'Distributor added successfully',
              icon: 'success',
            });
          } else {
            if (res.status == 500) {
              Swal.fire({
                title: ' Something went wrong',
                text: 'There was an error on the server. Please try again later.',
                icon: 'error',
              });
            } else if(res.error.message) {            
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
    // this.onUpload();
  }

  edit() {
    this.submitted=true;
    if(this.distForm.invalid){
      return;
    }
    this.subscription.add(

      this.distributorService
        .editDistributor(this.distForm.value, this.formData.id).pipe(catchError((err) => of(err)))
        .subscribe((res: any) => {
          if (res.success) {
            this.router.navigate(['/features/distributors']);
            Swal.fire({
              title: 'Distributor edited successfully',
              icon: 'success',
            });
            this.router.navigate(['/features/distributors']);
            this.distributorService.rowData = null;
            this.formData = null;
          }
          else if(res.error.message) {            
            Swal.fire({
              title: res.error.message,
              icon: 'error',
            });
          }  else {
  
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

  onclick() {
    this.router.navigate(['/features/distributors']);
    this.distributorService.rowData = null;
    this.formData = null;
  }
  visible: boolean = true;
  changetype = true;
  viewPass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }


  //Upload File

  // selectedFile: File;
  // onfileSelected(event: any) {
  //   console.log(event);

  //   this.selectedFile = <File>event.target.files[0];
  // }
  // onUpload() {
  //   const fd = new FormData();
  //   fd.append('image', this.selectedFile, this.selectedFile.name)
  //   this.distributorService.getimage(fd).subscribe(res => {
  //     console.log(res)
  //   })
  // }
  // uploadedImageId: string | null = null;
  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  // onSubmitForm() {
  //   if (this.selectedFile) {
  //     const formData: FormData = new FormData();
  //     formData.append("File", this.selectedFile, this.selectedFile.name);
  //     this.distributorService.postImage(formData).pipe(catchError(err=>of(err))).subscribe(res=>{
  //    this.uploadedImageId = res.id;
  //       console.log(res);
        
  //     })

  //   }
  // }

  

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

