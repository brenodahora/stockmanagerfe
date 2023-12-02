import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  readonly _id: string | null = localStorage.getItem('_id');
  readonly token: string | null = localStorage.getItem('token');
  readonly loggedIn: string | null = localStorage.getItem('isLoggedIn');

  isLoggedIn: boolean = false;
  isHomeOrLoginPage: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      if (this.loggedIn == '1') {
        this.isLoggedIn = true;
      }

      if (urlSegments.length === 0 || urlSegments[0].path == 'login') {
        this.isHomeOrLoginPage = false;
      }
    });
  }
}
