import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/services/guards/auth-guard.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: '',
    children: [
      {
        component: DashboardComponent,
        path: '/features/dashboard',
      },
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
