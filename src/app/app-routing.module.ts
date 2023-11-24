import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomePageComponent } from './public/landing/home-page/home-page.component';
import { UserPageComponent } from './users/user-page/user-page.component';


const routes: Routes = [
  {
    path: '', loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'user-page',
    component: UserPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
