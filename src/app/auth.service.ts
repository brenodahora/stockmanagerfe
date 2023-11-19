import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session: any;
  private api = environment.api;

  constructor(private httpClient: HttpClient) { }

  login(credentials: {email: string, senha: string}){
    return this.httpClient.post(this.api + '/authenticate', credentials);
  }
}
