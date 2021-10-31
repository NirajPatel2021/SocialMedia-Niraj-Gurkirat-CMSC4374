import { Injectable } from '@angular/core';
import {HttpClient, HttpContextToken} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUser = (id:number): Observable<{id:number, username:string}> => {
    return this.http.get<{id:number, username:string}>(`api/user/${id}`);
  }

  public createUser = (data:any): Observable<{username:string, password:string}> => {
    return this.http.post<{username:string, password:string}>(`api/user/createUser`,data);
  }

  // public updateUser = (data:any): Observable<{id:number, username:string, password:string}> => {
  //   return this.http.put<{id:number, username:string, password:string}>(`api/user/updateUser`,data);
  // }

}
