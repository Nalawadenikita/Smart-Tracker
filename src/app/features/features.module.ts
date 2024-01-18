import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from '../core/core.module';
import { FeaturesComponent } from './features.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS,HttpClientModule} from '@angular/common/http';
import {LoaderInterceptor} from './loader.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
   DashboardComponent,
    FeaturesComponent,
    AdminDashboardComponent,
    UploadImageComponent,
    UnauthorizedComponent,
   
  
   
    ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    CoreModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    MatDialogModule
  ],
  providers: [
    {
       provide: HTTP_INTERCEPTORS,
       useClass: LoaderInterceptor,
       multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
 ]
})
export class FeaturesModule { }
