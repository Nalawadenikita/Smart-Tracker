import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReusablesModule } from './reusables/reusables.module';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptorInterceptor } from './interceptors/header-interceptor.interceptor';
import { NgSelectModule } from '@ng-select/ng-select';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';

import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UnderConstructionComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FeaturesModule,
    CoreModule,
    CommonModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    MatExpansionModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:3000'
    })
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptorInterceptor, multi: true},
  ],
  exports: [
    CoreModule,
    ReusablesModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
