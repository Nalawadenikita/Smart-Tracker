import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './services/guards/auth-guard.guard';
import { DeactivateLoginGuard } from './services/guards/deactivate-login.guard';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
const routes: Routes = [
 
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule),
    canActivate: [DeactivateLoginGuard]
  },
  {
    path: 'features',
    loadChildren: () => import('./features/features.module').then((module) => module.FeaturesModule),
    canActivate: [AuthGuardGuard]
  },
  { path: 'under-construction', component: UnderConstructionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
