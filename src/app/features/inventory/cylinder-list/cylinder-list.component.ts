import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/features/invetory/inventory.service';
import Swal from 'sweetalert2';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Subscription, catchError, of } from 'rxjs';
import { TransactionsService } from 'src/app/services/features/transaction/transactions.service';
import { MatDialog } from '@angular/material/dialog';
import { CylinderHistoryComponent } from '../../reports/cylinder-history/cylinder-history.component';
import * as XLSX from 'xlsx';
import { log } from 'console';
import { Workbook, Worksheet } from 'exceljs';

@Component({
  selector: 'app-cylinder-list',
  templateUrl: './cylinder-list.component.html',
  styleUrls: ['./cylinder-list.component.scss']
})
export class CylinderListComponent implements OnInit {
  inventoryList: any;
  exslAllData: any;
  cylinderData: any[] = [];
  value: any;
  loggedInDistributorId = JSON.parse(atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1]))['DISTRIBUTOR_ID'];
  public subscription: Subscription = new Subscription();
  pageIndex: number = 1;
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean = true;
  fileName: string = 'Inventory.xlsx';

  exslcylinderData: any;
  constructor(private inventoryServices: InventoryService,
    private router: Router,
    private storageService: StorageService,
    private transactionService: TransactionsService,
    private dialogRef: MatDialog,
  ) { }

  CylinderCol = [
    {
      field: 'id',
      header: 'Sr.no',
      dataType: 'string',
    },
    {
      field: 'gasType',
      header: 'Gas Type',
      dataType: 'string',
    },
    {
      field: 'cylinderSize',
      header: 'Cylinder Size',
      dataType: 'string',
    },
    {
      field: 'cylinderCode',
      header: 'Cylinder Code',
      dataType: 'string',
      action: {
        action: 'viewCylinderHistory',
        label: 'viewCylinderHistory',
        callback: (row: any) => {
          this.viewCylinderHistory(row);
        }

      },
    },
    {
      field: 'days',
      header: 'Days',
      dataType: 'string',
    },

    {
      field: 'status',
      header: 'Status',
      dataType: 'boolean',
    },
    {
      field: 'cylinderQrCode',
      header: 'Cylinder QR Code',
      dataType: 'string',
    },
    {
      field: 'name',
      header: 'Name',
      dataType: 'string',
    },
    {
      field: 'locationName',
      header: 'Site Name',
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
          }
        },
        {
          // action: 'delete',
          // label: 'Delete',
          callback: (company: any) => {

            this.deleteRow(company);
          }
        }]
    },
  ]
  ngOnInit(): void {
    this.renderInventory();
    this.exslData();
    this.inventoryServices.rowData = null;
    this.inventoryServices.CylinderHistoryData = [];
  }

  ngOnChange() {
    this.renderInventory();

  }

  serchedValue(event: any) {
    this.pageIndex = 1;
    this.value = event;
    this.renderInventory();
  }

  pageIndexCalculator(eventData: { pageIndex: any }) {
    this.pageIndex = eventData.pageIndex;
    this.renderInventory();
  }

  renderInventory() {
    this.inventoryList = null;
    this.subscription.add(

      this.transactionService.getAvailableCylinders(this.loggedInDistributorId, { page: this.pageIndex, pageSize: 10, search: this.value }).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          console.log(res.data);

          this.inventoryList = res.data;

          this.totalRecords = res.totalRecords;

          console.log(this.totalRecords);

          this.totalPages = res.totalPages;
          this.currentPage = res.currentPage;

          this.cylinderData = this.inventoryList.map((element: any) => {
            let date_str = new Date(element.lastTransactionDate).toLocaleDateString('en-US')
            console.log(this.totalPages);

            return {
              "id": element.id,
              "cylinderCode": element['cylinderCode'], "cylinderSize": element.cylinderSize['cylinderType'],
              "cylinderSizeId": element.cylinderSize['id'],
              "cylinderQrCode":element.cylinderQrCode||'-',
              "gasType": element.gasType['gasName'], "gasTypeId": element.gasType['id'], "filled": element.filled, "status": element.withCustomer ? '2' : element.filled ? '1' : element.withRefiller ? '3' : '0', "owner": element.owner, "rented": element.rented,
              "days": element.days,
              "locationName": element.site_name || '-', 'name': element.name || '-', "lastTransactionDate": date_str
            }
          });
        },
        error: (err) => {
          if (err.status == 404) {
            this.isLoading = false;
          }
        }
      }
      )

    )
  }

  currentDatetime = new Date();
  formattedDate = this.currentDatetime.toISOString().split('T')[0];
  newFileName = `Inventory_${this.formattedDate}.xlsx`;




  exslData() {
    console.log("dj,fsf");
    this.exslAllData = null;
    this.subscription.add(

      this.transactionService.getAvailableCylinders(this.loggedInDistributorId, { page: this.pageIndex, pageSize: 30000, search: this.value }).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          console.log(res.data);
          this.exslAllData = res.data;
          console.log(this.exslAllData);
          this.totalRecords = res.totalRecords;
          this.totalPages = res.totalPages;
          this.currentPage = res.currentPage;
          this.exslcylinderData = this.exslAllData.map((element: any) => {
            let date_str = new Date(element.lastTransactionDate).toLocaleDateString('en-US')
            return {
            
              "id": element.id,
              "cylinderCode": element['cylinderCode'], "cylinderSize": element.cylinderSize['cylinderType'],
              "cylinderSizeId": element.cylinderSize['id'],
              "gasType": element.gasType['gasName'], "gasTypeId": element.gasType['id'], "filled": element.filled, "status": element.withCustomer ? '2' : element.filled ? '1' : element.withRefiller ? '3' : '0', "owner": element.owner, "rented": element.rented,
              "days": element.days,
              "cylinderQrCode":element.cylinderQrCode||'-',
              "locationName": element.site_name || '-', 'name': element.name || '-', "lastTransactionDate": date_str
            }
          });
        },
        error: (err) => {
          if (err.status == 404) {
            this.isLoading = false;
          }
        }
      }
      )

    )



  }



  // export() {
  //   const workbook = new Workbook();
  //   const worksheet: Worksheet = workbook.addWorksheet('Sheet1');

  //   const overallHeader = ['Inventory Report'];

  //   // Add row to the worksheet with the overall header
  //   const headerRow = worksheet.addRow(overallHeader);

  //   // Merge cells and apply style to the header row
  //   worksheet.mergeCells('A1:H1');
  //   headerRow.eachCell((cell) => {
  //     cell.alignment = {
  //       vertical: 'middle',
  //       horizontal: 'center',
  //     };
  //     cell.font = {
  //       bold: true,
  //     };
  //   });

  //   const fieldHeaders = ['GasType', 'Cylinder Size', 'Cylinder Code', 'Name(Customer/Reffiler)', 'Site Name', 'Status'];
  //   const dataAsArray = this.exslAllData.map((item: { name: any; cylinderCode: any; cylinderSize: any; gasType: any; site_name: any; withCustomer?: boolean; filled?: boolean; withRefiller?: boolean; owner?: any; rented?: any }) => [
  //     item.gasType['gasName'],
  //     item.cylinderSize['cylinderType'],
  //     item.cylinderCode,
  //     item.name,
  //     item.site_name,
  //     item.withCustomer ? 'withCustomer' : item.filled ? 'Filled' : item.withRefiller ? 'withRefiller' : 'Empty',
  //   ]);

  //   // Add fieldHeaders as the second row (A2)
  //   worksheet.addRow(fieldHeaders);

  //   // Add data to the worksheet starting from the third row (A3)
  //   dataAsArray.forEach((dataRow: any) => {
  //     worksheet.addRow(dataRow);
  //   });

  //   // Save the workbook to a file
  //   workbook.xlsx.writeBuffer().then((data) => {
  //     const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = this.newFileName;
  //     a.click();
  //     URL.revokeObjectURL(url);
  //   });
  // }


  export() {
    const workbook = new Workbook();
    const worksheet: Worksheet = workbook.addWorksheet('Sheet1');

    const overallHeader = ['Inventory Report'];

    // Add row to the worksheet with the overall header
    const headerRow = worksheet.addRow(overallHeader);

    // Merge cells and apply style to the header row
    worksheet.mergeCells('A1:H1');
    headerRow.eachCell((cell) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      cell.font = {
        bold: true,
        size: 14
      };
    });

    const fieldHeaders = ['Sr.No','GasType', 'Cylinder Size', 'Cylinder Code','Days','Status','Cylinder QR Code' ,'Name(Customer/Reffiler)', 'Site Name', ];

    // Add fieldHeaders as the second row (A2)
    const fieldHeadersRow = worksheet.addRow(fieldHeaders);

    // Make the fieldHeaders row bold
    fieldHeadersRow.eachCell((cell) => {
      // cell.alignment = {
      //   vertical: 'middle',
      //   horizontal: 'center',
      // };
      cell.font = {
        bold: true,
      };
    });

    const dataAsArray = this.exslAllData.map((item: { name: any; cylinderCode: any; cylinderSize: any; days:any,gasType: any; site_name: any; withCustomer?: boolean; filled?: boolean; withRefiller?: boolean; owner?: any; rented?: any ,cylinderQrCode:any},index:any) => [
      index+1,
      item.gasType['gasName'],
      item.cylinderSize['cylinderType'],
      
      item.cylinderCode,
      item.days,
      item.withCustomer ? 'With Customer' : item.filled ? 'Filled' : item.withRefiller ? 'With Refiller' : 'Empty',
      item.cylinderQrCode ||'-' ,
      item.name,
      item.site_name,
    ]);

    // Add data to the worksheet starting from the third row (A3)
    dataAsArray.forEach((dataRow: any) => {
      worksheet.addRow(dataRow);
    });
dataAsArray.font={
 
}
    // Save the workbook to a file
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.newFileName;
      a.click();
      URL.revokeObjectURL(url);
    });
  }




  editRow(data: any) {
    this.router.navigate(['/features/inventory/cylinder-add'], { queryParams: { editing: true } });
    this.inventoryServices.rowData = data;
    console.log(data);
  }

  viewCylinderHistory(row: any) {
    this.subscription.add(

      this.inventoryServices.getCylinderHistory(row.id).subscribe((res: any) => {
        this.inventoryServices.CylinderHistoryData = res.map((item: any) => {
          let new_date = item.CylinderTransactionDate;
          let parts = new_date.split(" ");
          let date_str = parts[0];

          return {
            "transaction_id": item.transactionId, "transaction_type": item.trasactionType,
            'customer_name': item.customerName || item.refillerName,
            'isCustomer': item.customerName ? true : false,
            "cylinderSize": item.cylinderSize.cylinderType, "gasType": item.gasType.gasName, "cylinderCode": item.cylinderCode, "days": item.cylinderSize.days, "dcId": item.dcNumber || '-',
            "ecrId": item.ecNumber || '-', "locationName": item.locationName || '-', "transaction_date": date_str,"qrCode":item.cylinderQrCode
          }
        });
        const addedData = this.dialogRef.open(CylinderHistoryComponent, {
          width: '80%',
          height: '80%'
        });
        this.subscription.add(

          addedData.afterClosed().subscribe((res) => {
            this.renderInventory();
          })
        )
      })
    )
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
      .then((result: any) => {
        if (result.isConfirmed) {
          this.subscription.add(
            this.inventoryServices.deleteInventory(data.id).pipe(catchError(err => of(err))).subscribe((res) => {
              if (res?.error.message) {
                Swal.fire(
                  "Cylinder cannot be deleted!",
                  "Customer or refiller holds this cylinder.",
                  "info"
                );
              } else {
                Swal.fire(
                  "Data has been deleted!",
                  "",
                  "success"
                );
              }
              this.renderInventory();
            })
          )
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
