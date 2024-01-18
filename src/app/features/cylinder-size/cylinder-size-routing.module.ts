import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CylinderSizeComponent } from './cylinder-size.component';
import { CylinderSizeListComponent } from './cylinder-size-list/cylinder-size-list.component';
import { CylinderSizeAddComponent } from './cylinder-size-add/cylinder-size-add.component';

const routes: Routes = [
  {
    path:'',
    component:CylinderSizeListComponent
  },
  {
    path:'cylinder-size-add',
    component:CylinderSizeAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CylinderSizeRoutingModule { }
