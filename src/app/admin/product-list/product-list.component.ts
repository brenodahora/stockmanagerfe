import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Product, ProductApiResponse } from '../../models/product.model';
import { Router } from '@angular/router';

declare var window:any;


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title:string = '';
  description:string = '';
  department:string = '';
  brand:string = '';
  price:number = 0;
  qtd_stock:number = 0;
  bar_codes:string = '';



  formModal:any;
  readonly _id: string | null = localStorage.getItem('_id');
  readonly token: string | null = localStorage.getItem('token');
  private api = environment.api;
  products: Product[] = [];
  productapiresponse: ProductApiResponse = {
    products: [],
    totalDocs: 0,
    limit: 0,
    total: 0,
    page: 0
  };

  constructor(private httpClient: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.initialize();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("modalCreateProduct")
    )
  }

  private initialize(): void {
    this.listAllProducts();
  }

  private listAllProducts(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.httpClient.get<ProductApiResponse>(this.api + '/product', { headers }).subscribe({
        next: (response) => {
          this.productapiresponse = response;
          this.products = response.products;
        },
        error: (error) => {
          alert(error.error);
        }
    });
  }
  openModal(){
    this.formModal.show();
  }
  doSomething(){
    this.formModal.hide();
    this.router.navigate([this.router.url]);
  }
  realizarRefresh() {
    this.router.navigate([this.router.url]);
    this.router.navigateByUrl(this.router.url);
    this.listAllProducts();
  }
  createNewProduct(){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    const data = {
      "title": this.title,
      "description": this.description,
      "department": this.department,
      "brand": this.brand,
      "price": this.price,
      "qtd_stock": this.qtd_stock,
      "bar_codes": this.bar_codes
    };

    this.httpClient.post(this.api + "/product", data, { headers })
    .subscribe({
      next: (response) =>{
        console.log(response);
        this.realizarRefresh()
        alert("Produto cadastrado com sucesso");
      },
      error: (error) => {
        alert("Erro ao cadastrar o produto consulte se os dados estão corretos");
      }

    });

  }
}
