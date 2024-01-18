import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefillerListComponent } from './refiller-list.component';
import { RefillerAddComponent } from './refiller-add/refiller-add.component';

const routes: Routes = [
  {
    component: RefillerListComponent,
    path: ''
  },
  {
    component: RefillerAddComponent,
    path: 'refillers-add'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefillersRoutingModule { }
