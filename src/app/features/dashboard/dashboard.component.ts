import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js';
import { ChangeDetectionStrategy } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';

import { InventoryService } from 'src/app/services/features/invetory/inventory.service';
import { DistributorService } from 'src/app/services/features/distributor/distributor.service';
import { TransactionsService } from 'src/app/services/features/transaction/transactions.service';
import { CustomersService } from 'src/app/services/features/customers/customers.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DistributorUserService } from 'src/app/services/features/distributorUser/distributor-user.service';
import { RefillersService } from 'src/app/services/features/refillers/refillers.service';
import { log } from 'console';



Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  public subscription: Subscription = new Subscription();

  public labels1: any;
  gasNameList: any = [];
  cylinderCountList: any = [];
  cylinderSizeList: any = [];
  cylinderSizeCountList: any = [];
  bargraph_colorsList: any = [];
  colorsList: any = [];
  login: any;
  distributorName: any;
  barCharAvailable = '';
  listOfStrings: any;
  customerCount$ = new BehaviorSubject<number>(0);
  inventoryCount$ = new BehaviorSubject<number>(0);
  withRefillerCount$ = new BehaviorSubject<number>(0);
  filledInventory$ = new BehaviorSubject<number>(0);
  emptyInventory$ = new BehaviorSubject<number>(0);
  emptyCylinders = [];
  emptyCylindersCount = 0;
  filledCylindersCount = 0;
  distributorId: any;
  isDistributor = false;
  constructor(private inventoryServices: InventoryService,
    private distributorService: DistributorService,
    private storageService: StorageService,
    private changeDetectorRef: ChangeDetectorRef,
    private customerServices: CustomersService,
    private transactionService: TransactionsService,
    private distributorUserService: DistributorUserService,
    private refillerServices: RefillersService) { }


  toCamelCase(str: string) {
    return str.replace(/[-_]\w/g, match => match.charAt(1).toUpperCase());
  }

  // Example usage:

  // Output: someDistributorName

  ngOnInit() {
    this.distributorId = JSON.parse(atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1]))['DISTRIBUTOR_ID'];

    this.welcomeText();

    this.subscription.add(
      this.inventoryServices.countGasType(this.distributorId).subscribe(res => {
        if (res) {
          res.map((item: any) => {
            if (item.cylinderCount > 0) {
              this.gasNameList.push(item.gasType.gasName);
              console.log(item.gasType.gasName.toLowerCase());
              if (item.gasType.gasName.toLowerCase() == 'oxygen') {
                this.bargraph_colorsList.push('#D3D3D3');
              }
              else if (item.gasType.gasName.toLowerCase() == 'nitrogen') {
                this.bargraph_colorsList.push('#000');
              }
              else if (item.gasType.gasName.toLowerCase() == 'hydrogen') {
                this.bargraph_colorsList.push('#FF0000');
              }
              else if (item.gasType.gasName.toLowerCase() == 'helium') {
                this.bargraph_colorsList.push('#964B00');
              }
              else if (item.gasType.gasName.toLowerCase() == 'chlorine') {
                this.bargraph_colorsList.push('#FFFF00');
              }
              else if (item.gasType.gasName.toLowerCase() == 'carbon dioxide') {
                this.bargraph_colorsList.push('#C0C0C0');
              }
              else if (item.gasType.gasName.toLowerCase() == 'ammonia') {
                this.bargraph_colorsList.push('#FF000');
              }
              else if (item.gasType.gasName.toLowerCase() == 'argon') {
                this.bargraph_colorsList.push('#004958');
              }
              else {
                this.bargraph_colorsList.push(this.randomHexCode());
              }
              this.cylinderCountList.push(item.cylinderCount);
            }
          })
          this.barChart();
          console.log(this.cylinderCountList);
          console.log(this.bargraph_colorsList);

        }
      })
    )


    this.subscription.add(
      this.inventoryServices.countCylinderSize(this.distributorId).subscribe(res => {
        if (res) {
          res.map((item: any) => {
            if (item.cylinderCount > 0) {
              this.cylinderSizeList.push(item.cylinderSize.cylinderType);
              if (item.cylinderSize.cylinderType.toLowerCase() == 'small') {
                this.colorsList.push('#D3D3D3')
              }
              else if (item.cylinderSize.cylinderType.toLowerCase() == 'medium') {
                this.colorsList.push('#00FF00')
              }
              else if (item.cylinderSize.cylinderType.toLowerCase() == 'large') {
                this.colorsList.push('#FF0000')
              }
              else if (item.cylinderSize.cylinderType.toLowerCase() == 'jumbo') {
                this.colorsList.push('#F08080')
              }
              else if (item.cylinderSize.cylinderType.toLowerCase() == 'mega') {
                this.colorsList.push('#FFD700')
              }
              else {
                this.colorsList.push(this.randomHexCode());
              }
              this.cylinderSizeCountList.push(item.cylinderCount);
            }
          });

          this.pieChart();
        } else {

        }
      })
    );

  }
  randomHexCode() {
    // Generate a random 24-bit hexadecimal color code
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    // Ensure the color code is always 6 digits by adding leading zeros if necessary
    return '#' + '0'.repeat(6 - randomColor.length) + randomColor;
  }



  ngAfterViewInit(): void {
    this.renderCustomer();
    this.renderInventory();
    this.renderFilledCylinder();
    this.renderEmptyCylinder();
  }

  welcomeText() {
    this.login = JSON.parse(this.storageService.get(LOCALSTORAGE_KEYS.TOKEN_OBJECT));
    if (this.login['sub'] == 'admin') {
      this.distributorName = 'Admin'
      this.changeDetectorRef.detectChanges();
    }
    else if (this.login['USER_TYPE'] === 'ROLE_DISTRIBUTOR_USER') {
      this.distributorUserService.getDistributorUserById(this.login['ID']).subscribe((res: any) => {
        this.distributorName = this.toCamelCase(res['name']);
      })
    }
    else {
      this.subscription.add(
        this.distributorService.getDistributorById(this.distributorId).subscribe(res => {
          this.distributorName = res.name;
          this.changeDetectorRef.detectChanges();
        })
      );
    }
  }

  randomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }
  public chartTitle: string = 'GAS TYPE';
  barChart() {
    new Chart('barChart', {
      type: "bar",

      data: {
        labels: this.gasNameList,
        datasets: [
          {

            data: this.cylinderCountList,
            borderWidth: 1,
            backgroundColor: this.bargraph_colorsList
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {

            display: false,

          },
          title: {
            align: 'center',
            display: true

          }

        },

        scales: {
          y: {
            ticks: {
              stepSize: 50,
            }
          }
        }

      },

    });
  }
  public barChartTitle: string = 'CYLINDER SIZE';
  pieChart() {
    new Chart('pieChart1', {
      type: 'doughnut',
      data: {
        labels: this.cylinderSizeList,
        datasets: [{
          label: 'count',
          data: this.cylinderSizeCountList,
          borderWidth: 1,
          backgroundColor: this.colorsList

        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            position: 'left'
          },
          title: {
            align: 'center',
            display: true
          }

        },
      }

    });
  }

  renderCustomer() {
    if (this.distributorId) {
      this.isDistributor = true;
      this.subscription.add(
        this.customerServices.customerCount(this.distributorId).subscribe((res: any) => {
          if (res) {
            this.customerCount$.next(res);
          }
        })
      );
    }
    else {
      this.subscription.add(
        this.customerServices.customerAvailable().subscribe((data: any) => {
          this.customerCount$.next(data)
        })
      );

    }
  }
  renderInventory() {

    if (this.distributorId) {
      this.isDistributor = true;
      this.subscription.add(
        // this.transactionService.availableCylinderByDistributer(this.distributorId).subscribe((result: any) => {
        this.refillerServices.withRefiller(this.distributorId).subscribe((result: any) => {
          this.withRefillerCount$.next(result);
        })
      );

    }
    else {
      this.subscription.add(
        this.transactionService.availableCylinder().subscribe((result: any) => {
          this.withRefillerCount$.next(result);
        })
      );
    }
  }
  renderFilledCylinder() {
    if (this.distributorId) {
      this.subscription.add(
        this.transactionService.filled_cylinder_in_godown(this.distributorId).subscribe((data: any) => {
          this.filledInventory$.next(data);
        })
      );
    }
    else {
      this.subscription.add(
        this.transactionService.filledCylinder().subscribe((res: any) => {
          this.filledInventory$.next(res);
        })
      );
    }
  }

  renderEmptyCylinder() {
    if (this.distributorId) {
      this.subscription.add(
        this.transactionService.empty_Cylinder_ByDistributor(this.distributorId).subscribe((data: any) => {
          this.emptyInventory$.next(data);
        })
      );
    }
    else {
      this.subscription.add(
        this.transactionService.emptyCylinder().subscribe((res: any) => {
          this.emptyInventory$.next(res);
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


