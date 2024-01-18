import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GasTypeComponent } from './gas-type.component';
import { GasTypeListComponent } from './gas-type-list/gas-type-list.component';
import { GasTypeAddComponent } from './gas-type-add/gas-type-add.component';

const routes: Routes = [
  {
    path:'',
    component:GasTypeListComponent
  },
  {
    path:'gas-type-add',
    component:GasTypeAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasTypeRoutingModule { }
