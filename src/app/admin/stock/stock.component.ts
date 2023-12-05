import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Product, ProductApiResponse } from '../../models/product.model';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit {
  //Abaixo estão as variaveis que serão utilizadas globalmente neste código

  selectedFile: File | null = null;
  csvContent:string = '';

  columns: string[] = [];

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
  formModalUpdateProduct: any;


  readonly _id: string | null = localStorage.getItem('_id');
  readonly token: string | null = localStorage.getItem('token');
  private api = environment.api;
  products: Product[] = [];

  // Modelando Resposta de varios documentos vindo do mongoDB
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
    //As variaveis formModal abaixo vão ser utilizadas para exibir os modais
    this.formModalProductCreate = new window.bootstrap.Modal(
      document.getElementById("modalCreateProduct")
    )
    this.formModalDeleteProduct = new window.bootstrap.Modal(
      document.getElementById("modalDeleteProduct")
    )
    this.formModalCreateProductByCSV = new window.bootstrap.Modal(
      document.getElementById("modalCreateByCSV")
    )
    this.formModalUpdateProduct = new window.bootstrap.Modal(
      document.getElementById("modalUpdateProduct")
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
  //Usado para abrir o Modal de Criação de produto
  openModalCreateProduct() {
    this.formModalProductCreate.show();
  }
  //Usado para abrir o Modal de Criação de produto por CSV
  openModalCreateProductByCSV() {
    this.formModalCreateProductByCSV.show();
  }
  //Usado para abrir o Modal de Atualização de produto e pré-preencher os campos
  openModalUpdateProduct(idEscolhido: String) {
    if (idEscolhido != null) {
      this.idSelecionado = idEscolhido;
    }
    //Autorizando Requisição
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
    //Buscando produto por ID
    this.httpClient.get<Product>(this.api + `/product/${this.idSelecionado}`, { headers }).subscribe({
      next: (response) => {
        const data = response;
        this.title = data.title;
        this.description = data.description;
        this.department = data.department;
        this.brand = data.brand;
        this.price = data.price;
        this.qtd_stock = data.qtd_stock;
        this.bar_codes = data.bar_codes;
      },
      error: (error) => {
        alert(error.error);
      }
    });

    this.formModalUpdateProduct.show();
  }
  //Usado para abrir o modal para deletar produto, já capturando o Id e titulo.
  openmodalDeleteProduct(idEscolhido?: String, titleEscolhido?: String) {
    this.formModalDeleteProduct.show();
    if (idEscolhido != null && titleEscolhido != null) {
      this.idSelecionado = idEscolhido;
      this.titleSelecionado = titleEscolhido;
    }

  }

  //Atualizar página e listagem de produtos
  realizarRefresh() {
    this.router.navigate([this.router.url]);
    this.router.navigateByUrl(this.router.url);
    this.listAllProducts();
  }

  //Metodo para criar novo produto consumindo a API
  createNewProduct() {
    //Autorizando Requisição
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    //Criando objeto em formato JSON para enviar para API
    const data = {
      "title": this.title,
      "description": this.description,
      "department": this.department,
      "brand": this.brand,
      "price": this.price,
      "qtd_stock": this.qtd_stock,
      "bar_codes": this.bar_codes
    };

    //Realizando a Requisição e tratando exceções
    this.httpClient.post(this.api + "/product", data, { headers })
      .subscribe({
        next: (response) => {
          console.log(response);
          alert("Produto cadastrado com sucesso");
        },
        error: (error) => {
          alert("Erro ao cadastrar o produto consulte se os dados estão corretos");
        }
      });
  }
  //Metodo para atualizar produto
  updateProduct() {
    //Autorizando Requisição
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    //Objeto que vai moldar os dados para envio
    const data = {
      "title": this.title,
      "description": this.description,
      "department": this.department,
      "brand": this.brand,
      "price": this.price,
      "qtd_stock": this.qtd_stock,
      "bar_codes": this.bar_codes
    };
    //Variavel para verificar se os campos estão vazios
    const allFieldsEmpty = Object.values(data).every(value => value === '' || value === null || value === undefined);

    //Realizando laço condicional para só realizar a requisição se todos os campos estiverem preenchidos
    if (allFieldsEmpty) {
      alert('Erro: Todos os campos estão vazios.');
    } else {
       //Usando a rota da API para realizar o update no banco de dados
      this.httpClient.patch(this.api + `/product/${this.idSelecionado}`, data,{ headers })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.realizarRefresh()
          alert("Produto Atualizado com sucesso");
        },
        error: (error) => {
          alert("Erro ao atualizar o produto consulte se os dados estão corretos");
        }
      });
    }
  }

  // Onde vai acontecer o processamento do CSV e criação do produto
  // O processamento do CSV agora vai ser feito no front-end
  processCSV(){
    //Autenticação da requisição
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    //Divisão de linhas
    const rows: string[] = this.csvContent.split('\n');

    rows.forEach(row => {
      //Divisão por virgulas
      this.columns = row.split(',');
    });

    //Salvando as informações do CSV no objeto
    const data = {
      "title": this.columns[0],
      "description": this.columns[1],
      "department": this.columns[2],
      "brand": this.columns[3],
      "price": Number(this.columns[4]),
      "qtd_stock": Number(this.columns[5]),
      "bar_codes": this.columns[6]
    };

    //Passando as informações do CSV para a API fazer a criação
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

  //Metodo onde o Front-end vai enviar o arquivo
  onFileSelected(event: any) {
    //Capturando o arquivo enviado pelo usuario
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    //Lendo o arquivo e preparando ele para ser usado depois
    reader.onload = (e: any) => {
      this.csvContent = e.target.result;

    };
    reader.readAsText(file);
  }

  //Apos o usuario apertar no botão de confirmação vai enviar a deleção para a API
  confirmacaoDeleteButton(idEscolhido?: String) {
    //Autenticação da requisição
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    //Requisição de Delete usando rota dada pela API
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

  //Metodo que vai abrir o modal e realizará a deleção apenas quando o usuario clicar no botão
  deleteProduct(idEscolhido?: String) {
    console.log(idEscolhido);
    this.confirmacaoDeleteButton(idEscolhido);
  }
}
