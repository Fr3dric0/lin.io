import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Lindhagen IT';
  year = new Date().getFullYear();

  headerStyle = 'normal';

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setHeaderStyle(val.url);
      }
    });
  }


  setHeaderStyle(url) {
    switch(url) {
      case '/':
        this.headerStyle = 'light';
        break;
      default:
        this.headerStyle = 'normal';
        break;
    }
  }
}
