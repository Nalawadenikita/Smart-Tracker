import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributorAddEditComponent } from './distributor-add-edit/distributor-add-edit.component';
import { DistributorsListComponent } from './distributors-list/distributors-list.component';
import { DistributorsComponent } from './distributors.component';

const routes: Routes = [
  {
    component: DistributorsListComponent,
    path: ''
  },
  {
    component: DistributorAddEditComponent,
    path: 'distributors-add-edit'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorsRoutingModule { }
