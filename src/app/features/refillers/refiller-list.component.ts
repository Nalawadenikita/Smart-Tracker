import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { CustomersService } from 'src/app/services/features/customers/customers.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import Swal from 'sweetalert2';
import { CustomersAddComponent } from '../customers/customers-add/customers-add.component';
import { RefillersService } from 'src/app/services/features/refillers/refillers.service';

@Component({
  selector: 'app-refiller-list',
  templateUrl: './refiller-list.component.html',
  styleUrls: ['./refiller-list.component.scss']
})
export class RefillerListComponent implements OnInit {

  public refillerLIst: any = [];
  isEditing = false;
  value: any;
  isLoading: boolean= true;
  public subscription: Subscription = new Subscription();
  pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  currentPage: number;

  private distributorId = JSON.parse(
    atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1])
  )['DISTRIBUTOR_ID'];

  RefillerCol = [
    {
      field: 'id',
      header: 'Sr.no',
      dataType: 'string',
    },
    {
      field: 'name',
      header: 'Refiller Name',
      dataType: 'string',
    },
    {
      field: 'address',
      header: 'Refiller Address',
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
    private refillerService: RefillersService,
    private dialogRef: MatDialog,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.renderRefiller();
    this.refillerService.rowData = null;
  }

  ngOnChange() {
    this.renderRefiller();
  }

  serchedValue(event: any) {
    this.value = event;
    this.pageIndex = 1;
    this.renderRefiller();
  }

  editRow(data: any) {
    this.router.navigate(['features/refillers/refillers-add'], {
      queryParams: { editing: true },
    });
    this.refillerService.rowData = data;
  }

  deleteRow(data: any) {
    console.log(data)
    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to delete the refiller?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          
          this.refillerService.deleteRefiller(data.id)
            .pipe(catchError((err) => of(err)))
            .subscribe((res:any) => {
              if (res) {
                this.renderRefiller();
              }
            })
        )
        Swal.fire('Refiller Deleted!', '', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Data is safe', '', 'success');
      }
    });
  }

  pageIndexCalculator(eventData: {pageIndex: any}) {
    console.log(eventData.pageIndex);
    this.pageIndex = eventData.pageIndex;
    this.renderRefiller();
  }


  renderRefiller() {
    this.refillerLIst = [];
    this.subscription.add(

      this.refillerService
        .getRefillersByDistributorId(this.distributorId, {page: this.pageIndex, pageSize: 10, search: this.value})
        .subscribe((res: any) => {
          this.isLoading=false;
          
          this.refillerLIst = res.data;
          this.totalRecords = res.totalRecords;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        }, (err) => {
          if(err.status == 404) {
            this.isLoading = false;
          }
        })
    )
  }

  openDialog() {
    const addedCustomer = this.dialogRef.open(CustomersAddComponent);
    this.subscription.add(

      addedCustomer.afterClosed().subscribe(() => {
        this.renderRefiller();
      })
    )
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
