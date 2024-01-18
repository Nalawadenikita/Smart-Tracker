import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { DeliveryReportComponent } from './delivery report/delivery-report.component';
import { AgingReportComponent } from './agingreport/agingreport.component';
import { CustomerholdingComponent } from './customerholding/customerholding.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { CylinderHistoryComponent } from './cylinder-history/cylinder-history.component';
import {DailySalesReportComponent} from './daily-sales-report/daily-sales-report.component';

const routes: Routes = [
  {
    component: ReportsComponent,
    path: ''
  },
  {
    component: DeliveryReportComponent,
    path: 'delivery-report' 
  },
  {
    component:AgingReportComponent,
    path:'aging-report'

  },
  {
    component:CustomerholdingComponent,
    path:'customer-holding'
  },
  {
    component:TransactionReportComponent,
    path:'transaction-report'
  },
  {
    component: CylinderHistoryComponent,
    path: 'cylinder-history-report'
  },
  {
    component:DailySalesReportComponent,
    path:'daily-sales'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
