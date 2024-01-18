import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributorsRoutingModule } from './distributors-routing.module';
import { DistributorsListComponent } from './distributors-list/distributors-list.component';
import { DistributorAddEditComponent } from './distributor-add-edit/distributor-add-edit.component';
import { ReusablesModule } from 'src/app/reusables/reusables.module';
// import { FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    DistributorsListComponent,
    DistributorAddEditComponent,
  ],
  imports: [
    CommonModule,
    DistributorsRoutingModule,
    ReusablesModule,
    FormsModule,
    ReactiveFormsModule,
    // FormGroup,
    CommonModule,
    MatSelectModule,
    MatDividerModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ]
})
export class DistributorsModule { }
