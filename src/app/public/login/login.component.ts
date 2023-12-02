import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MailService } from 'src/app/services/mail/mail.service';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  auth: Auth | any;
  alertMessage: string = "";

  emailAlreadyExists: boolean = false;

  email: string = '';
  senha: string = '';

  newemail: string = '';
  newsenha: string = '';
  name: string = '';

  formLoginSubmitted: boolean = false;
  @ViewChild('loginForm') loginForm!: NgForm;

  formCreateSubmitted: boolean = false;
  @ViewChild('createUserForm') createUserForm!: NgForm;

  constructor(private authService: AuthService, private router: Router, private mailService: MailService) {
    if (localStorage.getItem('isLoggedIn') == '1') {
      this.router.navigate(['/stock']);
    }
  }

  login() {
    this.formLoginSubmitted = true;
    if (this.loginForm.valid) {
      const credentials = { email: this.email, senha: this.senha };

      this.authService.login(credentials).subscribe({
        next: (response) => {
          localStorage.setItem('_id', response.user._id);
          localStorage.setItem('token', response.token);
          localStorage.setItem('isLoggedIn', '1');

          this.router.navigate(['/stock']);
        },
        error: (error) => {
          this.emailAlreadyExists = true;
          this.alertMessage = error.error;
          setTimeout(() => { this.emailAlreadyExists = false; }, 5000);
        }
      });
    }
  }

  createNewUser() {
    this.formCreateSubmitted = true;

    if (this.createUserForm.valid) {
      const newUser = { email: this.newemail, senha: this.newsenha, name: this.name };

      // Chamada da API para criar novo usuário
      this.authService.create(newUser).subscribe({
        next: (response) => {
          this.auth = response;

          // Se usuário foi criado com sucesso, então faz login
          if (this.auth) {
            this.authService.login({ email: this.newemail, senha: this.newsenha }).subscribe({
              next: (response) => {
                localStorage.setItem('_id', response.user._id);
                localStorage.setItem('token', response.token);
                localStorage.setItem('isLoggedIn', '1');

                this.router.navigate(['/stock']);
              },
              error: (error) => {
                this.emailAlreadyExists = true;
                this.alertMessage = error.error;
                setTimeout(() => { this.emailAlreadyExists = false; }, 5000);
              }
            });
          }
        },
        // Se erro na criação do usuário, então mostrar alertMessage
        error: (error) => {
          if (error.error.Error == "Email address already registered in the database.") {
            this.emailAlreadyExists = true;
            this.alertMessage = "O e-mail informado já está sendo utilizado.";
            setTimeout(() => { this.emailAlreadyExists = false; }, 5000);
          } else {
            this.emailAlreadyExists = true;
            this.alertMessage = error.error.Error;
            setTimeout(() => { this.emailAlreadyExists = false; }, 5000);
          }
        }
      });
    }
  }

  //Em construção
  sendConfirmationCode() {
    const mail = {
      Email: this.email,
      Name: 'Breno',
      Subject: 'Confirme seu código de redefinição de senha.',
      Text: 'Olá! Identificamos uma tentativa de redefinição de senha em sua conta de Stock Manager. Código de confirmação: 105679'
    };
    /*
        this.mailService.send(mail).subscribe(response =>
          console.log(response)
        );
        */
  }
}
