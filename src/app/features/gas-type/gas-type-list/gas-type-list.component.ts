import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GasTypeAddComponent } from '../gas-type-add/gas-type-add.component';
import { GasTypeService } from 'src/app/services/features/gasType/gas-type.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-gas-type-list',
  templateUrl: './gas-type-list.component.html',
  styleUrls: ['./gas-type-list.component.scss']
})
export class GasTypeListComponent implements OnInit {
public gasTypeList:any=[];
isEditing=true;
value: any;
isLoading:any=true;
public subscription: Subscription = new Subscription();
pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  currentPage: number;

  constructor(private dialogRef: MatDialog,private gasTypeServices:GasTypeService) { }
  
  GasCol=[
    {
      field: 'id',
      header: 'Sr.no',
      dataType: 'string',
    },
    {
      field: 'gasName',
      header: 'Gas Type',
      dataType: 'string',
    },
    {
      field: 'gasSymbol',
      header: 'Gas Symbol',
      dataType: 'string',
    },
    {
      field: 'table_action',
      header: 'Action',
      dataType: 'table_action',
      actions:[{
        action:'edit',
        label:'Edit',
        callback:(company:any)=>{
this.editRow(company);
        }
      },
//       {
//         action:'delete',
//         label:'Delete',
//         callback:(company:any)=>{

// this.deleteRow(company);
//         }


//       }
    
    ]
    },
  ]

  ngOnInit(): void {
    this.renderGasType();
  }

  ngOnChange() {
    this.renderGasType();
  }

  serchedValue(event: any) {
    this.pageIndex = 1;
    this.value = event;
    this.renderGasType();
  }

  pageIndexCalculator(eventData: {pageIndex: any}) {
    console.log(eventData.pageIndex);
    this.pageIndex = eventData.pageIndex;
    this.renderGasType();
  }

  renderGasType(){
    this.gasTypeList=null;
    this.subscription.add(

      this.gasTypeServices.getGasType({page: this.pageIndex, pageSize: 10, search: this.value}).subscribe((res:any)=>{
      if(res){
      this.isLoading=false;
      this.gasTypeList=res.data.data;
  
      this.totalRecords = res.data.totalRecords;
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.currentPage;
      }
      else{
        this.isLoading=true;
      }
      })
    )
  }
  
  openDialog() {
    const addedGasType=this.dialogRef.open(GasTypeAddComponent);
    this.subscription.add(

      addedGasType.afterClosed().subscribe((res) => {
        this.renderGasType();
      })
    )
  }

  editRow(data:any){
    const editgasData=this.dialogRef.open(GasTypeAddComponent, {data: data});
    editgasData.componentInstance.isEditing=true;
    this.subscription.add(

      editgasData.afterClosed().subscribe((res)=>this.renderGasType())
    )
      }

  deleteRow(data:any){
  //  this.gasTypeServices.deleteGasType(data.id).subscribe();
  //  this.renderGasType();
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

        this.gasTypeServices.deleteGasType(data.id).subscribe((res)=>this.renderGasType())
      )

      Swal.fire(
        "Data has been deleted!",
        "",
        "success"
      );
    } else if (result.dismiss === Swal.DismissReason.cancel){
      Swal.fire(
        "Data is safe!",
        "",
        "info"
      );
    }
  });
}
ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
