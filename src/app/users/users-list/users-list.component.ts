import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { User, UserApiResponse } from '../../models/product.model';
import { Router } from '@angular/router';

declare var window:any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  name: string = '';
  email: string = '';

  formModalUserCreate:any;
  formModalUserDelete:any;

  readonly _id: string | null = localStorage.getItem('_id');
  readonly token: string | null = localStorage.getItem('token');
  private api = environment.api;

  users: User[] = [];
  userApiResponse: UserApiResponse = {users: []}

  constructor(private httpClient: HttpClient, private router: Router){ }

  private initialize(): void {
    this.listAllUsers();
  }

  ngOnInit(): void {
    this.initialize();
    this.formModalUserCreate = new window.bootstrap.Modal(
      document.getElementById("modalCreateProduct")
    )
    this.formModalUserDelete = new window.bootstrap.Modal(
      document.getElementById("modalDeleteProduct")
    )
  }

  private listAllUsers(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });

    this.httpClient.get<UserApiResponse>(this.api + '/user', { headers }).subscribe({
      next: (response) => {
        this.userApiResponse = response;
        this.users = response.users;
      },
      error: (error) => {
        alert(error.error);
      }
    });
  }

  openModalCreateUser(){
    this.formModalUserCreate.show();
  }
  openmodalDeleteUser(){
    this.formModalUserDelete.show();
  }


  realizarRefresh() {
    this.router.navigate([this.router.url]);
    this.router.navigateByUrl(this.router.url);
    this.listAllUsers();
  }
}
