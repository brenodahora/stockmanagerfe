import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Auth } from '../models/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  auth: Auth | undefined;

  constructor(private authService: AuthService, private router: Router){}

  login(){
    const credentials = { email: this.email, senha: this.senha};

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.auth = response;

        localStorage.setItem('_id', this.auth.user._id);
        localStorage.setItem('token', this.auth.token);

        this.router.navigateByUrl('/home');
      },
      error: (error) => {
        alert(error.error);
      }
    });
  }
}
