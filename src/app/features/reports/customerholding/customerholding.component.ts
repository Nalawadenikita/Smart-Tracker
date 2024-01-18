import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportService } from 'src/app/services/features/report/report.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DistributorLoginComponent } from 'src/app/auth/distributor-login/distributor-login.component';
import { DistributorService } from 'src/app/services/features/distributor/distributor.service';
import { CustomersService } from 'src/app/services/features/customers/customers.service';

@Component({
  selector: 'app-customerholding',
  templateUrl: './customerholding.component.html',
  styleUrls: ['./customerholding.component.scss'],
  
})
export class CustomerholdingComponent implements OnInit {
  isDesc: boolean = false;
  column: string = 'name';
  transformSelectedData: any;
  fileName = 'ExcelSheet.xlsx';
  noTranspres:boolean=false;
  sumArray: any = [];
  isLoading: any = false;
  one: any = 1;
  is_image: boolean = false;
  isDownloading: boolean = false;
  showReport: boolean = false;
  pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  reportsData: any = [];
  reportsList: any = [];
  distributorId: any;
  value: any;
  tabledata: any = {};
  tableData: any[] = [];
  filter_location_data: any = {};
  end_data: any = [];
  location_data: any = [];
  location_list: any = [];
  tableData_forPDF: any = {};
  nfilter_location_data: any = {};
  end_data_forPDF: any = [];
  location_data_forPDF: any = [];
  nlocation_list: any = [];
  npageIndex: number = 1;
  ntotalRecords: number;
  ntotalPages: number;
  ncurrentPage: number;
  reportsData_forPDF: any = [];
  nreportsList: any = [];
  final_pdf_data: any = [];
  final_data: any = [];
  login: any;
  distributorName:any;
  pdfURL: any;
  nowShow: boolean = false;
  pdfSrc: SafeResourceUrl | any;
  imageSource: any;
  customers:any=[];
  CustomerId:any="All";
  displayTable:boolean=false;
  isCursor:boolean=false;
 

  @ViewChild('sumReport', { static: false }) sumReport: ElementRef;
  @ViewChild('iframeElement') iframeElement: ElementRef;
  iframeSrc: SafeResourceUrl;


  constructor(
    private reportservice: ReportService,
    private storageService: StorageService,
    private distributor:DistributorService,
    public datepipe: DatePipe,
    private sanitizer: DomSanitizer,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
    this.login = JSON.parse(
      this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT)
    );
    this.distributorId = JSON.parse(
      atob(
        this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1]
      )
    )['DISTRIBUTOR_ID'];
    this.login = JSON.parse(
      this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT)
    );
  

      this.distributor
        .getDistributorById(this.login['DISTRIBUTOR_ID'])
        .subscribe((res) => {
          this.distributorName = res['name'];
        })
    
    //this.getData();
    //this.displayPDF();
    this.isCursor=false;
    this.displayTable=false;
    this.noTranspres=false;
    this.getCustomers();

  }

  selectedCus(data:any){
    this.isCursor=true;
    this.isLoading=true;
    this.displayTable=true;
    console.log(data.value)
    if(data.value=="All"){
      this.noTranspres=false;
      // this.CustomerId="All";
      this.getData();
      console.log('nownow')
    }
    else{
    console.log('klkl')
    this.CustomerId=data.value;
    this.getDataByCus();
    }

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

  getDataByCus(source?:any){
    this.end_data_forPDF = [];
    this.tableData_forPDF = {};
    this.reportsData_forPDF = [];
    this.location_data_forPDF = [];
    this.nlocation_list = [];
    this.final_pdf_data = [];
    

    this.reportservice
      .getCustomerHoldingByCustomer(this.distributorId,this.CustomerId, { page: this.pageIndex, pageSize: 100000 })
      .subscribe({
        next: (res) => {
          if (res) {
            this.isLoading = false;
            this.noTranspres=false;
            this.reportsData_forPDF = res.data;
            console.log(this.reportsData_forPDF);
            this.reportsData_forPDF.forEach((record: any) => {
              if (!this.tableData_forPDF[record.customerId.name]) {
                this.tableData_forPDF[record.customerId.name] = {
                  data: [
                    {
                      customer_name: record.customerId.name,
                      t_date: record.cylinderTransactionDate,
                      t_code: record.dcrId ? record.dcrId : 'Na',
                      cylinder_code: record.cylinderCode
                        ? record.cylinderCode
                        : 'Na',
                      qrCode:record?.cylinderQrCode,
                      nature_of_gas: record.gasType.gasName,
                      cylinder_size: record.cylinderSize.cylinderType,
                      holding_count: record.cylinderCount,
                      location: record.locationName,
                    },
                  ],
                  total: record.cylinderCount,
                };
              } else {
                this.tableData_forPDF[record.customerId.name].data.push({
                  customer_name: record.customerId.name,
                  t_date: record.cylinderTransactionDate,
                  t_code: record.dcrId ? record.dcrId : 'Na',
                  cylinder_code: record.cylinderCode ? record.cylinderCode : 'Na',
                  qrCode:record?.cylinderQrCode,
                  nature_of_gas: record.gasType.gasName,
                  cylinder_size: record.cylinderSize.cylinderType,
                  holding_count: record.cylinderCount,
                  location: record.locationName,
                });
                this.tableData_forPDF[record.customerId.name].total +=
                  record.cylinderCount;
              }
            });

            Object.keys(this.tableData_forPDF).forEach((key) => {
              // let loc_count = 0;
              this.tableData_forPDF[key].data.forEach((record: any) => {
                let a = this.nlocation_list.find((x: any) => {
                  if (x.location == record.location) {
                    return x;
                  }
                });

                if (!a) {
                  let obj = {
                    location: record.location,
                    location_count: record.holding_count,
                    count: record.holding_count,
                  };
                  this.nlocation_list.push(obj);
                  // loc_count = record.holding_count;
                  // record['location_count'] = obj['count'];
                } else {
                  a['count'] += record.holding_count;
                }
                this.end_data_forPDF.push(record);
              });

              this.end_data_forPDF.push({
                total: this.tableData_forPDF[key].total,
              });
            });

            this.end_data_forPDF.forEach((record: any) => {
              if (!record.total) {
                this.final_pdf_data.push(record);
                this.final_pdf_data.sort((a: any, b: any) => {
                  const locationA = a.location;
                  const locationB = b.location;

                  if (locationA < locationB) {
                    return -1;
                  }
                  if (locationA > locationB) {
                    return 1;
                  }
                  return 0;
                });
              } else {
                this.final_pdf_data.push({ total: record.total });
                console.log(this.final_pdf_data);
              }
            });

            this.final_pdf_data.map((ele:any)=>{
              if(ele.t_date){
                ele.t_date=this.formatDateNew(ele.t_date)
              }
            })
      
            this.final_pdf_data=[...this.final_pdf_data]
            console.log(this.final_pdf_data);
            this.isLoading=false;
           
          } else {
            this.isLoading = true;
          }
        },
        error: (err) => {
          if (err.status == 404) {
            this.noTranspres=true;
            this.isLoading = false;
           
          }
        }
      });

  }

  formatDateNew(dateStr: string): string {
    // Split the date string
    const parts = dateStr.split('-');

    // Extract day, month, and year
    const day = parts[0];
    const month = parts[1];
    const year = parts[2].split(' ')[0];

    // Reformat the date
    return `${day}-${month}-${year}`;
  }

  getData() {
    console.log('herehere');
    this.end_data_forPDF = [];
    this.tableData_forPDF = {};
    this.reportsData_forPDF = [];
    this.location_data_forPDF = [];
    this.nlocation_list = [];
    this.final_pdf_data = [];

    this.reportservice
      .getNewCustomerHolding(this.distributorId, { page: this.pageIndex, pageSize: 100000 })
      .subscribe({
        next: (res) => {
          if (res) {
            this.isLoading = false;
            this.noTranspres=false;
            this.reportsData_forPDF = res.data;
            console.log(this.reportsData_forPDF);
            this.reportsData_forPDF.forEach((record: any) => {
              if (!this.tableData_forPDF[record.customerId.name]) {
                this.tableData_forPDF[record.customerId.name] = {
                  data: [
                    {
                      customer_name: record.customerId.name,
                      t_date: record.cylinderTransactionDate,
                      t_code: record.dcrId ? record.dcrId : 'Na',
                      cylinder_code: record.cylinderCode
                        ? record.cylinderCode
                        : 'Na',
                      qrCode:record?.cylinderQrCode,
                      nature_of_gas: record.gasType.gasName,
                      cylinder_size: record.cylinderSize.cylinderType,
                      holding_count: record.cylinderCount,
                      location: record.locationName,
                    },
                  ],
                  total: record.cylinderCount,
                };
              } else {
                this.tableData_forPDF[record.customerId.name].data.push({
                  customer_name: record.customerId.name,
                  t_date: record.cylinderTransactionDate,
                  t_code: record.dcrId ? record.dcrId : 'Na',
                  cylinder_code: record.cylinderCode ? record.cylinderCode : 'Na',
                  qrCode:record?.cylinderQrCode,
                  nature_of_gas: record.gasType.gasName,
                  cylinder_size: record.cylinderSize.cylinderType,
                  holding_count: record.cylinderCount,
                  location: record.locationName,
                });
                this.tableData_forPDF[record.customerId.name].total +=
                  record.cylinderCount;
              }
            });

            Object.keys(this.tableData_forPDF).forEach((key) => {
              // let loc_count = 0;
              this.tableData_forPDF[key].data.forEach((record: any) => {
                let a = this.nlocation_list.find((x: any) => {
                  if (x.location == record.location) {
                    return x;
                  }
                });

                if (!a) {
                  let obj = {
                    location: record.location,
                    location_count: record.holding_count,
                    count: record.holding_count,
                  };
                  this.nlocation_list.push(obj);
                  // loc_count = record.holding_count;
                  // record['location_count'] = obj['count'];
                } else {
                  a['count'] += record.holding_count;
                }
                this.end_data_forPDF.push(record);
              });

              this.end_data_forPDF.push({
                total: this.tableData_forPDF[key].total,
              });
            });

            this.end_data_forPDF.forEach((record: any) => {
              if (!record.total) {
                this.final_pdf_data.push(record);
                this.final_pdf_data.sort((a: any, b: any) => {
                  const locationA = a.location;
                  const locationB = b.location;

                  if (locationA < locationB) {
                    return -1;
                  }
                  if (locationA > locationB) {
                    return 1;
                  }
                  return 0;
                });
              } else {
                this.final_pdf_data.push({ total: record.total });
                console.log(this.final_pdf_data);
              }
            });

            this.final_pdf_data.map((ele:any)=>{
              if(ele.t_date){
                ele.t_date=this.formatDateNew(ele.t_date)
              }
            })
      
             this.final_pdf_data=[...this.final_pdf_data]
            console.log(this.final_pdf_data);
           
          } else {
            this.isLoading = true;
          }
        },
        error: (err) => {
          if (err.status == 404) {
            this.isLoading = false;
          }
        }
      });

      
    
    
  }


  downloadPDF() {
    let v: any;
    let s: any;
    let img_constant = 'data:image/png;base64,';
    this.isDownloading=true;

    this.reportservice
      .getImageBydistributor(this.login['DISTRIBUTOR_ID'])
      .subscribe({
        next: (res) => {
          // this.isDownloading=true;
          console.log('now');
          v = res.image;
          console.log(v);
          if (v) {
            s = img_constant + v;
            this.getImage(s)
          }
          else{
            this.getImage()
          }
        },
        error: (err) => {
          if ((err.status = 404)) {
            this.getData();
          } else if ((err.status = 500)) {
            Swal.fire({
              title: ' Internal Server Error',
              text: 'There was an error on the server. Please try again later.',
              icon: 'error',
            });
          }
        },
      });
   
  }


  getImage(s?:any){
    this.isDownloading = true;
    var doc = new jsPDF('landscape');
    const img = new Image();

    if (s) {
      img.src = s;
      const imgWidth = 20;
      const imgHeight = 10;
      const imgX = 10;
      const imgY = 5;
      doc.addImage(img, imgX, imgY, imgWidth, imgHeight);
    }

    doc.setFontSize(16);
    const title = 'Customer Holding Report';
    const titleWidth = doc.getTextWidth(title);
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleX = (pageWidth - titleWidth) / 2;  // Calculate the X position for the title
    doc.text(title, titleX, 10);
    doc.setFontSize(14);
    doc.text(this.distributorName,120,20);

    let currentDate: any = new Date();
    let formattedDate: any = this.formatDate(currentDate);


    // Add report generation date
    doc.setFontSize(10);
    doc.text("As on"+" "+formattedDate, doc.internal.pageSize.getWidth() - 10, 10, {
      align: 'right',
    });

    const verticalSpace = 25; // Adjust the value to increase or decrease the space
    doc.text('', 10, verticalSpace);

    const headers = [
      'Transaction Date',
      'Customer Name',
      'Location',
      'Gas Type',
      'DCID',
      'Cylinder Size',
      'QR Code',
      'Cylinder Code',
    ];

    const tableData: any[] = []; // Array to store table data
    console.log(this.end_data);
    console.log(this.location_list);
    console.log(this.end_data_forPDF);

    this.final_pdf_data.forEach((row: any, index: number) => {
      console.log('vvv');
      if (!row.total) {
        const newRow = [
          row.t_date,
          row.customer_name,
          row.location,
          row.nature_of_gas,
          row.t_code,
          row.cylinder_size,
          row.qrCode,
          row.cylinder_code,
        ];
        tableData.push(newRow);
      } else {
        const totalHolding =
          'Total holding of ' +
          this.final_pdf_data[index - 1].customer_name +
          ': ' +
          row.total;
        const newRow = [{ content: totalHolding, colSpan: headers.length }];
        tableData.push(newRow);
      }
      this.nlocation_list.forEach((element: any) => {
        if (
          row.location == element.location &&
          this.final_pdf_data[index + 1].location != element.location
        ) {
          const locationHolding =
            'Total holding at location ' +
            element.location +
            ' of ' +
            row.customer_name +
            ': ' +
            element.count;
          const newRow = [
            { content: locationHolding, colSpan: headers.length },
          ];
          tableData.push(newRow);
        }
      });
    });

    const startY = verticalSpace + 10; // Adjust the value to change the starting y-coordinate of the table
    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: startY,
      theme: 'grid',
      headStyles: { fillColor: [0, 128, 0] },
    });

    doc.save('Customer Holding Report');
    this.isDownloading = false;

  }



  formatDate(date: any) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }



}


