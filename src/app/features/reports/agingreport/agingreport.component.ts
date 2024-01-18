import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/features/report/report.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { CustomersService } from 'src/app/services/features/customers/customers.service';

import * as XLSX from 'xlsx';
import { TransactionsService } from 'src/app/services/features/transaction/transactions.service';
import { DatePipe } from '@angular/common';
const { read, write, utils } = XLSX;
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { DistributorService } from 'src/app/services/features/distributor/distributor.service';

@Component({
  selector: 'app-agingreport',
  templateUrl: './agingreport.component.html',
  styleUrls: ['./agingreport.component.scss'],
})
export class AgingReportComponent implements OnInit {
  fileName = 'ExcelSheet.xlsx';

  distributorId = JSON.parse(
    atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1])
  )['DISTRIBUTOR_ID'];
  Id: any = null;
  transactionTypeId: any;
  value: any;
  customerReportsData: any = [];
  customerReportsList: any = [];
  customers: any = [];
  transactionType: any;
  one: any = 1;
  final_total: any;
  distributor_final_total: any = 0;
  customer_final_total: any = 0;
  msg: any;
  final_table_data: any = [];
  distributor_table_data: any = {};
  distributor_end_data: any = [];
  customer_table_data: any = {};
  customer_end_data: any = [];
  report_header: any;
  dayValues: any = [15, 30, 45, 60, 90, 120];
  day: any = null;
  currentDate: Date;

  pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  pageNumber: number;
  currentPage: number;
  ncustomerReportsData: any = [];
  ncustomerReportsList: any = [];
  isLoading: any = true;
  isDownloading: boolean = false;
  excelName: any;
  searchTerm: any;

  constructor(
    private reportservice: ReportService,
    private storageService: StorageService,
    private customerService: CustomersService,
    private transactionService: TransactionsService,
    public datepipe: DatePipe
  ) { }

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize: MatPaginator;
  ngOnInit(): void {
    this.getReportsByCustomers();
    this.getCustomers();
    this.getTransactionType();
    this.report_header = 'For All Customers';
    this.currentDate = new Date();
    this.excelName = 'Aging Report' + '_' + this.datepipe.transform(this.currentDate, 'dd-MM-yyyy'); +'.xlsx'
    console.log(this.excelName);
  }

  ngOnChanges(): void { }

  columnData = [
    {
      field: 'id',
      header: 'Sr.no',
      dataType: 'string',
    },
    {
      field: 'cylinderCode',
      header: 'Cylinder ID',
      dataType: 'string',
    },
    {
      field: 'gasType',
      header: 'Nature of Gas',
      dataType: 'string',
    },

    {
      field: 'cylinderSize',
      header: 'Cylinder Size',
      dataType: 'string',
    },

    {
      field: 'transactionDate',
      header: ' Transaction Date',
      dataType: 'string',
    },
    {
      field: 'dcrId',
      header: ' DCId ',
      dataType: 'string',
    },
    {
      field: 'days',
      header: 'Days',
      dataType: 'string',
    },
  ];

  selectedTrans(event: any) {
    this.transactionTypeId = event.value;
  }

  selectedCus(event: any) {
    this.final_total = null;
    this.Id = event.value;
    this.pageIndex = 1;
    this.isLoading=true;
    this.getReportsByCustomers();
  }

  selectedDay(event: any) {
    this.day = event.value;
    this.pageIndex = 1;
    this.isLoading=true;
    this.getReportsByCustomers();
  }

 
  getCustomers(search: any = null) {
    this.customerService
      .getCustomersByDistributorId(this.distributorId, {
        page: 1,
        pageSize: 1000,
        search: search ? search : ""
      })
      .subscribe((res) => {
        if (res && res.data) {
          const filteredCustomers = res.data.filter((customer: any) =>
            this.customerMatchesSearch(customer, search)
          );

          this.customers = filteredCustomers;
        }
      });
  }

  customerMatchesSearch(customer: any, search: any): boolean {
    if (!search) {
      return true;
    }


    const customerName = customer.name.toLowerCase();
    const searchTerm = search.toLowerCase();

    return customerName.includes(searchTerm);
  }

  customerInputChange(data: any) {
    console.log(data);
    const inputValue = data.target.value.trim();
    if (inputValue !== '') {
      if (inputValue !== this.searchTerm) {
        this.getCustomers(inputValue);
        this.searchTerm = inputValue;
      }
    } else {
      this.getCustomers(null);
      this.searchTerm = '';
    }
  }


  getTransactionType() {
    this.transactionService.getTransactionType().subscribe((res) => {
      this.transactionType = res;
    });
  }

  handlePageEvent(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.getReportsByCustomers();
  }

  getReportsByCustomers() {
    this.customerReportsList = [];
    this.reportservice
      .byCustomerReport(
        this.distributorId,
        this.Id,
        { page: this.pageIndex, pageSize: 10 },
        this.day
      )
      .subscribe({
        next: (res: any) => {
          this.customerReportsData = res.data;
          this.totalRecords = res.totalRecords;
          this.totalPages = res.totalPages;
          this.currentPage = res.currentPage;
          this.pageNumber = res.pageSize * this.currentPage;
          if (res) {
            this.isLoading = false;
            console.log(res);
            this.customerReportsList = this.customerReportsData.map(
              (ele: any, i: number) => {
                let new_date = ele.transactionDate;
                let parts = new_date.split(" ");
                let date = parts[0];
                console.log(date);
                this.report_header = ele.customer;
                return {
                  name: ele.customer,
                  id: ele.cylinderCode,
                  gas_type: ele.gasType,
                  cylinder_size: ele.cylinderSize,
                  Location: ele.locationName,
                  date: date,
                  dcId: ele.dcrId,
                  days: ele.days,
                  QR:ele.cylinderQrCode
                };
              }
            );
          }
        },
        error: (err) => {
          if (err.status) {
            this.isLoading = false;
          }
        }
      });
  }

  serchedValue(event: any) {
    this.value = event;
  }

  getData() {
    this.isDownloading = true;
    this.ncustomerReportsList = [];
    this.reportservice
      .byCustomerReport(
        this.distributorId,
        this.Id,
        { page: this.pageIndex, pageSize: 1000 },
        this.day
      )
      .subscribe({
        next: (res: any) => {
          this.ncustomerReportsData = res.data;
          console.log(this.ncustomerReportsData);
          if (this.Id && this.day) {
            this.report_header = 'Total Transaction of' + ' ' + this.ncustomerReportsData[0].customer + " for more than " + this.day + ' days';
          } else if (this.Id && !this.day) {
            this.report_header = 'Total Transaction of' + ' ' + this.ncustomerReportsData[0].customer;
          }
          else if (this.day && !this.Id) {
            this.report_header = 'Total Transaction more than' + ' ' + this.day;
          }
          else {
            this.report_header = 'For All Customers' + '   ' + 'For All Days';
          }
          if (res) {
            console.log(res);
            this.ncustomerReportsList = this.ncustomerReportsData.map(
              (ele: any, i: number) => {
                let new_date = ele.transactionDate;
                let parts = new_date.split(" ");
                let date = parts[0];
                return {
                  i:i+1,
                  name: ele.customer,
                  id: ele.cylinderCode,
                  QR:ele.cylinderQrCode,
                  gas_type: ele.gasType,
                  cylinder_size: ele.cylinderSize,
                  Location: ele.locationName,
                  date: date,
                  dcId: ele.dcrId,
                  days: ele.days,
                };
              }
            );
            this.exportexcel();
          }
        },
        error: (err) => {
          if (err.status = 404) {
            this.isLoading = false;
          }
        }
      });
  }
  exportexcel(): void {
    const workbook = new Workbook();

    const current_date = new Date();
    this.currentDate = current_date;
    let new_date = this.datepipe.transform(current_date, 'dd-MM-yyyy');
    console.log(new_date);
    const worksheet = workbook.addWorksheet('Book1');
    const header_cell = worksheet.addRow(['Holding Detection Report']);
    const header_cell2 = worksheet.addRow([this.report_header]);

    worksheet.getCell('A1');
    worksheet.mergeCells('A1:H1');
    worksheet.getCell('A2');
    worksheet.mergeCells('A2:H2');

    header_cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    header_cell.font = {
      bold: true,
    };

    header_cell2.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

    header_cell2.font = {
      bold: true,
    };

    const headerRow = worksheet.addRow([
      'Sr.No',
      'Customer Name',
      'Cylinder Code',
      'QR Code',
      'Nature Of Gas',
      'Cylinder Size',
      'Site Name',
      'Date',
      'DC No',
      'Days',
    ]);

    headerRow.font={
      bold:true,
    }
    this.ncustomerReportsList.forEach((row: any, index: number) => {
      let new_row;
      new_row = worksheet.addRow(Object.values(row));
    });

    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      this.excelName = 'Aging Report' + '_' + this.datepipe.transform(this.currentDate, 'dd-MM-yyyy'); +'.xlsx'
      console.log(this.excelName);


      fs.saveAs(blob, this.excelName);
      this.isDownloading = false;
    });

    // Select the table element
  }


}
