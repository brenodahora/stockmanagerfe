import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User, UserApiResponse } from '../../models/user.models';
import { Router } from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  name: string = '';
  email: string = '';

  formModalUserDelete:any;
  formModalUserUpdate: any;

  selectId: String = '';
  selectName: String = '';

  readonly _id: string | null = localStorage.getItem('_id');
  readonly token: string | null = localStorage.getItem('token');
  private api = environment.api;

  users: any

  userApiResponse: UserApiResponse = {
    user: []
  }

  constructor(private httpClient: HttpClient, private router: Router){ }

  private initialize(): void {
    this.listAllUsers();
  }

  ngOnInit(): void {
    this.initialize();
    this.formModalUserDelete = new window.bootstrap.Modal(document.getElementById("modalUserDelete"))
    //this.formModalUserUpdate = new window.bootstrap.Modal(document.getElementById("modalUpdateProduct"))
  }

  private listAllUsers(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });


    this.httpClient.get<UserApiResponse>(this.api + '/user', { headers }).subscribe({
      next: (response) => {
        this.userApiResponse = response
        this.users = response;
        //console.log(this.users[0]._id);
      },
      error: (error) => {
        alert(error.error);
      }
    });
  }

  openModalUserDelete(idEscolhido?: String, nomeEscolhido?: String) {
    this.formModalUserDelete.show();
    if (idEscolhido != null && nomeEscolhido != null) {
      this.selectId = idEscolhido;
      this.selectName = nomeEscolhido;
    }
  }

  deleteButtonConfirmation(selectId?: String) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.httpClient.delete(this.api + `/user/${selectId}`, { headers }).subscribe({
        next: (response) => {
          console.log(response);
          this.realizarRefresh();
          alert("Produto Apagado com Sucesso");
        },
        error: () => {
          alert("Erro ao deleta, consulte o console");
        }
      });
  }

  deleteUser(selectId?: String) {
    console.log(selectId);
    this.deleteButtonConfirmation(selectId);
  }

  /*openModalUpdateProduct(idEscolhido: String) {
    if (idEscolhido != null) {
      this.selectId = idEscolhido;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.httpClient.get<User>(this.api + `/user/${this.selectId}`, { headers }).subscribe({
      next: (response) => {
        const data = response;

      },
      error: (error) => {
        alert(error.error);
      }
    });
  
      this.formModalUserUpdate.show();
    }*/

  realizarRefresh() {
    this.router.navigate([this.router.url]);
    this.router.navigateByUrl(this.router.url);
    this.listAllUsers();
  }
}
