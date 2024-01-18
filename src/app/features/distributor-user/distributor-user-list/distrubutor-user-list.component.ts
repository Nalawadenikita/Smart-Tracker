import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistributorUserService } from 'src/app/services/features/distributorUser/distributor-user.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import Swal from 'sweetalert2';
import { Subscription, catchError, of } from 'rxjs';


@Component({
  selector: 'app-distrubutor-user-list',
  templateUrl: './distrubutor-user-list.component.html',
  styleUrls: ['./distrubutor-user-list.component.scss']
})
export class DistrubutorUserListComponent implements OnInit {

  public Distributor_user_list: any = [];
  public subscription:Subscription=new Subscription();
 
  value: any;
  pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  currentPage: number;

  distributorId = JSON.parse(this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT))["DISTRIBUTOR_ID"];
  isLoading:boolean=true;

  DisCol = [
    {
      field: 'id',
      header: 'Sr.no',
      dataType: 'string',
    },
    {
      field: 'name',
      header: 'Distributor User Name',
      dataType: 'string',
    },
    {
      field: 'phone',
      header: 'Phone',
      dataType: 'string',
    },
    {
      field: 'username',
      header: 'User Name',
      dataType: 'string',
    },
    {
      field: 'email',
      header: 'Email',
      dataType: 'string',
    },
    {
      field:'active',
      header:'Status',
      dataType: 'boolean',
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
      {
        action: 'delete',
        label: 'Delete',
        callback: (company: any) => {

          this.deleteRow(company);
        }
      }]
    },
  ]

  constructor(private distributeruserServices: DistributorUserService,
    private storageService: StorageService,private router:Router) { }

  ngOnInit(): void {
    this.renderDistributerUser();
    this.distributeruserServices.rowData=null;
  }

  ngOnChange() {
    this.renderDistributerUser();
  }

  serchedValue(event: any) {
    this.value = event;
    this.pageIndex = 1;
    this.renderDistributerUser()
  }

  pageIndexCalculator(eventData: {pageIndex: any}) {
    this.pageIndex = eventData.pageIndex;
    this.renderDistributerUser();
  }

  renderDistributerUser() {
    this.Distributor_user_list= [];
    this.subscription.add(

      this.distributeruserServices.getDistributerUser(this.distributorId, {page: this.pageIndex, pageSize: 10, search:this.value}).subscribe((res: any) => {
        if(res){
        this.isLoading=false;
        this.Distributor_user_list = res["data"][0]['distributorUserResponse']; 
        this.totalRecords = res.totalRecords;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;  
        }   
      })
    )
  }

  editRow(data: any) {
    this.router.navigate(['/features/distributor-user/add-edit'],{queryParams:{editing:true}})
    this.distributeruserServices.rowData=data;
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

          this.distributeruserServices.deleteDistributerUser(data.id).pipe(catchError(err=>of(err))).subscribe((res) => {this.renderDistributerUser()})
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
