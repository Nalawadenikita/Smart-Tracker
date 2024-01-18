import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/features/report/report.service';
import * as XLSX from 'xlsx';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { CustomersService } from 'src/app/services/features/customers/customers.service';
import { InventoryService } from 'src/app/services/features/invetory/inventory.service';
import { CylinderSizeService } from 'src/app/services/features/cylinderSize/cylinder-size.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';
import * as fs from "file-saver";
import { Workbook } from 'exceljs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.scss'],
})
export class DeliveryReportComponent implements OnInit {

  isDesc: boolean = false;
  column: string = 'name';
  transformSelectedData: any;
  fileName = 'ExcelSheet.xlsx';
  sumArray: any = [];
  startDate: any;
  endDate: any;
  isLoading: any = true;
  reportsData: any = [];
  reportsList: any = [];
  distributorId: any;
  customers: any;
  gastype: any;
  value: any;
  cylinderSize: any;
  gasId: any = null;
  cylinderId: any = null;
  customerId: any = null;
  public date: DatePipe = new DatePipe('en-US');
  is_date: boolean = false;
  filtersForm: FormGroup;

  pageIndex: number = 1;
  pageNumber:number=0;
  totalRecords: number;
  totalPages: number;
  currentPage: number;

  nreportsData: any = [];
  nreportsList: any = [];
  isDownloading:boolean=false;
  


  constructor(private reportservice: ReportService,
    private storageService: StorageService,
    private customerService: CustomersService,
    private inventoryServices: InventoryService,
    private cylinderSizeService: CylinderSizeService,
    private datePipe: DatePipe) {

    this.filtersForm = new FormGroup({
      customerName: new FormControl(null),
      gasType: new FormControl(null),
      cylinderSize: new FormControl(null),
      startDate: new FormControl(null),
      endDate: new FormControl(null)
    })

  }


  ngOnInit(): void {
    // this.exportexcel();    
    this.distributorId = JSON.parse(atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1]))['DISTRIBUTOR_ID'];
    console.log(this.distributorId)
    this.getReportData();
    this.getCustomers();
    this.getGasType();
    this.getCylinderSize()
  }



  columnData = [

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
      field: 'gasName',
      header: 'Gas Type',
      dataType: 'string',
    },

    {
      field: 'cylinderType',
      header: 'Cylinder Size',
      dataType: 'string',
    },

    // {
    //   field: 'cylinderQrCode',
    //   header: 'Cylinder QR Code',
    //   dataType: 'string',
    // },
    {
      field: 'cylinderCount',
      header: ' Number Of Cylinder',
      dataType: 'string',
    },
    {
      field: 'cylinderCode',
      header: 'Cylinder Code',
      dataType: 'string',
    },
    {
      field: 'transactionDate',
      header: 'Transaction Date',
      dataType: 'string',
    }
  ]

  sumCountColumn = [
    {
      field: 'name',
      header: 'Customer Name',
      dataType: 'string',
    },
    {
      field: 'gasName',
      header: 'Nature of Gas',
      dataType: 'string',
    },
    {
      field: 'cylinderCount',
      header: ' Total Holdings',
      dataType: 'string',
    },
  ]

  selectedCus(event: any) {
    this.customerId = event.value;
    this.isLoading=true;
    this.pageIndex = 1;
    this.getReportData()
  }

  selectedGas(event: any) {
    this.gasId = event.value;
    this.isLoading=true;
    this.pageIndex = 1;
    this.getReportData();
  }

  selectedSize(event: any) {
    this.cylinderId = event.value;
    this.isLoading=true;
    this.pageIndex = 1;
    this.getReportData();
  }

  selectStartDate(event: any) {
    // this.startDate = this.datePipe.transform(event.value, "MM-dd-yy");
    this.startDate = this.datePipe.transform(event.value,'yyyy/MM/dd');
    console.log(this.startDate);
    this.is_date = true;
    this.getReportData();
    // this.filterDates()
  }

  selectEndDate(event: any) {
    // this.endDate = this.datePipe.transform(event.value, "MM-dd-yy");
    this.endDate = this.datePipe.transform(event.value,'yyyy/MM/dd');
    console.log(this.endDate);
    this.is_date = true;
    this.isLoading=true;
    this.getReportData();
    // this.filterDates()
  }



  clearFilterdata() {
    this.startDate = null;
    this.endDate = null;
    this.filtersForm.reset();
    this.getReportData();
  }

  getCustomers(search:any=null) {
    this.customerService.getCustomersByDistributorId(this.distributorId, { page: this.pageIndex, pageSize: 1000,search:search ? search:""}).subscribe((res) => {
      this.customers = res.data;
      console.log(this.customers);
    })
  }

  customerInputChange(data:any){
    console.log(data);
    
       if(data.target.value !== '' && data.target.value.trim() !== '' ){
         this.getCustomers(data.target.value);
       }else if(data.target.value !==this.customers){
        //  this.getCustomers(null);
       }
       
       }
  getGasType() {
    const uniqueIds: any = [];
    this.inventoryServices.getCylinderById(this.distributorId).subscribe((res: any) => {
      if (res) {
        this.gastype = res.map((item: any) => item.gasType)
        this.gastype = this.gastype.filter((element: any) => {
          const isDuplicate = uniqueIds.includes(element.id);

          if (!isDuplicate) {
            uniqueIds.push(element.id);

            return true;
          }

          return false;
        });

      }

    });

  }

  getCylinderSize() {
    this.cylinderSizeService.getCylinderSize({page:1,pageSize:1000}).subscribe((res: any) => {
      this.cylinderSize = res.data.data;
    });
  }

  getReportData() {
    this.reportsList = [];

    this.reportservice.billingReportAll(this.distributorId, this.customerId, this.gasId, this.cylinderId, this.startDate,this.endDate,{ page: this.pageIndex, pageSize: 10 }).subscribe({next:(res) => {
      if (res) {
        this.isLoading = false
        this.reportsData = res.data;
        console.log(res);

        this.totalRecords = res.totalRecords;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        this.pageNumber=res.pageSize*this.currentPage;

        this.reportsList = this.reportsData.map((element: any, index: number) => {
          let new_date=element.cylinderTransactionDate;
          let parts=new_date.split(" ");
          let date=parts[0];
          return { "id": element.id, "name": element.customerId.name, "cylinderType": element.cylinderSize.cylinderType, "gasName": element.gasType.gasName, "cylinderCount": element.cylinderCount,"cylinderCode":element.cylinderCode,"cylinderQrCode":element.cylinderQrCode,"dcrId": element.dcrId, "Location": element.locationName, "transactionDate": date }
        });
        console.log(this.reportsList);
      }
      else {
        this.isLoading = true;
      }
    },
  error:(err)=>{
    if(err.status==404){
      this.isLoading=false;
    }
  }})
  }

  handlePageEvent(event: any) {
    console.log("event == ", event.pageIndex + 1);
    this.pageIndex = event.pageIndex + 1;
    this.getReportData();
  }


  serchedValue(event: any) {
    this.value = event;
  }

  



  getData() {


    this.isDownloading=true;
    this.nreportsList = [];

    this.reportservice.billingReportAll(this.distributorId, this.customerId, this.gasId, this.cylinderId,this.startDate,this.endDate,{ page: this.pageIndex, pageSize: 1000 }).subscribe((res) => {
      if (res) {
        this.nreportsData = res.data;
        console.log(res);
        
        this.nreportsList = this.nreportsData.map((element: any, index: number) => {
         // let date = this.datePipe.transform(element.cylinderTransactionDate, "dd-MM-yyyy")
         let new_date=element.cylinderTransactionDate;
        let parts=new_date.split(" ");
      let date=parts[0];
          return {"index":index+1, "name": element.customerId.name, "Location": element.locationName,"cylinderCode":element.cylinderCode, "cylinderQrCode":element.cylinderQrCode, "gasName": element.gasType.gasName, "cylinderType": element.cylinderSize.cylinderType,"cylinderCount": element.cylinderCount,"dcrId": element.dcrId,  "transactionDate": date }
        });
        console.log(this.nreportsList);
        this.exportexcel();
      }
      else {
        this.isLoading = true;
      }
    })

  }
  exportexcel(): void {


    const workbook = new Workbook();


    const current_date = new Date();
    let new_date = this.datePipe.transform(current_date, 'dd-MM-yyyy');
    console.log(new_date);
    const worksheet = workbook.addWorksheet('Book1');
    const header_cell = worksheet.addRow(['Delivery Report']);
    worksheet.getCell('A1');
    worksheet.mergeCells('A1:H1');


    header_cell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    }
    header_cell.font = {
      bold: true
    }
    if (this.is_date) {
      let sd = this.datePipe.transform(this.startDate, 'dd-MM-yyyy')
      let ed = this.datePipe.transform(this.endDate, 'dd-MM-yyyy')

      const header_cell2 = worksheet.addRow([sd + '      To         ' + ed]);


      worksheet.getCell('A2');
      worksheet.mergeCells('A2:H2');


      header_cell2.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      }
    }





    const headerRow = worksheet.addRow(['Sr.No','Customer Name', 'Site Name','Cylinder Code','Cylinder QR Code','Gas Type', 'Cylinder Size','Qty', 'DC No', ' Transaction Date']);
headerRow.font={
  bold:true
}
    this.nreportsList.forEach((row: any, index: number) => {
      let new_row;
      new_row = worksheet.addRow(Object.values(row));
    })


    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      fs.saveAs(blob, 'Delivery Report.xlsx');
      this.isDownloading=false;
    });
  }


  downloadPDF(){
    var doc=new jsPDF();
    

    doc.setFontSize(16);
    doc.text('Delivery Report', 60, 10);

    const currentDate = new Date().toLocaleDateString();

    doc.setFontSize(10);
    doc.text(currentDate, doc.internal.pageSize.getWidth() - 10, 10, { align: 'right' });

    const verticalSpace = 25; // Adjust the value to increase or decrease the space
    doc.text('', 10, verticalSpace);

    autoTable(doc, { html: "#Delivery", startY: verticalSpace, theme: 'grid' });
    doc.save("Delivery Report");

  }
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  dataSource = new MatTableDataSource(this.columnData);
  dataSourceWithPageSize = new MatTableDataSource(this.columnData);
  pageSizes = [0, 3, 5];

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }
}





