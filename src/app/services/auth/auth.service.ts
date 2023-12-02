import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../../models/auth.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = environment.api;

  constructor(private httpClient: HttpClient) { }

  login(credentials: { email: string, senha: string }) {
    return this.httpClient.post<Auth>(this.api + '/authenticate', credentials);
  }

  create(user: { email: string, senha: string, name: string }) {
    return this.httpClient.post<Auth>(this.api + '/user', user);
  }

  validateToken(data: { token: string }) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${data.token}`,
      'Content-Type': 'application/json',
    });

    return this.httpClient.post(this.api + '/validatetoken', '', { headers });
  }
}
