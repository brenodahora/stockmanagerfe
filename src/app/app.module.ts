import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { HomePageComponent } from './public/landing/home-page/home-page.component';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { UserPageComponent } from './users/user-page/user-page.component';
import { UsersListComponent } from './users/users-list/users-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ProductListComponent,
    HomePageComponent,
    CreateProductComponent,
    UserPageComponent,
    UsersListComponent,


  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

