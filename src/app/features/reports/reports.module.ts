import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { DeliveryReportComponent } from './delivery report/delivery-report.component';
import { ReusablesModule } from 'src/app/reusables/reusables.module';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgingReportComponent } from './agingreport/agingreport.component';
import { DatePipe } from '@angular/common';
import { CustomerholdingComponent } from './customerholding/customerholding.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { CylinderHistoryComponent } from './cylinder-history/cylinder-history.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DailySalesReportComponent } from './daily-sales-report/daily-sales-report.component';



@NgModule({
  declarations: [
    DeliveryReportComponent,
    AgingReportComponent,
    CustomerholdingComponent,
    TransactionReportComponent,
    CylinderHistoryComponent,
    DailySalesReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReusablesModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    NgSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatPaginatorModule,
  ],
  exports: [
    MatPaginatorModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class ReportsModule { }
