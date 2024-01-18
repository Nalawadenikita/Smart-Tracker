import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarComponent } from './sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';


@NgModule({
  declarations: [
   
    SidebarComponent,
    MainContentComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule
  ],
  exports: [
    
    SidebarComponent,
    MainContentComponent
  ]
})

export class CoreModule { }
