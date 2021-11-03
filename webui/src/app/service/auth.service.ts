import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated = false;
  public loading =  false;

  constructor(private userService: UserService,private http: HttpClient) { }
  public authenticateWithBackend = (username: string, password: string): Observable<{username:string}> => {
    return this.http.post<{username:string}>(`api/user/checkCredentials`,
      {username,password}
      );
  }

  logout(){
    sessionStorage.removeItem('username')
    this.authenticated = false;

  }












}



