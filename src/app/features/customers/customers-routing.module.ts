import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersAddComponent } from './customers-add/customers-add.component';

const routes: Routes = [

  {
    component: CustomersListComponent,
    path: ''
  },
  {
    component: CustomersAddComponent,
    path: 'customers-add'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
