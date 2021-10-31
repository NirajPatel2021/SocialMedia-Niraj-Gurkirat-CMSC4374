import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated = false;
  public loading =  false;


  constructor(private userService: UserService) { }

  // authenticate(username: string, password: string)
  // {
  //   if (username === "luffy" && password === "password")
  //   {
  //     sessionStorage.setItem('username', username)
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }


  authenticate(username: string, password: string)
  {




    if (username === "luffy" && password === "password")
    {
      sessionStorage.setItem('username', username)
      return true;
    }
    else{
      return false;
    }
  }


  logout(){
    sessionStorage.removeItem('username')
  }












}



