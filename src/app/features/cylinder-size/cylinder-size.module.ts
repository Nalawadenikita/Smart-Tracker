import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CylinderSizeRoutingModule } from './cylinder-size-routing.module';
import { CylinderSizeListComponent } from './cylinder-size-list/cylinder-size-list.component';
import { CylinderSizeAddComponent } from './cylinder-size-add/cylinder-size-add.component';
import { ReusablesModule } from 'src/app/reusables/reusables.module';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CylinderSizeListComponent,
    CylinderSizeAddComponent
  ],
  imports: [
    CommonModule,
    CylinderSizeRoutingModule,
    ReusablesModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
   
  ]
})
export class CylinderSizeModule { }
