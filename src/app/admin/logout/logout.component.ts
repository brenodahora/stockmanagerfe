import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
    //Redefinindo LocalStorage para tirar o login
    localStorage.setItem('isLoggedIn', '0');
    //Redirecionando para home
    this.router.navigate(['']);
  }
}
