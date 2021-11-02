import { Injectable } from '@angular/core';
import {HttpClient, HttpContextToken} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  public getPost = (id:number): Observable<{id:number, text:string, time:string, postedBy:number}> => {
    return this.http.get<{id:number, text:string, time:string, postedBy:number}>(`api/post/${id}`);
  }

  public getAllPosts = (): Observable<{id:number, text:string, time:string, postedBy:number}[]> => {
    return this.http.get<{id:number, text:string, time:string, postedBy:number}[]>(`api/post/`);
  }

  public createPost = (data:any): Observable<{id: number,text:string, time:string, postedBy:number}> => {
    return this.http.post<{id:number, text:string, time:string, postedBy:number}>(`api/post/createPost`,data);
  }

  public updatePost = (data:any): Observable<{id:number, text:string, time:string, postedBy:number}> => {
    return this.http.put<{id:number, text:string, time:string, postedBy:number}>(`api/post/updatePost`,data);
  }

  public deletePost = (id:number): Observable<{}> => {
    return this.http.delete(`api/post/deletePost/${id}`);
  }




}
