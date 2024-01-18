import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CylinderSizeAddComponent } from '../cylinder-size-add/cylinder-size-add.component';
import { CylinderSizeService } from 'src/app/services/features/cylinderSize/cylinder-size.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cylinder-size-list',
  templateUrl: './cylinder-size-list.component.html',
  styleUrls: ['./cylinder-size-list.component.scss'],
})
export class CylinderSizeListComponent implements OnInit {
  public CylinderList: any = [];
  isEditing = false;
  value: any;
  isLoading: any = true;
  private subscription: Subscription = new Subscription();
  pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  currentPage: number;


  constructor(
    private dialogRef: MatDialog,
    private cylinderSizeService: CylinderSizeService
  ) { }

  CylinderCol = [
    {
      field: 'id',
      header: 'Sr.no',
      dataType: 'string',
    },
    {
      field: 'cylinderType',
      header: 'Cylinder Size',
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
          },
        },
      ],
    },
  ];

  ngOnInit(): void {
    this.renderCylinderList();
  }

  ngOnChange(): void {
    this.renderCylinderList();
  }

  pageIndexCalculator(eventData: { pageIndex: any }) {
    this.pageIndex = eventData.pageIndex;
    this.renderCylinderList();
  }

  renderCylinderList() {
    this.CylinderList = [];
    this.subscription.add(

      this.cylinderSizeService.getCylinderSize({page: this.pageIndex, pageSize: 10, search:this.value}).subscribe((res: any) => {
        if (res) {
          this.isLoading = false;
          this.CylinderList = res.data.data;
          this.totalRecords = res.data.totalRecords;
          this.totalPages = res.data.totalPages;
          this.currentPage = res.data.currentPage;
        } else {
          this.isLoading = true;
        }
      })
    )
  }

  openDialog() {
    const addedData = this.dialogRef.open(CylinderSizeAddComponent);
    this.subscription.add(
      
      addedData.afterClosed().subscribe((res) => {
        this.renderCylinderList();
      })
    )
  }

  editRow(data: any) {
    const editedData = this.dialogRef.open(CylinderSizeAddComponent, {
      data: data,
    });
  
    editedData.componentInstance.isEditing = true;
    this.subscription.add(

      editedData.afterClosed().subscribe((res) => this.renderCylinderList())
    )
  }

  serchedValue(event: any) {
    this.value = event;
    this.renderCylinderList();
  }

  deleteRow(data: any) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      reverseButtons: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(

          this.cylinderSizeService
            .deleteCylinderSize(data.id)
            .subscribe((res) => {
              this.renderCylinderList()
              Swal.fire('Data has been deleted!', '', 'success');
            })
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Data is safe!', '', 'info');
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
