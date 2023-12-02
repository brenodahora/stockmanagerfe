import { Injectable } from '@angular/core';
import { Mail } from 'src/app/models/mail.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private webhook = environment.webhookmail;

  constructor(private httpClient: HttpClient) { }

  send(mail: Mail) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      responseType: 'text' as 'json',
    };
    return this.httpClient.post(this.webhook, mail, options);
  }
}