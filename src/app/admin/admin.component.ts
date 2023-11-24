import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  readonly _id: string | null = localStorage.getItem('_id');
  readonly token: string | null = localStorage.getItem('token');
  private api = environment.api;
  products: Product[] = [];

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

    this.httpClient.get<Product[]>(this.api + '/product', { headers }).subscribe({
      next: (response) => {
        this.products = response;
        console.log(JSON.stringify(response));
      },
      error: (error) => {
        alert(error.error);
      }
    });
  }
}
