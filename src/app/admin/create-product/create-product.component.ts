import { Component, OnInit } from '@angular/core';

declare var window:any;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{
  formModal:any;


  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    )
  }
  openModal(){
    this.formModal.show();
  }
  doSomething(){
    this.formModal.hide();
  }
}
