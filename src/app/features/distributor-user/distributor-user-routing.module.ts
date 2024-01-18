import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrubutorUserListComponent } from './distributor-user-list/distrubutor-user-list.component'; 
import { DistributorUserComponent } from './distributor-user.component';
import { DistributorAddEditComponent } from './distributor-user-add-edit/distrubutor-user-add-edit.component';

const routes: Routes = [
  {
    component: DistrubutorUserListComponent,
    path: ''
  },
  {
    component: DistributorAddEditComponent,
    path: 'add-edit'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorUserRoutingModule { }
