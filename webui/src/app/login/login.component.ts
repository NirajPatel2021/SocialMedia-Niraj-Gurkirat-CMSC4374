import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  username: string = "";
  password: string = "";

  checkLogin() {
    this.authService.authenticateWithBackend(this.username, this.password).subscribe(
      (resp) => {
        if (resp.username !== "null") {
          this.router.navigate(['friends'])
          this.authService.authenticated = true;
          sessionStorage.setItem('username', this.username)
        } else {
          alert("Invalid Credentials");
          this.authService.authenticated = false;
        }
      })
  }
}
