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

  checkLogin()
  {
    if (this.authService.authenticate(this.username, this.password))
    {
      this.router.navigate([''])
      this.authService.authenticated = true;
      console.log("Logged In - Username: " + sessionStorage.getItem("username"))
    }
    else
      this.authService.authenticated = false;
  }



}
