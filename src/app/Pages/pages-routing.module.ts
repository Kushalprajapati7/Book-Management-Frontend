import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'books',
    loadChildren:()=>import('./Book/book.module').then(m=>m.BookModule)
  },
  {
    path: 'authors',
    loadChildren:()=>import('./Author/author.module').then(m=>m.AuthorModule)
  },
  {
    path:'categories',
    loadChildren:()=>import('./category/category.module').then(m=>m.categoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
