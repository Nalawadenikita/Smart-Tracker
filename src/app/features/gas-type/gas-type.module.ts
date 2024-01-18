import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GasTypeRoutingModule } from './gas-type-routing.module';
import { GasTypeListComponent } from './gas-type-list/gas-type-list.component';
import { ReusablesModule } from 'src/app/reusables/reusables.module';
import { RouterModule } from '@angular/router';
import { GasTypeAddComponent } from './gas-type-add/gas-type-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    GasTypeListComponent,
    GasTypeAddComponent
  ],
  imports: [
    CommonModule,
    GasTypeRoutingModule,
    RouterModule,
    ReusablesModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule
   
  ]
})
export class GasTypeModule { }
