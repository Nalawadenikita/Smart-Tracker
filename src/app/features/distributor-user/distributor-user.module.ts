import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributorUserRoutingModule } from './distributor-user-routing.module';
import { DistrubutorUserListComponent } from './distributor-user-list/distrubutor-user-list.component';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistributorAddEditComponent } from './distributor-user-add-edit/distrubutor-user-add-edit.component';
import { ReusablesModule } from 'src/app/reusables/reusables.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    DistrubutorUserListComponent,
    DistributorAddEditComponent
  ],
  imports: [
    CommonModule,
    DistributorUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  
    CommonModule,
    ReusablesModule,
    MatProgressSpinnerModule,
    MatInputModule,
   
  ]
})
export class DistributorUserModule { }
