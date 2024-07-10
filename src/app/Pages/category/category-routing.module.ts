import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryAddEditComponent } from './category-add-edit/category-add-edit.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'getAllCategories',
    pathMatch: 'full'
  },
  {
    path: 'getAllCategories',
    component: CategoryListComponent
  },
  {
    path: 'editCategoty/:id',
    component: CategoryAddEditComponent
  },
  {
    path: 'add-Categoty',
    component: CategoryAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatrRoutingModule { }
