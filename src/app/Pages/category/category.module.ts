import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatrRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryAddEditComponent,
    
  ],
  imports: [
    CommonModule,
    CatrRoutingModule,
    ReactiveFormsModule
  ]
})
export class categoryModule { }
