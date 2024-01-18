import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionAddComponent } from './transaction-add/transaction-add.component';
import { TransactionReportComponent } from '../reports/transaction-report/transaction-report.component';

const routes: Routes = [
  
  {
    path:"",
    component:TransactionListComponent
  },
  {
    path:"add-transaction",
    component:TransactionAddComponent
  },
  {
    path:"transaction-report",
    component:TransactionReportComponent
  },
 
  {
    path:'demotransaction',
    component:TransactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
