import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { ReportService } from 'src/app/services/features/report/report.service';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-daily-sales-report',
  templateUrl: './daily-sales-report.component.html',
  styleUrls: ['./daily-sales-report.component.scss'],
})
export class DailySalesReportComponent implements OnInit {
  distributorId: any;
  finalDate: any;
  reportsData: any = [];
  tableData: any = {};
  endData: any = [];
  isLoading: boolean = true;

  constructor(
    private storageService: StorageService,
    private reportservice: ReportService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.distributorId = JSON.parse(
      atob(
        this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1]
      )
    )['DISTRIBUTOR_ID'];
    var todaysDate = new Date();
    this.finalDate = this.convertDate(todaysDate);
    this.getData();
  }

  convertDate(date:any) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();

    var mmChars = mm.split('');
    var ddChars = dd.split('');

    return (
      yyyy +
      '/' +
      (mmChars[1] ? mm : '0' + mmChars[0]) +
      '/' +
      (ddChars[1] ? dd : '0' + ddChars[0])
    );
  }

  getData() {
    console.log( this.finalDate);
    this.reportservice
      .getDailySalesReport(
        this.distributorId,
        { page: 1, pageSize: 1000 },
        this.finalDate
      )
      .subscribe({
        next: (res) => {
          this.reportsData = res.data;
          this.isLoading = false;
          this.reportsData.forEach((record: any) => {
            if (!this.tableData[record.customerId.name]) {
              this.tableData[record.customerId.name] = {
                data: [
                  {
                    customer_name: record.customerId.name,
                    t_code: record.dcrId,
                    GasType: record.gasType.gasName,
                    cylinderSize: record.cylinderSize.cylinderType,
                    cylinderCode: record.cylinderCode,
                    location: record.locationName,
                    count: record.cylinderCount,
                  },
                ],
                total: record.cylinderCount,
              };
            } else {
              this.tableData[record.customerId.name].data.push({
                customer_name: record.customerId.name,
                t_code: record.dcrId,
                GasType: record.gasType.gasName,
                cylinderSize: record.cylinderSize.cylinderType,
                cylinderCode: record.cylinderCode,
                location: record.locationName,
                count: record.cylinderCount,
              });
              this.tableData[record.customerId.name].total +=
                record.cylinderCount;
            }
          });
          Object.keys(this.tableData).forEach((key) => {
            this.tableData[key].data.forEach((record: any) => {
              this.endData.push(record);
            });
            this.endData.push({
              total: this.tableData[key].total,
            });
          });
          console.log(this.endData);
        },
        error: (err) => {
          if ((err.status = 404)) {
            this.isLoading = false;
          }
        },
      });
  }

  getImage() {
    let v: any;
    let s: any;
    let img_constant = 'data:image/png;base64,';

    this.reportservice.getImageBydistributor(this.distributorId).subscribe({
      next: (res) => {
        v = res.image;
        if (v) {
          s = img_constant + v;
          console.log(s);
          this.downloadPDF(s);
        }
      },
      error: (err) => {
        if ((err.status = 404)) {
          this.downloadPDF();
        }
      },
    });
  }

  downloadPDF(source?: any) {
    var doc = new jsPDF('landscape');
    const img = new Image();
    if (source) {
      img.src = source;
      const imgWidth = 20;
      const imgHeight = 10;
      const imgX = 10; // Center the image horizontally
      const imgY = 5;

      doc.addImage(img, imgX, imgY, imgWidth, imgHeight);
    }

    doc.setFontSize(16);
    doc.text('Daily Sales Report', 110, 10);

    const currentDate = new Date();
    let formattedDate: any = this.formatDate(currentDate);

    // Add report generation date
    doc.setFontSize(10);
    doc.text(formattedDate, doc.internal.pageSize.getWidth() - 10, 10, {
      align: 'right',
    });

    const verticalSpace = 25; // Adjust the value to increase or decrease the space
    doc.text('', 10, verticalSpace);

    const header = [
      [
        'Customer Name',
        'Location',
        'Gas Type',
        'Cylinder Size',
        'Cylinder Code',
        'DCID',
      ],
    ];
    const rows = [];

    // Populate rows with endData
    for (const record of this.endData) {
      if (record.total) {
        const totalHolding = [
          `Total holding of ${this.endData[rows.length - 1].customer_name} is ${
            record.total
          }`,
        ];
        const newRow: any = [{ content: totalHolding, colSpan: 7 }];
        rows.push(newRow);
      } else {
        rows.push([
          record.customer_name,
          record.location,
          record.GasType,
          record.cylinderSize,
          record.cylinderCode,
          record.t_code,
        ]);
      }
    }

    const startY = verticalSpace + 10; // Adjust the value to change the starting y-coordinate of the table
    autoTable(doc, {
      head: header,
      body: rows,
      startY: startY,
      theme: 'grid',
      headStyles: { fillColor: [0, 128, 0] },
    });
    doc.save('Daily Sales Reports');
  }


  formatDate(date:any) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
