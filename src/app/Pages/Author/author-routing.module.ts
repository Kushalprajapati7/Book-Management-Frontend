import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuhtorListComponent } from './auhtor-list/auhtor-list.component';
import { AuthorAddEditComponent } from './author-add-edit/author-add-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'getAllAuthors',
    pathMatch: 'full'
  },
  {
    path: 'getAllAuthors',
    component: AuhtorListComponent
  },
  {
    path: 'editAuthor/:id',
    component: AuthorAddEditComponent
  },
  {
    path: 'add-Author',
    component: AuthorAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
