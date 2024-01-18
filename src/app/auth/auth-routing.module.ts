import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DistributorLoginComponent } from './distributor-login/distributor-login.component';
import { DeactivateLoginGuard } from '../services/guards/deactivate-login.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path: ''
  },
  {
    component: LoginComponent,
    path: 'auth/login',
    canActivate: [DeactivateLoginGuard]
  },
  {
    component: DistributorLoginComponent,
    path: 'auth/distributorlogin',
    canActivate: [DeactivateLoginGuard]
  },
  {
    component: ForgotPasswordComponent,
    path: 'auth/forgetPassword'
  },
  {
    component: ResetPasswordComponent,
    path: 'auth/resetPassword'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
