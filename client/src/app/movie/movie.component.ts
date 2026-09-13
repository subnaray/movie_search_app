import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
    constructor(public auth: AuthService) {}

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

    getDisplayName(name: string | undefined): string {
    if (!name) {
      return 'Movie User';
    }

    let displayName = name.includes('@')
      ? name.split('@')[0]
      : name;

    displayName = displayName.replace(/([a-z])([A-Z])/g, '$1 $2');

    displayName = displayName.replace(/[-_.]+/g, ' ');

    displayName = displayName
      .split(' ')
      .filter(word => word.length > 0)
      .map(word =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
      )
      .join(' ');

    return displayName;
  }
}
