import { Component, OnInit, OnChanges } from '@angular/core';
import { CustomersService } from 'src/app/services/features/customers/customers.service';
import { TransactionsService } from 'src/app/services/features/transaction/transactions.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { MatDialog } from '@angular/material/dialog';
import { TransactionReportComponent } from '../../reports/transaction-report/transaction-report.component';
import { RefillersService } from 'src/app/services/features/refillers/refillers.service';
import { InventoryService } from 'src/app/services/features/invetory/inventory.service';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';



@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  login: any;

  constructor(private transactionsService: TransactionsService,
    private customerService: CustomersService,
    private storageService: StorageService,
    private transactionService: TransactionsService,
    private dialogRef: MatDialog,
    private refillerService: RefillersService,
    private inventoryServices: InventoryService,
    private router: Router,
  ) { }

  transactionGetResponse: any;
  transactionsList: any = [];
  customerName = '';
  value: any;
  customersList: any = [];
  refillerLIst: any = [];
  transactionType: any = [];

  selectedCustomers: any = [];
  selectedRefiller: any = [];
  selectedTransactionType: any = [];

  pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean = true;
  isDisUser:boolean=false;
  

  distributorId = JSON.parse(atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1]))['DISTRIBUTOR_ID'];
  TransactionCol = [ {
    field: 'id',
    header: 'Sr.no',
    dataType: 'string',
  },
  {
    field: 'customer_name',
    header: 'Name',
    dataType: {

    },
    isCustomer: 'isCustomer'
  },
  {
    field: 'transaction_type',
    header: 'Transaction Type',
    dataType: 'string',
    action: {
      action: 'viewTransaction',
      label: 'viewTransaction',
      callback: (row: any) => {
        this.viewTransaction(row);
      }

    },
  },
  {
    field: 'transaction_date',
    header: 'Transaction Date',
    dataType: 'string',
  },

  {
    field: 'dcId',
    header: 'DC No.',
    dataType: 'string',
  },
  {
    field: 'ecId',
    header: 'ECR No.',
    dataType: 'string',
  },
  {
    field: 'locationName',
    header: 'Site Name',
    dataType: 'string',
  },
  {
    field: 'cylinder_quantity',
    header: 'Quantity',
    dataType: 'string',
  },
  {
    field: 'comment',
    header: 'Comments',
    dataType: 'string',
  },
  {
    field: 'table_action',
    header: 'Action',
    dataType: 'table_action',
    actions: [
      {
        action: 'edit',
        label: 'Edit',
        callback: (company: any) => {
          this.editRow(company);
        }
      },
     ]
  },]


  ngOnInit(): void {
    this.renderTransaction();
    this.getCustomers();
    this.renderRefiller();
    this.getTransactionType();
    this.login = JSON.parse(
      this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT)
    );
    if(this.login['USER_TYPE'] === 'ROLE_DISTRIBUTOR_USER'){
      this.isDisUser=true;
      this.TransactionCol.pop()

    }
    else{
      this.isDisUser=false;
    }

  }
  
  editRow(data: any) {
    this.router.navigate(['/features/transactions/add-transaction'], { queryParams: { editing: true } });
    this.transactionService.rowData = data;
    console.log(data);
  }


  serchedValue(event: any) {
    this.value = event;
  }

  viewTransaction(row: any) {
    // alert(row);
    this.transactionService.getTransactionReport(this.distributorId, row.transaction_id).subscribe((res) => {
      this.transactionService.transactionDetails = res.map((element: any) => {
        console.log(res);
        let date_str = new Date(element.transactionDate).toLocaleDateString('en-US');
        console.log(date_str);
        let dateArr = date_str.split("/");
        let temp = dateArr[0];
        dateArr[0] = dateArr[1];
        dateArr[1] = temp;
        date_str = dateArr.join("/")
        return {
          "id": element.id,
          "name": element.customerId ? element.customerId.name : element.refillerId.name, "cylinderType": element.cylinderSize.cylinderType,
          "gasName": element.gasType.gasName, "cylinderCode": element.cylinderCode, "transactionDate": date_str,
          "locationName": element.locationName, "ecId": element.ecNumber, "dcId": element.dcNumber,
          "isCustomer": element.customerId ? true : false, "comment": element.comment,
          "cylinderQrCode":element.cylinderQrCode
        }
      });
      const addedData = this.dialogRef.open(TransactionReportComponent, {
        height: '80%',
        width: '80%',
      });
      addedData.afterClosed().subscribe((res: any) => {
        this.renderTransaction();
      })

    })

  }

  pageIndexCalculator(eventData: { pageIndex: any }) {
    console.log(eventData.pageIndex);
    this.pageIndex = eventData.pageIndex;
    this.renderTransaction();
  }

  getCustomers(search:any=null) {
    this.customerService.getCustomersByDistributorId(this.distributorId, { page: this.pageIndex, pageSize: 1000 ,search:search ? search:""}).subscribe((res) => {
      if (res) {
        this.customersList = res.data
      }
    })
  }

  customerInputChange(data:any){
    console.log(data);
    
       if(data.target.value !== '' && data.target.value.trim() !== '' ){
         this.getCustomers(data.target.value);
       }else if(data.target.value !==this.customersList){
         this.getCustomers(null);
       }
       this.getCustomers(data.target.value);
       }
  renderRefiller() {
    this.refillerService
      .getRefillersByDistributorId(this.distributorId, { page: this.pageIndex, pageSize: 1000 })
      .subscribe((res: any) => {
        this.isLoading = false;
        this.refillerLIst = res.data;
      });
  }

  getTransactionType() {
    this.transactionService.getTransactionType().subscribe((res) => {
      this.transactionType = res;
    })
  }

  renderTransaction() {
    this.transactionsList = [];
    if (this.selectedCustomers.length !== 0 || this.selectedRefiller.length !== 0 || this.selectedTransactionType.length !== 0) {
      this.renderTransactionsThroughSearch();
    } else {
      this.renderTransactionsWithoutSearch();
    }
  }

  renderTransactionsThroughSearch() {
    this.pageIndex = 1;
    this.transactionService.transactionListSearch({ "customerId": this.selectedCustomers, "distributorId": this.distributorId, "refillerId": this.selectedRefiller, "transactionTypeId": this.selectedTransactionType }, { page: this.pageIndex, pageSize: 10 }).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.transactionGetResponse = res.data;
        this.totalRecords = res.totalRecords;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        this.isLoading = false;

        this.transactionsList = this.transactionGetResponse.map((element: any) => {
          // let new_date = element.transactionDate;
          // let parts = new_date.split(" ");
          // let date_str = parts[0];
          let date_str = new Date(element.transactionDate).toLocaleDateString('en-US');
          let dateArr = date_str.split("/");
          let temp = dateArr[0];
          dateArr[0] = dateArr[1];
          dateArr[1] = temp;
          date_str = dateArr.join("/")
          console.log(date_str);
          return {
            // 'transactionId': element.id,
            'transaction_date': date_str,
            'transaction_id': element.id,
            'customer_name': element.customerId?.name ? element.customerId?.name : element.refillerId?.name ? element.refillerId?.name : 'NA',
            'isCustomer': element.customerId ? true : false
            , 'cylinder_quantity': element.cylinderQuantity,
            'transaction_type': element.transactionType.typeName, 'transaction_type_id': element.transactionType.id, 'dcId': element.dcId || '-', 'ecId': element.ecId || '-',
            'locationName': element.customerId ? element.locationName : '-', 'comment': element.comment
          }
        });

      }
    },
      (err) => {
        if (err.status == 404) {
          this.transactionsList = [];
          this.isLoading = false;

        }

      });
  }


  renderTransactionsWithoutSearch() {
    // this.transactionsList = [];
    this.transactionsService.getTransactionByDistributorId(this.distributorId, { page: this.pageIndex, pageSize: 10, search: this.value }).subscribe((res) => {
      this.transactionGetResponse = res.data;
      this.totalRecords = res.totalRecords;
      this.totalPages = res.totalPages;
      this.currentPage = res.currentPage;
      this.isLoading = false;

      this.transactionsList = this.transactionGetResponse.map((element: any) => {
        let date_str = new Date(element.transactionDate).toLocaleDateString('en-US');
        console.log(date_str);
        let dateArr = date_str.split("/");
        let temp = dateArr[0];
        dateArr[0] = dateArr[1];
        dateArr[1] = temp;
        date_str = dateArr.join("/")
        let comment;
        if (element.comment?.length > 20) {
          comment = element.comment.slice(0, 20) + '...';
        } else {
          comment = element.comment;
        }

        return {

          'transaction_date': date_str,
          'transaction_id': element.id,
          'customer_name': element.customerId?.name ? element.customerId?.name : element.refillerId?.name ? element.refillerId?.name : 'NA',
          'isCustomer': element.customerId ? true : false
          , 'cylinder_quantity': element.cylinderQuantity,
          'transaction_type': element.transactionType.typeName, 'transaction_type_id': element.transactionType.id, 'dcId': element.dcId || '-', 'ecId': element.ecId || '-',
          'locationName': element.customerId ? element.locationName : '-', 'comment': comment,
          'customerId':element.customerId?.id,'refillerId':element.refillerId?.id
        }
      });
    },
      (err) => {
        if (err.status == 404) {
          this.transactionsList = [];
          this.isLoading = false;

        }

      });
  }

}

