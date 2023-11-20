import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BrowserModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }