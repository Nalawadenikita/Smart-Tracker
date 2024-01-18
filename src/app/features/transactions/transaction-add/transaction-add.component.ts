import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CylinderSizeService } from 'src/app/services/features/cylinderSize/cylinder-size.service';
import { TransactionsService } from 'src/app/services/features/transaction/transactions.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { CustomersService } from 'src/app/services/features/customers/customers.service';
import { DistributorUserService } from 'src/app/services/features/distributorUser/distributor-user.service';
import { InventoryService } from 'src/app/services/features/invetory/inventory.service';
import { RefillersService } from 'src/app/services/features/refillers/refillers.service';
import { Subscription, pipe } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


interface obj {
  transactionType: number;
  customerId?: number | null;
  distributorId: number;
  distributorUserId: number;
  cylinderQuantity: number;
  cylinderId: number[];
  transactionDate: Date;
  refillerId?: number | null;
  locationName?: number | null;
  ecDcNumber: number;
  comment: string;
}

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
})
export class TransactionAddComponent implements OnInit {
  transactionForm: FormGroup;

  public gastype = [];
  public CylinderSize = [];
  public Cylinder = [];
  customerList = [];
  customerBackup = [];
  additionalForm!: FormGroup;
  todays_date = new Date();
  minDate: any = new Date('1/01/1900');
  daysTillMinDate: any = null;
  isThisRefillerTransaction = false;
  c: any = true;
  inputtedValue: any;
  enableSelect: boolean = false;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  cylinderCode: string = '';
  cylinderC: string = '';
  selectCheckbox: any[] = [];
  
  lastValue: any;
  valueArray: any;
  quantSum: number = 0;
  selectedGasType: number = 0;
  selectedCylinderType: number = 0;
  selectGas: any = [];
  selectSize: any = [];
  transactionType: any;
  totalQuantity = 0;
  addedCylinderList: obj = {
    transactionType: 0,
    customerId: 0,
    distributorId: 0,
    distributorUserId: 0,
    cylinderQuantity: 0,
    cylinderId: [],
    transactionDate: new Date(),
    refillerId: 0,
    locationName: 0,
    ecDcNumber: 0,
    comment: '',
  };
  statusValue: boolean = false;
  inputtedQuantity: number = 0;
  newCheckList: any = [];
  formArrayLength: any;
  distributorUserList = [];
  cylinderCodeList: any[] = [];
  emptyMessage: any = '';
  availableGases: any;
  inventoryList: any;
  cylinderData: any = [];
  pageIndex: number = 1;
  originalData: any = [];
  cylinderCodeId: any[] = [];
  transType: any = null;
  gas: any = '';
  cylinder: any = '';
  customer = '';
  refiller = '';
  refillerLIst = [];
  defaultSiteName: any;
  submitted: boolean = false;
  siteList = [];
  distributorUser: number;
  transactionInProgress = false;
  cylinderCheckedList: any = [];
  public subscription: Subscription = new Subscription();
  filterdata: any;
  selectAllCheckbox: any;
  selectedcheckdata: any = [];
  dataSource: any;
  allCylinderCodes: string[] = [];
  selectedCylinderCodes: string[] = [];
  transactionEditdata: any;
  isEdit = false;
  dateObject: any;
  maxDate:any;
  cylinderQrCode: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private refillerService: RefillersService,
    private formBuilder: FormBuilder,
    private cylinderSize: CylinderSizeService,
    private transactionService: TransactionsService,
    private storageService: StorageService,
    private customersService: CustomersService,
    private distributorUserService: DistributorUserService,
    private router: Router,
    private inventoryServices: InventoryService,
    private route: ActivatedRoute
  ) {
    this.transactionForm = this.formBuilder.group({
      transactionType: [null, Validators.required],
      customerId: [null, Validators.required],
      refillerId: [null, Validators.required],
      transactionDate: [
        new Date(),
        [Validators.required, this.validateDate.bind(this)],
      ],
      distributorUserId: [this.distributorUser],
      locationName: [null, Validators.required],
      ecDcNumber: [null, [Validators.required, Validators.maxLength(6)]],
      comment: [null, [Validators.maxLength(500)]],
    });
  }

  //to access the controls of the transaction form
  get dist() {
    return this.transactionForm.controls;
  }

  // yearFilter = (d: Date | null): boolean => {

  //   const currentYear = new Date().getFullYear();
  //   const year = (d || new Date()).getFullYear();
  //   return year >= 2000 && year <= currentYear;
  // }
  checkInput(event: any) {
    console.log(event.target.value.length);
  }

  //set todays date to calender
  resetTodaysDate() {
    this.todays_date = new Date();
  }

  //accessing distributor ID from token
  private distributorId = JSON.parse(
    atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1])
  )['DISTRIBUTOR_ID'];

  //table columns
  CylinderCol = [
    {
      field: 'id',
      header: 'Sr.No',
      dataType: 'string',
    },
    {
      field: 'gasType',
      header: 'Gas Type',
      dataType: 'string',
    },
    {
      field: 'cylinderSize',
      header: 'Cylinder Size',
      dataType: 'string',
    },
    {
      field: 'cylinderCode',
      header: 'Code',
      dataType: 'string',
    },
    {
      field: 'cylinderQrCode',
      header: 'Cylinder QR Code',
      dataType: 'string',
    },
    {
      field: 'lastTrnDate',
      header: 'Last TrnDate',
      dataType: 'string',
    },
    {
      field: 'days',
      header: 'Days',
      dataType: 'string',
    },
    {
      field: 'select',
      header: 'Select',
      dataType: 'string',
      action: {
        action: 'select',
        label: 'Select',
        callback: (event: any, row: any) => {
          this.select(event, row);
        },
      },
      selectAllAction: {
        action: 'selectAll',
        label: 'SelectAll',
        callback: (event: any) => {
          this.selectAll(event);
        },
      },
    },
  ];

  ngOnInit(): void {
    this.renderInventory();
    this.addGasType();
    this.addCylinderSize();
    this.getTransactionType();
    this.getCustomersByDistributorsId();
    this.getDistributorUser();
    if(this.isEdit){
      this.maxDate=null;
    }
    else {
      this.maxDate=this.todays_date;
    }
    

    //calculating days from minDate to todays date
    let diffInTime = this.todays_date.getTime() - this.minDate.getTime();
    this.daysTillMinDate = Math.trunc(diffInTime / (1000 * 3600 * 24));


      this.route.queryParams.subscribe((params) => {
        this.isEdit = params['editing'];
        if (this.isEdit) {
          this.patchDataandChecktrans();
        }
      })
    
  }
  get label(): string {
    return this.isEdit ? 'Edit Transaction' : 'Add Transaction';
  }

  ngOnChanges(): void {
    this.renderInventory();
  }

  patchDataandChecktrans() {
    if (this.transactionService.rowData) {
      this.maxDate=null;
      this.totalQuantity=this.transactionService.rowData.cylinder_quantity;
      this.transactionEditdata = this.transactionService.rowData;
      const dateString = this.transactionService.rowData.transaction_date;
      const dateParts = dateString.split('/');
      // Creating a Date object (month is 0-indexed in JavaScript)
      const dateObject1 = new Date(
        parseInt(dateParts[2]),
        parseInt(dateParts[0]) - 1,
        parseInt(dateParts[1])
      );

      // Formatting the date as "yyyy-MM-dd" for mat-datepicker
      this.dateObject = `${dateObject1.getFullYear()}-${(
        '0' +
        (dateObject1.getMonth() + 1)
      ).slice(-2)}-${('0' + dateObject1.getDate()).slice(-2)}`;
      console.log(this.dateObject);
      if (
        this.transactionService.rowData.transaction_type_id == 3 ||
        this.transactionService.rowData.transaction_type_id == 4
      ) {
        this.isThisRefillerTransaction = true;

        this.renderRefiller();
        this.transactionForm.patchValue({
          transactionType: this.transactionService.rowData.transaction_type_id,
          refillerId: this.transactionService.rowData.refillerId,
          transactionDate: null,
          distributorUserId: this.transactionService.rowData.distributorUserId,
          ecDcNumber: this.transactionService.rowData.ecDcNumber,
          comment: this.transactionService.rowData.comment,
        });
      } else {
        this.isThisRefillerTransaction = false;
        this.transactionForm.patchValue({
          transactionType: this.transactionService.rowData.transaction_type_id,
          customerId: this.transactionService.rowData.customerId,
          transactionDate: null,
          distributorUserId: this.transactionService.rowData.distributorUserId,
          locationName: this.transactionService.rowData.locationName,
          ecDcNumber: this.transactionService.rowData.ecDcNumber,
          comment: this.transactionService.rowData.comment,
        });
      }
      this.transactionForm.get('refillerId')?.disable()
      this.transactionForm.get('customerId')?.disable()
      this.transactionForm.get('transactionType')?.disable()
    }
  }

  editTransaction(){
    console.log('inedit')
    console.log(this.transactionService.rowData.transaction_id);
    let id=this.transactionService.rowData.transaction_id;
    console.log(this.transactionForm.value.transactionDate)
    let date=this.convertUtcToIst(this.transactionForm.value.transactionDate);
    console.log(date);
    let data={'transactionDate':date}
    data={...data}
    console.log(data)
    this.transactionService.updateTransaction(id,data).subscribe((res:any)=>{
      if(res.success){
        Swal.fire({
          title: 'Transaction date updated successfully',
          icon: 'success',
        });
        this.router.navigate(['/features/transactions']);
      }
      else {
        if(res.status==500){
          Swal.fire({
            title: 'Internal server error',
            icon: 'error',
          });
        }
      }
    })
  }


  //calling function on transaction type change
  onTransactionTypeChange(change: any) {
    this.totalQuantity = 0;
    this.newCheckList = [];
    // this.transaction_page_checklist[this.currentPage]=false;
    console.log(change.value);
    this.cylinderCheckedList = [];
    let condition = [3, 4];
    if (condition.includes(change.value)) {
      this.isThisRefillerTransaction = true;
      this.enableSelect = true;
      this.renderRefiller();
      this.transactionForm.get('customerId')?.clearValidators();
      this.transactionForm
        .get('refillerId')
        ?.setValidators(Validators.required);
      this.transactionForm.updateValueAndValidity();
    } else {
      console.log('here');
      this.enableSelect = false;
      this.isThisRefillerTransaction = false;
      this.transactionForm.get('refillerId')?.clearValidators();
      this.transactionForm
        .get('customerId')
        ?.setValidators(Validators.required);
      this.transactionForm.updateValueAndValidity();
    }
  }
  checkVal(event: any) {
    if (event.target.value == '') {
      this.cylinderC = '';
      this.renderInventory();
    }
  }

  //refillers name list call
  renderRefiller() {
    this.refillerLIst = [];
    this.refillerService
      .getRefillersByDistributorId(this.distributorId, {
        page: 1,
        pageSize: 1000,
      })
      .subscribe((res: any) => {
        this.refillerLIst = res.data;
        console.log(this.refillerLIst);
      });
  }

  //getting site locations with respect to customers
  getSiteLocations() {
    this.transactionForm.get('locationName')?.patchValue('option');

    this.transactionService
      .getCustomerLocationByCustomer(this.customer)
      .subscribe((res: any) => {
        if (res) {
          this.siteList = res;
          console.log(res);

          this.defaultSiteName = this.siteList[0];
          this.transactionForm
            .get('locationName')
            ?.patchValue(this.defaultSiteName.locationId.locationId);
        }
      });
  }

  //render gas types from inventory for filters
  addGasType() {
    const uniqueIds: any = [];
    this.subscription.add(
      this.inventoryServices
        .getCylinderById(this.distributorId)
        .subscribe((res: any) => {
          if (res) {
            this.gastype = res.map((item: any) => item.gasType);
            this.gastype = this.gastype.filter((element: any) => {
              const isDuplicate = uniqueIds.includes(element.id);

              if (!isDuplicate) {
                uniqueIds.push(element.id);
                return true;
              }
              return false;
            });
          }
        })
    );
  }

  customerInputChange(data: any) {
    console.log(data);

    if (data.target.value !== '' && data.target.value.trim() !== '') {
      this.getCustomersByDistributorsId(data.target.value);
    } else if (data.target.value !== this.customerList) {
      this.getCustomersByDistributorsId(null);
    }
  }
  //render cylinder sizes for filters
  addCylinderSize() {
    this.subscription.add(
      this.cylinderSize
        .getCylinderSize({ page: 1, pageSize: 1000 })
        .subscribe((data: any) => {
          this.CylinderSize = data.data.data;
        })
    );
  }

  //on gas selection
  selectedGas(event: any) {
    this.gas = event.value;
    // this.renderInventory();
    this.getCylindersByFilter();
  }

  //on cylinder selection
  selectedCylinder(event: any) {
    this.cylinder = event.value;
    // this.renderInventory();
    this.getCylindersByFilter();
  }

  //render transaction types
  getTransactionType() {
    this.subscription.add(
      this.transactionService.getTransactionType().subscribe((res) => {
        this.transactionType = res;
      })
    );
  }

  renderListThroughSearch() {
    if (this.selectGas.length !== 0 || this.selectSize !== 0) {
      this.renderInventory();
    }
  }

  //render customers by distributor ID
  getCustomersByDistributorsId(search: any = null) {
    this.subscription.add(
      this.customersService
        .getCustomersByDistributorId(this.distributorId, {
          page: 1,
          pageSize: 1000,
          search: search ? search : '',
        })
        .subscribe((res) => {
          if (res.data) {
            this.customerList = res.data;
            this.customerBackup = res.data;
            this.customerList = this.customerList.filter(
              (item: any) => item.active === true
            );
          } else if (res.data.message) {
            this.customerList = [];
          }
        })
    );
  }

  //render distributor users
  getDistributorUser() {
    this.subscription.add(
      this.distributorUserService
        .getDistributerUser(this.distributorId, { page: 1, pageSize: 1000 })
        .subscribe((res) => {
          this.distributorUserList = res['data'][0]['distributorUserResponse'];
          this.distributorUser = this.distributorUserList[0]['id'];
          this.transactionForm
            .get('distributorUserId')
            ?.patchValue(this.distributorUser);
        })
    );
  }

  dateToDD_MM_YYYY(date: any) {
    let dateArr = date.split('/');
    let temp = dateArr[0];
    dateArr[0] = dateArr[1];
    dateArr[1] = temp;
    return dateArr.join('/');
  }
  convertUtcToIst(utcDate: any) {
    // Create a Date object
    const date = new Date(utcDate);

    // Timezone offset for IST in minutes (330 minutes = 5 hours 30 minutes)
    const istOffset = 330;

    // Convert to IST
    date.setMinutes(date.getMinutes() + istOffset);

    return date;
  }

  //on submit transaction
  addTransactions() {
    this.submitted = true;
    Object.keys(this.transactionForm.controls).forEach((field) => {
      this.transactionForm.controls[field].markAsTouched();
    });

    //copying the form values into a object
    this.addedCylinderList.transactionType = parseInt(
      this.transactionForm.value.transactionType
    );
    // this.addedCylinderList.cylinderQuantity = this.totalQuantity;
    this.addedCylinderList.distributorId = this.distributorId;
    this.addedCylinderList.distributorUserId = parseInt(
      this.transactionForm.value.distributorUserId
    );
    console.log(
      'date ha woh toh nahi hai',
      this.transactionForm.value.transactionDate
    );
    this.addedCylinderList.transactionDate =
      this.transactionForm.value.transactionDate;

    this.addedCylinderList.ecDcNumber = parseInt(
      this.transactionForm.value.ecDcNumber
    );
    this.addedCylinderList.comment = this.transactionForm.value.comment;

    //checking if it is refiller transaction or a customer transaction and modifying the form validations accordingly
    if (this.isThisRefillerTransaction) {
      this.addedCylinderList.refillerId = parseInt(
        this.transactionForm.value.refillerId
      );
      this.transactionForm.get('locationName')?.clearValidators();
      this.transactionForm.get('locationName')?.updateValueAndValidity();
      this.transactionForm.get('customerId')?.clearValidators();
      this.transactionForm.get('customerId')?.updateValueAndValidity();
      delete this.addedCylinderList.customerId;
    } else {
      this.addedCylinderList.customerId = parseInt(
        this.transactionForm.value.customerId
      );
      this.addedCylinderList.locationName = parseInt(
        this.transactionForm.value.locationName
      );
      this.transactionForm.get('refillerId')?.clearValidators();
      this.transactionForm.get('refillerId')?.updateValueAndValidity();
      delete this.addedCylinderList.refillerId;
    }

    //filtered selected cylinders
    this.originalData = [...new Set(this.originalData)];

    //this.originalData.map((item: any) => {
    this.newCheckList.map((rowid: any) => {
      //if(item.id==rowid){
      if (!this.addedCylinderList.cylinderId.includes(rowid)) {
        this.addedCylinderList.cylinderId.push(rowid);
      }

      //}
    });
    this.addedCylinderList.cylinderQuantity =
      this.addedCylinderList.cylinderId.length;
    //if (item.status === true) this.addedCylinderList.cylinderId.push(item.id);
    //});
    console.log(this.addedCylinderList.cylinderId);

    if (this.transactionForm.valid) {
      this.transactionInProgress = true;
      console.log(this.addedCylinderList);

      if (this.totalQuantity > 0) {
        if (
          this.isThisRefillerTransaction &&
          this.transactionForm.value.refillerId !== null
        ) {
          console.log('nnnnnnnnnnn', this.addedCylinderList.transactionDate);
          let v = this.convertUtcToIst(this.addedCylinderList.transactionDate);
          this.addedCylinderList.transactionDate = v;
          this.subscription.add(
            this.transactionService
              .addTransactionDetailsForRefiller({ ...this.addedCylinderList })
              .subscribe(
                (res) => {
                  if (res) {
                    this.transactionInProgress = false;
                    this.router.navigate(['/features/transactions']);
                    Swal.fire({
                      title: 'Transaction added successfully',
                      icon: 'success',
                    });
                    this.isThisRefillerTransaction = false;
                    //this.transaction_page_checklist[this.currentPage]=false;
                  }
                  this.transactionForm.controls['customerId']?.setValidators([
                    Validators.required,
                  ]);
                  this.transactionForm
                    .get('customerId')
                    ?.updateValueAndValidity();
                },
                pipe((err: any) => {
                  this.transactionInProgress = false;
                  this.transactionForm.controls['locationName']?.setValidators([
                    Validators.required,
                  ]);
                  this.transactionForm
                    .get('locationName')
                    ?.updateValueAndValidity();
                  this.transactionForm.controls['customerId']?.setValidators([
                    Validators.required,
                  ]);
                  this.transactionForm
                    .get('customerId')
                    ?.updateValueAndValidity();
                })
              )
          );
        } else if (this.transactionForm.value.customerId !== null) {
          console.log(this.addedCylinderList);
          console.log({ ...this.addedCylinderList });
          console.log('nnnnnnnnnnn', this.addedCylinderList.transactionDate);
          let v = this.convertUtcToIst(this.addedCylinderList.transactionDate);
          this.addedCylinderList.transactionDate = v;
          console.log(v);
          //  this.addedCylinderList.transactionDate=v;
          this.subscription.add(
            this.transactionService
              .addTransactionDetails({ ...this.addedCylinderList })
              .subscribe(
                (res) => {
                  if (res) {
                    this.router.navigate(['/features/transactions']);
                    this.isThisRefillerTransaction = false;
                    Swal.fire({
                      title: 'Transaction added successfully',
                      icon: 'success',
                    });
                    this.transactionInProgress = false;
                  }
                  this.transactionForm.controls['refillerId']?.setValidators([
                    Validators.required,
                  ]);
                  this.transactionForm
                    .get('refillerId')
                    ?.updateValueAndValidity();
                },
                pipe((err: any) => {
                  this.transactionInProgress = false;

                  this.transactionForm.controls['refillerId']?.setValidators([
                    Validators.required,
                  ]);
                  this.transactionForm
                    .get('refillerId')
                    ?.updateValueAndValidity();
                })
              )
          );
        } else {
          Swal.fire({
            title: 'Please enter valid quantity',
            icon: 'warning',
          });
          this.transactionInProgress = false;
        }
      } else {
        Swal.fire({
          title: 'Please enter valid quantity',
          icon: 'warning',
        });
        this.transactionInProgress = false;
      }
    }
  }

  validateNumber(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const keyCode = event.keyCode;

    const excludedKeys = [37, 39, 46, 8];
    const specialChars = /^[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*$/;

    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      ) ||
      specialChars.test(event.key)
    ) {
      event.preventDefault();
    }
  }

  //validating transaction date disable dates less than last transaction date
  validateDate(event?: any) {
    const selectedDate = new Date(event.value);
    if (selectedDate < this.minDate) {
      return { invalidDate: true };
    }
    return null;
  }

  //on selection transaction type
  selectedTransType(event: any) {
    // this.transaction_page_checklist[this.currentPage]=false;
    this.totalQuantity = 0;
    this.newCheckList = [];
    this.cylinderData = [];
    this.cylinderCodeId = [];
    this.transType = event.value;
    console.log('nhere');
    this.renderInventory();
    this.totalQuantity = 0;
  }

  //on selection customer type
  selectedCustomerType(event: any) {
    this.totalQuantity = 0;
    this.originalData = [];
    this.cylinderData = [];
    this.customer = event.value;
    this.renderInventory();
    this.getSiteLocations();
  }

  //on selection refiller type
  selectedRefillerType(event: any) {
    this.totalQuantity = 0;
    this.originalData = [];
    this.cylinderData = [];
    this.refiller = event.value;
    this.renderInventory();
  }

  //filter cylinders
  getCylindersByFilter() {
    this.cylinderData = this.originalData;

    if (this.gas && this.cylinder) {
      this.cylinderData = this.cylinderData.filter(
        (item: any) =>
          item.gasTypeId === this.gas &&
          item.cylinderSizeId === this.cylinder &&
          item.cylinderCode.includes(this.cylinderCode)
      );
    } else if (this.gas) {
      this.cylinderData = this.cylinderData.filter(
        (item: any) =>
          item.gasTypeId === this.gas &&
          item.cylinderCode.includes(this.cylinderCode)
      );
    } else if (this.cylinder) {
      this.cylinderData = this.cylinderData.filter(
        (item: any) =>
          item.cylinderSizeId === this.cylinder &&
          item.cylinderCode.includes(this.cylinderCode)
      );
    } else {
      this.cylinderData = this.originalData.filter((item: any) =>
        item.cylinderCode.includes(this.cylinderCode)
      );
    }
  }

  pageIndexCalculator(eventData: { pageIndex: any }) {
    this.pageIndex = eventData.pageIndex;
    let checklist = new Set(this.newCheckList);

    this.totalQuantity = checklist.size;

    this.renderInventory();
  }

  getSearchValue(data: any) {
    this.inputtedValue = data.target.value.trim();
    console.log('dgfd', this.inputtedValue);
    if (this.inputtedValue.length > 0 && this.inputtedValue[0] === ' ') {
      this.inputtedValue = this.inputtedValue;
    }
    console.log(this.inputtedValue);
    this.pageIndex = 1;
    this.cylinderC = this.inputtedValue;
    this.renderInventory();
  }


  //render inventory according to selection type
  renderInventory() {
    this.inventoryList = [];
    //this.transaction_page_checklist[this.currentPage]=false;
    this.cylinderData = [];
    this.cylinderCheckedList = [];
    this.minDate = new Date('1/01/1900');
    if (this.transType === 1) {
      this.subscription.add(
        this.transactionService
          .getAvailableCylindersDCR(
            {
              distributorId: this.distributorId,
              gasTypeId: this.selectGas,
              cylinderSize: this.selectSize,
              cylinderCode: this.cylinderC,
              // cylinderQrCode:this.cylinderQrCode
            },
            { page: this.pageIndex, pageSize: 10 }
          )
          .subscribe((res: any) => {
            if (res) {
              this.inventoryList = res.data;
              this.totalRecords = res.totalRecords;
              this.totalPages = res.totalPages;
              this.currentPage = res.currentPage;
              this.cylinderData = this.inventoryList.map((element: any) => {
                let date = null;
                if (element.lastTransactionDate !== null) {
                  date = new Date(
                    element.lastTransactionDate
                  ).toLocaleDateString('en-US');
                  let temp = new Date(date);
                  date = this.dateToDD_MM_YYYY(date);
                }
                return {
                  id: element.id,
                  status: false,
                  cylinderCode: element['cylinderCode'],
                  cylinderQrCode:element.cylinderQrCode,
                  cylinderSize: element.cylinderSize['cylinderType'],
                  cylinderSizeId: element.cylinderSize['id'],
                  gasType: element.gasType['gasName'],
                  gasTypeId: element.gasType['id'],
                  owner: element.owner,
                  rented: element.rented,
                  lastTrnDate: date !== null ? date : '-',
                  showDays: false,
                  days: element.days,
                };
              });
            }

            this.originalData = [...this.cylinderData];

            this.originalData.forEach((row: any) => {
              let checklist = new Set(this.newCheckList);
              if (checklist.has(row.id)) {
                this.select({ checked: true }, row);
              }
            });

            console.log('original', this.originalData);
          })
      );
    } else if (this.transType === 2 && this.customer) {
      console.log('now');
      this.subscription.add(
        this.transactionService
          .getAvailableCylindersECR(
            {
              distributorId: this.distributorId,
              gasTypeId: this.selectGas,
              cylinderSize: this.selectSize,
              cylinderCode: this.cylinderC,
            },
            this.customer,
            { page: this.pageIndex, pageSize: 10 }
          )
          .subscribe((res: any) => {
            if (res) {
              this.inventoryList = res.data;
              this.totalRecords = res.totalRecords;
              this.totalPages = res.totalPages;
              this.currentPage = res.currentPage;
              this.cylinderData = this.inventoryList.map((element: any) => {
                let date = null;
                if (element.lastTransactionDate !== null) {
                  // let new_date = element.lastTransactionDate;
                  // let parts = new_date.split(" ");
                  // date = parts[0];
                  date = new Date(
                    element.lastTransactionDate
                  ).toLocaleDateString('en-US');
                  let temp = new Date(date);
                  date = this.dateToDD_MM_YYYY(date);
                }
                return {
                  id: element.id,
                  status: false,
                  cylinderCode: element['cylinderCode'],
                  cylinderSize: element.cylinderSize['cylinderType'],
                  cylinderSizeId: element.cylinderSize['id'],
                  days: element.days,
                  gasType: element.gasType['gasName'],
                  gasTypeId: element.gasType['id'],
                  owner: element.owner,
                  rented: element.rented,
                  lastTrnDate: date !== null ? date : '-',
                };
              });
            }
            this.originalData = [...this.cylinderData];
            this.originalData.forEach((row: any) => {
              let checklist = new Set(this.newCheckList);
              if (checklist.has(row.id)) {
                this.select({ checked: true }, row);
              }
            });
          })
      );
    } else if (this.transType === 3 && this.refiller) {
      this.subscription.add(
        this.transactionService
          .getRefillerToDistributor(
            {
              distributorId: this.distributorId,
              gasTypeId: this.selectGas,
              cylinderSize: this.selectSize,
              cylinderCode: this.cylinderC,
            },
            this.refiller,
            { page: this.pageIndex, pageSize: 10 }
          )
          .subscribe((res: any) => {
            if (res) {
              this.inventoryList = res.data;
              this.totalRecords = res.totalRecords;
              this.totalPages = res.totalPages;
              this.currentPage = res.currentPage;
              this.cylinderData = this.inventoryList.map((element: any) => {
                let date = null;
                if (element.lastTransactionDate !== null) {
                  // let new_date = element.lastTransactionDate;
                  // let parts = new_date.split(" ");
                  // date = parts[0];
                  date = new Date(
                    element.lastTransactionDate
                  ).toLocaleDateString('en-US');
                  let temp = new Date(date);
                  date = this.dateToDD_MM_YYYY(date);
                }
                return {
                  id: element.id,
                  status: false,
                  cylinderCode: element['cylinderCode'],
                  cylinderSize: element.cylinderSize['cylinderType'],
                  cylinderSizeId: element.cylinderSize['id'],
                  gasType: element.gasType['gasName'],
                  gasTypeId: element.gasType['id'],
                  owner: element.owner,
                  rented: element.rented,
                  lastTrnDate: date !== null ? date : '-',
                  days: element.days,
                };
              });
            }
            this.originalData = [...this.cylinderData];
            this.originalData.forEach((row: any) => {
              let checklist = new Set(this.newCheckList);
              if (checklist.has(row.id)) {
                this.select({ checked: true }, row);
              }
            });
          })
      );
    } else if (this.transType === 4) {
      this.subscription.add(
        this.transactionService
          .getTransactionDetailsForRefiller(
            {
              distributorId: this.distributorId,
              gasTypeId: this.selectGas,
              cylinderSize: this.selectSize,
              cylinderCode: this.cylinderC,
            },
            { page: this.pageIndex, pageSize: 10 }
          )
          .subscribe((res: any) => {
            if (res) {
              this.inventoryList = res.data;
              this.totalRecords = res.totalRecords;
              this.totalPages = res.totalPages;
              this.currentPage = res.currentPage;
              this.cylinderData = this.inventoryList.map((element: any) => {
                let date = null;
                if (element.lastTransactionDate !== null) {
                  date = new Date(
                    element.lastTransactionDate
                  ).toLocaleDateString('en-US');
                  let temp = new Date(date);
                  date = this.dateToDD_MM_YYYY(date);
                }

                return {
                  id: element.id,
                  status: false,
                  cylinderCode: element['cylinderCode'],
                  cylinderSize: element.cylinderSize['cylinderType'],
                  cylinderSizeId: element.cylinderSize['id'],
                  gasType: element.gasType['gasName'],
                  gasTypeId: element.gasType['id'],
                  owner: element.owner,
                  rented: element.rented,
                  lastTrnDate: date !== null ? date : '-',
                  days: element.days,
                };
              });
            }
            this.originalData = [...this.cylinderData];
            this.originalData.forEach((row: any) => {
              let checklist = new Set(this.newCheckList);
              if (checklist.has(row.id)) {
                this.select({ checked: true }, row);
              }
            });
          })
      );
    }
  }

  selected_through_search_filter: any = null;
  searchQuery_1 = '';
  searchQuery_2= '';
  modifyDate(date: any) {
    let dateArr = date.split('/');
    let temp = dateArr[0];
    dateArr[0] = dateArr[1];
    dateArr[1] = temp;
    let modifiedDate = new Date(dateArr.join('/'));
    return modifiedDate;
  }

  //on checking or selecting cylinder manually

  select(event: any, row: any) {
    console.log('select');

    const cylinderDataIndex = this.cylinderData.indexOf(row);
    this.cylinderData[cylinderDataIndex].status = event.checked;
    const originalDataIndex = this.originalData.indexOf(row);
    this.originalData[originalDataIndex].status = event.checked;

    if (event.checked) {
      if (
        this.searchQuery_1.length > 0 &&
        !this.newCheckList.includes(row.id)
      ) {
        this.searchQuery_1 = '';
        this.cylinderC = '';
        this.renderInventory();
      }
   
       
      console.log(event.checked);
      this.cylinderCheckedList.push(row);

      this.newCheckList.push(row.id);
      console.log(this.newCheckList);
      console.log(this.cylinderCheckedList);
      //  this.selectCheckbox.push([...this.cylinderCheckedList]);
      //  console.log(this.selectCheckbox);

      // this.newCheckList.push(row);
      // console.log(this.newCheckList);
      console.log(this.cylinderCheckedList);

      if (this.transType == 1 || this.transType == 4) {
        // let modMinDate = new Date(this.minDate)
        let modLastTranDate = this.modifyDate(row.lastTrnDate);
        if (this.minDate < modLastTranDate) {
          this.minDate = modLastTranDate;
          // modMinDate = modLastTranDate
        }
      } else {
        if (this.daysTillMinDate > row.days) {
          let dateArr = row.lastTrnDate.split('/');
          let temp = dateArr[0];
          dateArr[0] = dateArr[1];
          dateArr[1] = temp;
          let modifiedDate = dateArr.join('/');
          this.minDate = new Date(modifiedDate);
          this.daysTillMinDate = row.days;
        }
      }
    } else {
      console.log();
      let data = this.newCheckList.filter((id: any) => row.id != id);
      this.newCheckList = data;

      const index = this.cylinderCheckedList.indexOf(row);
      this.cylinderCheckedList.splice(index, 1);
      if (this.cylinderCheckedList.length == 0) {
        this.minDate = new Date('1/01/1900');
      } else {
        if (this.transType == 1 || this.transType == 4) {
          this.cylinderCheckedList = this.cylinderCheckedList.sort(
            (a: any, b: any) => this.compareDates(a.lastTrnDate, b.lastTrnDate)
          );
        } else {
          this.cylinderCheckedList = this.cylinderCheckedList.sort(
            (a: any, b: any) => a.days - b.days
          );
        }
        let dateArr = this.cylinderCheckedList[0].lastTrnDate.split('/');
        let temp = dateArr[0];
        dateArr[0] = dateArr[1];
        dateArr[1] = temp;
        let modifiedDate = dateArr.join('/');
        this.minDate = new Date(modifiedDate);
      }
    }
    let checklist: any;
    this.originalData.forEach((row: any) => {
      checklist = new Set(this.newCheckList);
    });
    this.totalQuantity = checklist.size;
    console.log(this.cylinderCheckedList);
    this.handleCheckboxChange(row, event);
  }
  addSelectedCylinderCode(code: string) {
    if (!this.selectedCylinderCodes.includes(code)) {
      this.selectedCylinderCodes.push(code);
    }
  }

  removeSelectedCylinderCode(code: string) {
    const indexToRemove = this.selectedCylinderCodes.indexOf(code);
    if (indexToRemove !== -1) {
      this.selectedCylinderCodes.splice(indexToRemove, 1);
    }
  }
  handleCheckboxChange(row: any, event: any) {
    const code = row.cylinderCode;

    if (event.checked) {
      this.addSelectedCylinderCode(code);
    } else {
      this.removeSelectedCylinderCode(code);
    }

    console.log(this.selectedCylinderCodes);
  }
  getSelectedCylinderCodes(): string {
    return this.selectedCylinderCodes.join(', ');
  }
  // getAllCylinderCodes(items: any[][]): string {
  //   const allCodes = items.flatMap(item => item.map(listItem => listItem.cylinderCode));

  //   return Array.from(new Set(allCodes)).join(', ');

  // }

  // Rest of the component code

  compareDates(dateStr1: any, dateStr2: any) {
    const date1 = new Date(dateStr1.split('/').reverse().join('/'));
    const date2 = new Date(dateStr2.split('/').reverse().join('/'));

    return date2.getTime() - date1.getTime();
  }
  transaction_page_checklist: any = {};
  //on checking or selecting cylinder all at a time
  selectAll(event: any) {
    this.cylinderData.forEach((item: any) => (item.status = event.checked));
    this.originalData.forEach((item: any) => (item.status = event.checked));

    if (event.checked) {
      this.transaction_page_checklist[this.currentPage] = true;
      console.log(this.transaction_page_checklist);
      //this.totalQuantity = this.originalData.length;
      this.originalData.map((item: any) => {
        this.newCheckList.push(item.id);
      });
      let checklist = new Set(this.newCheckList);
      this.totalQuantity = checklist.size;

      console.log(this.newCheckList);
      console.log(this.originalData);

      this.cylinderCheckedList = [...this.originalData];

      if (this.transType == 1 || this.transType == 4) {
        this.cylinderCheckedList = this.cylinderCheckedList.sort(
          (a: any, b: any) => this.compareDates(a.lastTrnDate, b.lastTrnDate)
        );
      } else {
        this.cylinderCheckedList = this.cylinderCheckedList.sort(
          (a: any, b: any) => a.days - b.days
        );
      }
      let dateArr = this.cylinderCheckedList[0].lastTrnDate.split('/');
      let temp = dateArr[0];
      dateArr[0] = dateArr[1];
      dateArr[1] = temp;
      let modifiedDate = dateArr.join('/');
      this.minDate = new Date(modifiedDate);
    } else {
      this.totalQuantity = 0;
      this.minDate = new Date('1/01/1900');
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.transactionForm.invalid) {
      return;
    }
    this.addTransactions();
  }

  cancelBtn() {
    this.router.navigate(['/features/transactions']);
  }

  //unsubscribing the api calls
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
