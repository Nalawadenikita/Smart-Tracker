import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/features/invetory/inventory.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DistributorService } from 'src/app/services/features/distributor/distributor.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import {
  LOCALSTORAGE_KEYS,
  LOCALSTORAGE_VALUES,
} from 'src/app/utils/app-constants';
import { ReportService } from 'src/app/services/features/report/report.service';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cylinder-history',
  templateUrl: './cylinder-history.component.html',
  styleUrls: ['./cylinder-history.component.scss'],
})
export class CylinderHistoryComponent implements OnInit {
  historyList: any = [];
  public subscription: Subscription = new Subscription();
  value = '';
  cylinderSize = '';
  gasType = '';
  cylinderCode = '';
  login: any;
  distributorName: any;
  startDate: any;
  endDate: any;
  is_date: boolean = false;
  isDownloading:boolean=false;

  cols = [
    {
      field: 'id',
      header: 'Sr.No',
      dataType: 'string',
    },
    {
      field: 'transaction_id',
      header: 'Transaction Id',
      dataType: 'string',
    },
    {
      field: 'transaction_type',
      header: 'Trasaction Type',
      dataType: 'string',
    },
    {
      field: 'customer_name',
      header: 'Name',
      dataType: {},
      isCustomer: 'isCustomer',
    },
    {
      field: 'dcId',
      header: 'DC Number',
      dataType: 'string',
    },
    {
      field: 'ecrId',
      header: 'ECR Number',
      dataType: 'string',
    },
    {
      field: 'locationName',
      header: 'Site Name',
      dataType: 'string',
    },
    {
      field: 'transaction_date',
      header: 'Transaction Date',
      dataType: 'string',
    },
  ];

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private distributor: DistributorService,
    private storageService: StorageService,
    private dialogRef: MatDialog,
    private reportservice: ReportService
  ) {}

  ngOnInit(): void {
    this.login = JSON.parse(
      this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT)
    );
    this.subscription.add(

      this.distributor
        .getDistributorById(this.login['DISTRIBUTOR_ID'])
        .subscribe((res) => {
          this.distributorName = res['name'];
        })
    )
    

    if (this.inventoryService.CylinderHistoryData) {
      this.historyList = this.inventoryService.CylinderHistoryData;
      this.gasType = this.historyList[0].gasType;
      this.cylinderCode = this.historyList[0].cylinderCode;
      this.cylinderSize = this.historyList[0].cylinderSize;
    } else {
      this.router.navigate(['features/inventory/cylinder-list']);
    }
  }

  selectStartDate(event: any) {
    // this.startDate = this.datePipe.transform(event.value, "MM-dd-yy");
    this.startDate = event.value;
    this.is_date = true;
    this.filterDates();
  }

  selectEndDate(event: any) {
    // this.endDate = this.datePipe.transform(event.value, "MM-dd-yy");
    this.endDate = event.value;
    this.is_date = true;
    this.filterDates();
  }

  filterDates() {
    if (this.startDate && this.endDate) {
      this.historyList = this.historyList.filter((item: any) => {
        let dat = new Date(item.transaction_date);
        return dat >= this.startDate && dat <= this.endDate;
      });
    }
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }

  getImage() {
    let v: any;
    let s: any;
    let img_constant = 'data:image/png;base64,';
    this.isDownloading=true;
this.subscription.add(

  this.reportservice
    .getImageBydistributor(this.login['DISTRIBUTOR_ID'])
    .subscribe({
      next: (res) => {
        v = res.image;
        if (v) {
          s = img_constant + v;
          this.downloadPDF(s);
        }
      },
      error: (err) => {
        if(err.status=404){
          this.downloadPDF();
        }
      },
    })
)
  }
  downloadPDF(source?: any) {
    var doc = new jsPDF();

    if(source){
    const img = new Image();
    img.src = source;
    const imgWidth = 20;
    const imgHeight = 10;
    const imgX = 10; // Center the image horizontally
    const imgY = 5;
    doc.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);
    }

    let t1 = 'Cylinder code:' + ' ' + this.cylinderCode;
    let t2 = 'Gas Type:' + ' ' + this.gasType;
    let t3 = 'Cylinder Size:' + ' ' + this.cylinderSize;

    doc.setFontSize(16);
    doc.text('Cylinder History Report', 75, 10);

   

    doc.setFontSize(10);
    doc.text(t1, 15, 30);

    doc.setFontSize(10);
    doc.text(t2, 90, 30);

    doc.setFontSize(10);
    doc.text(t3, 150, 30);

    const currentDate = new Date();
    let formattedDate=this.formatDate(currentDate);

    doc.setFontSize(10);
    doc.text(formattedDate, doc.internal.pageSize.getWidth() - 10, 10, {
      align: 'right',
    });

    const verticalSpace = 35; // Adjust the value to increase or decrease the space
    doc.text('', 10, verticalSpace);

    autoTable(doc, { html: '#History', startY: verticalSpace, theme: 'grid' });
    doc.save('Cylinder History');
    this.isDownloading=false;
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  formatDate(date:any) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
