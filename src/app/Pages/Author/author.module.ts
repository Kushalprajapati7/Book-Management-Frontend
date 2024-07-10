import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorRoutingModule } from './author-routing.module';
import { AuhtorListComponent } from './auhtor-list/auhtor-list.component';
import { AuthorAddEditComponent } from './author-add-edit/author-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuhtorListComponent,
    AuthorAddEditComponent,
    
  ],
  imports: [
    CommonModule,
    AuthorRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthorModule { }
