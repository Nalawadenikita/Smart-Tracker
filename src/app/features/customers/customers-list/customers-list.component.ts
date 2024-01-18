import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomersService } from 'src/app/services/features/customers/customers.service';
import { CustomersAddComponent } from '../customers-add/customers-add.component';
import Swal from 'sweetalert2';
import { Subscription, catchError, of } from 'rxjs';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  public customerList: any = [];
  private subscription: Subscription = new Subscription();
  isEditing = false;
  value: any;
  isLoading: any = true;

  pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  currentPage: number;

  private distributorId = JSON.parse(
    atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1])
  )['DISTRIBUTOR_ID'];

  CustomerCol = [
    {
      field: 'id',
      header: 'Sr.no',
      dataType: 'string',
    },
    {
      field: 'name',
      header: 'Customer Name',
      dataType: 'string',
    },
    {
      field: 'address',
      header: 'Customer Address',
      dataType: 'string',
    },
    {
      field: 'phone',
      header: 'Phone No.',
      dataType: 'string',
    },
    {
      field: 'email',
      header: 'Email',
      dataType: 'string',
    },
    {
      field: 'active',
      header: 'Status',
      dataType: 'boolean',
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
          },
        },
        {
          action: 'delete',
          label: 'Delete',
          callback: (company: any) => {
            this.deleteRow(company);
          },
        },
      ],
    },
  ];
  constructor(
    private customerService: CustomersService,
    private dialogRef: MatDialog,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.renderCustomer();
    this.customerService.rowData = null;
  }

  ngOnChange() {
    this.renderCustomer();
  }

  serchedValue(event: any) {
    this.value = event;
    this.pageIndex = 1;
    this.renderCustomer();
  }

  editRow(data: any) {
    this.router.navigate(['features/customers/customers-add'], {
      queryParams: { editing: true },
    });
    this.customerService.rowData = data;
  }

  deleteRow(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Cannot active again?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Inactive',
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(

          this.customerService
            .deleteCustomersByDistributorId(data.id, this.distributorId)
            .pipe(catchError((err) => of(err)))
            .subscribe((res) => {
              if (res.success) {
                Swal.fire('Customer inactivated!', '', 'success');
                this.renderCustomer();
              } else {
                Swal.fire('Customer holds cylinders!', '', 'info');
              }
            })
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
     
          Swal.fire('Data is safe', '', 'success');
        
      }
    });

  }

  pageIndexCalculator(eventData: { pageIndex: any }) {
    this.pageIndex = eventData.pageIndex;
    this.renderCustomer();
  }

  renderCustomer() {
    this.customerList = [];
    this.subscription.add(

      this.customerService
        .getCustomersByDistributorId(this.distributorId, { page: this.pageIndex, pageSize: 10, search: this.value })
        .subscribe({next:(res: any) => {
          this.isLoading=false;
          this.customerList = res.data;
          this.totalRecords = res.totalRecords;
          this.totalPages = res.totalPages;
          this.currentPage = res.currentPage;
        },
      error:(err)=>{
        if(err.status=404){
          this.isLoading=false;
        }
      }})
    )
  }

  openDialog() {
    const addedCustomer = this.dialogRef.open(CustomersAddComponent);
    this.subscription.add(
      addedCustomer.afterClosed().subscribe(() => {
        this.renderCustomer();
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
