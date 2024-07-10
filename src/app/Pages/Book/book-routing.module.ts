import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookAddComponent } from './book-add/book-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'getAllBooks',
    pathMatch: 'full'
  },
  {
    path: 'getAllBooks',
    component: BookListComponent
  },
  {
    path: 'add-Book',
    component: BookAddComponent
  },
  {
    path: 'editBook/:id',
    component: BookAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
