import {Component, OnInit} from '@angular/core';
import {AuthService} from "./service/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Social Media';

  constructor(public authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.authService.authenticated = false;
    console.log("Logged Out")
    this.router.navigate(['login'])

  }


}
