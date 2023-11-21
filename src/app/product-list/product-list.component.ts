import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Product, ProductApiResponse } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
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

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.initialize();
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
}
