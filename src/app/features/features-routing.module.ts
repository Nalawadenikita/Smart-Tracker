import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../services/guards/auth-guard.guard';
import { FeaturesComponent } from './features.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LOCALSTORAGE_VALUES } from '../utils/app-constants';
import { RouteGuardGuard } from '../services/guards/route-guard.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {
    component: FeaturesComponent,
    path: '',
    children: [
      {
        loadChildren: () => import('./dashboard/dashboard.module').then((module) => module.DashboardModule),
        path: 'dashboard',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.ADMIN, LOCALSTORAGE_VALUES.DISTRIBUTOR, LOCALSTORAGE_VALUES.DISTRIBUTOR_USER] }
      },
      // {
      //   loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then((module) => module.AdminDashboardModule),
      //   path: 'admin-dashboard',
      //   canActivate: [AuthGuardGuard]
      // },
      {
        loadChildren: () => import('./distributors/distributors.module').then((module) => module.DistributorsModule),
        path: 'distributors',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.ADMIN] }
      },
      {
        loadChildren: () => import('./inventory/inventory.module').then((module) => module.InventoryModule),
        path: 'inventory',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.DISTRIBUTOR,LOCALSTORAGE_VALUES.DISTRIBUTOR_USER] }
      },
      {
        loadChildren: () => import('./refillers/refillers.module').then((module) => module.RefillersModule),
        path: 'refillers',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.DISTRIBUTOR] }
      },
      {
        loadChildren: () => import('./customers/customers.module').then((module) => module.CustomersModule),
        path: 'customers',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.DISTRIBUTOR,LOCALSTORAGE_VALUES.DISTRIBUTOR_USER] }
      },
      {
        loadChildren: () => import('./distributor-user/distributor-user.module').then((module) => module.DistributorUserModule),
        path: 'distributor-user',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.DISTRIBUTOR] }
      },

      {
        loadChildren: () => import('./cylinder-size/cylinder-size.module').then((module) => module.CylinderSizeModule),
        path: 'cylinder-size',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.ADMIN] }
      },
      {
        loadChildren: () => import('./gas-type/gas-type.module').then((module) => module.GasTypeModule),
        path: 'gas-type',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.ADMIN] }
      },
      {
        loadChildren: () => import('./transactions/transactions.module').then((module) => module.TransactionsModule),
        path: 'transactions',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.DISTRIBUTOR, LOCALSTORAGE_VALUES.DISTRIBUTOR_USER] }

      },
      {
        loadChildren: () => import('./reports/reports.module').then((module) => module.ReportsModule),
        path: 'reports',
        canActivate: [AuthGuardGuard, RouteGuardGuard],
        data: { requiredRole: [LOCALSTORAGE_VALUES.DISTRIBUTOR,LOCALSTORAGE_VALUES.DISTRIBUTOR_USER ] }
      },

    ]
  },
  {
    component: UnauthorizedComponent,
    path: 'unauthorized'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
