import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefillersRoutingModule } from './refillers-routing.module';
import { RefillerListComponent } from './refiller-list.component';
import { RefillerAddComponent } from './refiller-add/refiller-add.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReusablesModule } from 'src/app/reusables/reusables.module';


@NgModule({
  declarations: [
    RefillerListComponent,
    RefillerAddComponent
  ],
  imports: [
    CommonModule,
    RefillersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ReusablesModule,
    RouterModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class RefillersModule { }
