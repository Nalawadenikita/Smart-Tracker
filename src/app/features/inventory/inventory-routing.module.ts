import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CylinderAddComponent } from './cylinder-add/cylinder-add.component';
import { CylinderListComponent } from './cylinder-list/cylinder-list.component';
import {InventoryComponent} from './inventory.component';

const routes: Routes = [
  {
    component:CylinderAddComponent,
    path:'cylinder-add'
  },
  {
    component:CylinderListComponent,
    path:''
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
