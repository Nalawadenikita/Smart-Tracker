import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { row } from '@syncfusion/ej2-angular-grids';
import { TransactionsService } from 'src/app/services/features/transaction/transactions.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import {
  LOCALSTORAGE_KEYS,
  LOCALSTORAGE_VALUES,
} from 'src/app/utils/app-constants';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportService } from 'src/app/services/features/report/report.service';
import { log } from 'console';

@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss'],
})
export class TransactionReportComponent implements OnInit {
  transaction: any;
  transactionData: any = [];
  name: string;
  quantity:any;
  date: any;
  locationName: string;
  ecrId: number;
  dcId: number;
  isCustomer: boolean;
  login: any;
  isDownloading: boolean = false;
  comment: string;
  cylinderQrCode: any;
  constructor(
    private transactionService: TransactionsService,
    private storageService: StorageService,
    private dialogRef: MatDialog,
    private reportservice: ReportService
  ) { }
  distributorId = JSON.parse(
    atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1])
  )['DISTRIBUTOR_ID'];

  ngOnInit(): void {
    this.login = JSON.parse(
      this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT)
    );
    this.transactionData = this.transactionService.transactionDetails;
    console.log(this.transactionData);
    this.name = this.transactionData[0].name;
    console.log(this.name);
    
    this.date = this.transactionData[0].transactionDate;
    this.cylinderQrCode = this.transactionData[0].cylinderQrCode;
    console.log(this.cylinderQrCode);
    
     this.locationName = this.transactionData[0].locationName;
    this.ecrId = this.transactionData[0].ecId;
    this.dcId = this.transactionData[0].dcId;
    this.isCustomer = this.transactionData[0].isCustomer;
    this.comment=this.transactionData[0].comment;
    this.quantity=this.transactionData[0].quantity;

  }



  columnData = [
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
      field: 'cylinderType',
      header: ' Cylinder Size ',
      dataType: 'string',
    },
    {
      field: 'cylinderCode',
      header: ' Cylinder Code ',
      dataType: 'string',
    },
    {
      field: 'cylinderQrCode',
      header: ' Cylinder QR Code ',
      dataType: 'string',
    },
  ];

  getImage() {
    let v: any;
    let s: any;
    let img_constant = 'data:image/png;base64,';
    this.isDownloading = true;
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
          console.log('in error');
          if (err.status == 404) {
            this.downloadPDF();
          }
        }
      });
  }

  downloadPDF(source?: any) {
    var doc = new jsPDF();

    if (source) {
      const img = new Image();
      img.src = source;
      const imgWidth = 20;
      const imgHeight = 10;
      const imgX = 10;
      const imgY = 5;
      doc.addImage(img, 'PNG', imgX, imgY, imgWidth, imgHeight);
    }

    let t1: any;
    let t2: any;
    let t3 = 'Transaction Date:' + ' ' + this.date;
    let t4: any;
    let t5: any;
  
    let t6:any;
    let t7:any;

    if (this.isCustomer && this.dcId) {
      t4 = 'Transaction Type:' + 'Distributor To Customer';
    } else if (!this.isCustomer && this.dcId) {
      t4 = 'Transaction Type:' + 'Distributor To Refiller';
    } else if (this.isCustomer && this.ecrId) {
      t4 = 'Transaction Type:' + 'Customer To Distributor';
    } else if (!this.isCustomer && this.ecrId) {
      t4 = 'Transaction Type:' + 'Refiller To Distributor';
    }

    if (this.ecrId && this.isCustomer) {
      t2 = 'ECR Number:' + this.ecrId;
    }

    else {
      t2 = 'DC Number:' + this.dcId;
    }

    if (this.isCustomer) {
      t1 = 'Customer Name: ' + this.name;

    }
    else {
      t1 = 'Refiller Name: ' + this.name;

    }

    if (this.locationName && this.isCustomer) {
    t5 = 'Site Name:' + this.locationName;

    doc.setFontSize(12);
    doc.text(t5, 15, 40);
    doc.setFontSize(12);
    doc.text(t1, 15, 30);

      doc.setFontSize(12);
      doc.text(t2, 15, 50);

      doc.setFontSize(12);
      doc.text(t3, 60, 50);

    doc.setFontSize(12);
    doc.text(t4, 120, 50);

    if(this.comment){
      t6="comment:"+this.comment
      doc.setFontSize(12)
      doc.text(t6,15,60)
    }
    t7="quantity:"+this.quantity;
    doc.setFontSize(12)
    doc.text(t7,15,70)
    }
    else{
    doc.setFontSize(12);
    doc.text(t1, 15, 30);

      doc.setFontSize(12);
      doc.text(t2, 15, 40);

      doc.setFontSize(12);
      doc.text(t3, 60, 40);

    doc.setFontSize(12);
    doc.text(t4, 120, 40);

    if(this.comment){
      t6="Comment:"+this.comment
      doc.setFontSize(12)
      doc.text(t6,15,50)
    }
    t7="Quantity:"+this.quantity;
    doc.setFontSize(12);
    doc.text(t7,15,60);

    }
    let verticalSpace: any;
    // Adjust this line according to your needs

    
 
    doc.setFontSize(16);
    doc.text('Transaction Detail  Report', 75, 10);



    const currentDate = new Date().toLocaleDateString();

    doc.setFontSize(10);
    doc.text(currentDate, doc.internal.pageSize.getWidth() - 10, 10, {
      align: 'right',
    });
   
    if (this.locationName && this.isCustomer) {
      verticalSpace = 55;
    }
    else {
      verticalSpace = 45;
    }

    doc.text('', 10, verticalSpace);

    autoTable(doc, {
      html: '#Transaction',
      startY: verticalSpace,
      theme: 'grid',
    });
   


  }

  closeDialog() {
    this.dialogRef.closeAll();
  }
}
