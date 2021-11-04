import {Injectable} from '@angular/core';
import {HttpClient, HttpContextToken} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUser = (id: number): Observable<{ id: number, username: string, password: string, friends: [], feed: [], requests:[] }> => {
    return this.http.get<{ id: number, username: string, password: string, friends: [], feed: [], requests:[]  }>(`api/user/${id}`);
  }


  public createUser = (data: any): Observable<{ username: string, password: string }> => {
    return this.http.post<{ username: string, password: string }>(`api/user/createUser`, data);
  }


  public getAllUsers = (): Observable<{ id: number, username: string, password: string, friends: number[], feed: number[], requests: number[] }[]> => {
    return this.http.get<{ id: number, username: string, password: string, friends: number[], feed: number[], requests: number[] }[]>(`api/user/`);
  }

  public sendFriendRequest = (username: number, password: number): Observable<{ username: string }> => {
    return this.http.post<{ username: string }>(`api/user/sendFriendRequest`,
      {username, password}
    );
  }

  public unFriend = (username: number, password: number): Observable<{ username: string }> => {
    return this.http.post<{ username: string }>(`api/user/unFriend`,
      {username, password}
    );
  }

  public acceptRequest = (username: number, password: number): Observable<{ username: string }> => {
    return this.http.post<{ username: string }>(`api/user/acceptRequest`,
      {username, password}
    );
  }

  public denyRequest = (username: number, password: number): Observable<{ username: string }> => {
    return this.http.post<{ username: string }>(`api/user/denyRequest`,
      {username, password}
    );
  }
}
