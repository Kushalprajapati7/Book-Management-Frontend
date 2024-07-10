import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';

const routes: Routes = [
  {
    path:'auth',
    // component:LoginComponent,
    loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule),
    // canActivate: []
  },
  {
    path:'home',
    component:NavbarComponent,
    loadChildren:()=>import('./Pages/pages.module').then(m=>m.PagesModule),
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
