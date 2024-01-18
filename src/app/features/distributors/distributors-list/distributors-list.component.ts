import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DistributorService } from 'src/app/services/features/distributor/distributor.service';
import Swal from 'sweetalert2';
import { Observable, Subscription, catchError, of, throwError } from 'rxjs';
import { error } from 'console';
@Component({
  selector: 'app-distributors-list',
  templateUrl: './distributors-list.component.html',
  styleUrls: ['./distributors-list.component.scss']
})
export class DistributorsListComponent implements OnInit {
  public subscription: Subscription = new Subscription();
  public distributorList: any = [];
  value: any;

  pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  isLoading:boolean=true;
 
  observable: Observable<String>;
  DisCol = [
    {
      field: 'id',
      header: 'Sr. no.',
      dataType: 'string'

    },
    {
      field: 'name',
      header: 'Distributor Name',
      dataType: 'string'

    },
    {
      field: 'code',
      header: 'Distributor Code',
      dataType: 'string'

    },
    {
      field: 'city',
      header: 'City',
      dataType: 'string'

    },
    {
      field: 'email',
      header: 'Email',
      dataType: 'string'

    },
    {
      field: 'phone',
      header: 'Phone No.',
      dataType: 'string'

    },
    {
      field: 'username',
      header: 'User Name',
      dataType: 'string'
    },

  
    {
      field: 'table_action',
      header: 'Action',
      dataType: 'table_action',
      actions: [{
        action: 'edit',
        label: 'Edit',
        callback: (company: any) => {
          this.editRow(company);
        }
      },
        // {
        //   action: 'delete',
        //   label: 'Delete',
        //   callback: (company: any) => {

        //     this.deleteRow(company);
        //   }
        // }
      ]
    },
  ]


  constructor(private distributorService: DistributorService,
    private router: Router) { }

  ngOnInit(): void {
    this.renderDistributorList()
    this.distributorService.rowData = null;

    

  }

  ngOnChange() {
    this.renderDistributorList()
  }

  serchedValue(event: any) {
    this.value = event;
    this.renderDistributorList();
  }

  pageIndexCalculator(eventData: { pageIndex: any }) {
    this.pageIndex = eventData.pageIndex;
    this.renderDistributorList();
  }

  renderDistributorList() {
   
    this.subscription.add(

      this.distributorService.getDistributor({ page: this.pageIndex, pageSize: 10, search: this.value }).subscribe((res: any) => {
        this.distributorList = res.data.data;
        this.isLoading=false;
        this.totalRecords = res.data.totalRecords;
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.currentPage;
      })
    )
  }

  editRow(data: any) {
    this.router.navigate(['features/distributors/distributors-add-edit'], { queryParams: { editing: true } });
    this.distributorService.rowData = data;
  }

  deleteRow(data: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Delete",
      reverseButtons: false,
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.subscription.add(

            this.distributorService.deleteDistributor(data.id).pipe(catchError(err => of(err))).subscribe((res) => {
              this.renderDistributorList();
            })
          )
          Swal.fire(
            "Data has been deleted!",
            "",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Data is safe!",
            "",
            "success"
       
          );
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  
  }
}