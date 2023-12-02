import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Product, ProductApiResponse } from '../../models/product.model';
import { Router } from '@angular/router';

declare var window: any;
idSelecionado: String;
titleSelelcionado: String;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  selectedFile: File | null = null;

  title: string = '';
  description: string = '';
  department: string = '';
  brand: string = '';
  price: number = 0;
  qtd_stock: number = 0;
  bar_codes: string = '';

  idSelecionado: String = '';
  titleSelecionado: String = '';

  formModalProductCreate: any;
  formModalDeleteProduct: any;
  formModalCreateProductByCSV: any;

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

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.initialize();
    this.formModalProductCreate = new window.bootstrap.Modal(
      document.getElementById("modalCreateProduct")
    )
    this.formModalDeleteProduct = new window.bootstrap.Modal(
      document.getElementById("modalDeleteProduct")
    )
    this.formModalCreateProductByCSV = new window.bootstrap.Modal(
      document.getElementById("modalCreateByCSV")
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
        console.log(response);
        this.products = response.products;
      },
      error: (error) => {
        alert(error.error);
      }
    });
  }
  openModalCreateProduct() {
    this.formModalProductCreate.show();
  }
  openModalCreateProductByCSV() {
    this.formModalCreateProductByCSV.show();
  }

  openmodalDeleteProduct(idEscolhido?: String, titleEscolhido?: String) {
    this.formModalDeleteProduct.show();
    if (idEscolhido != null && titleEscolhido != null) {
      this.idSelecionado = idEscolhido;
      this.titleSelecionado = titleEscolhido;
    }

  }

  realizarRefresh() {
    this.router.navigate([this.router.url]);
    this.router.navigateByUrl(this.router.url);
    this.listAllProducts();
  }

  createNewProduct() {
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
        next: (response) => {
          console.log(response);
          this.realizarRefresh()
          alert("Produto cadastrado com sucesso");
        },
        error: (error) => {
          alert("Erro ao cadastrar o produto consulte se os dados estão corretos");
        }
      });
  }

  uploadFile() {
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${this.token}`,
    //   'Content-Type': 'application/json',
    // });

    // if (this.selectedFile) {
    //   const formData: FormData = new FormData();
    //   formData.append('file', this.selectedFile, this.selectedFile.name);

    //   this.httpClient.post(this.api+'/product/csv', formData, {headers})
    //     .subscribe({
    //       next: (response) => {
    //         console.log('Arquivo enviado com sucesso!', response);
    //       },
    //       error: (error) => {
    //         console.error('Erro ao enviar o arquivo:', error);
    //       }
    // });
    // } else {
    //   console.warn('Nenhum arquivo selecionado.');
    // }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  confirmacaoDeleteButton(idEscolhido?: String) {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.httpClient.delete(this.api + `/product/${idEscolhido}`, { headers })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.realizarRefresh();
          alert("Produto Apagado com Sucesso");
        },
        error: () => {
          alert("Erro ao deletar consulte o console");
        }
      });
  }

  deleteProduct(idEscolhido?: String) {
    console.log(idEscolhido);
    this.openmodalDeleteProduct();
    this.confirmacaoDeleteButton(idEscolhido);
  }

}
