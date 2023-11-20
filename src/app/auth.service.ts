import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from './models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.api;

  constructor(private httpClient: HttpClient) { }

  login(credentials: {email: string, senha: string}){
    return this.httpClient.post<Auth>(this.api + '/authenticate', credentials);
  }
}
