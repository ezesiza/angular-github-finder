import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Github Finder Angular';

  constructor(router: Router, route: ActivatedRoute) {
    router.events.forEach(e => {
      if (e instanceof NavigationEnd) {
        this.title =route?.root?.firstChild?.snapshot.data['title']
        console.log(this.title);
      }
    });
  }
}
