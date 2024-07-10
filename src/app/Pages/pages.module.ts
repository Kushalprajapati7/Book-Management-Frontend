import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true,
      configurationIsolate: true,
      rolesIsolate: true
    })
  ]
})
export class PagesModule { }
