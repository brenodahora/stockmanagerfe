import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService){}

  login(){
    const credentials = { email: this.email, senha: this.senha};
    console.log(credentials);
    
    this.authService.login(credentials).subscribe( response => console.log(response));
  }
}
