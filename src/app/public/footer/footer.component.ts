import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isHomePage: boolean = true;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length === 0) {
        this.isHomePage = false;
      }
    });
  }
}
