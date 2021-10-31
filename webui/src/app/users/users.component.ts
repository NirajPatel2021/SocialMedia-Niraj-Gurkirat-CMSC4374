import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {HttpClient} from "@angular/common/http";

class users {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public friends: [],
    public feed: []) {
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title = 'User';

  users: users[] = [];


  public user: { id: number, username: String, password:String, friends: [], feed: [] } | null = null
  userId: number = 1;
  public errorMessage:string = '';

  // constructor(private userService: UserService) {
  // }

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.httpClient.get<any>(`api/user/`).subscribe(response => {
      console.log(response);
      this.users = response;
    });
  }

  // public getUser = () => {
  //   this.userService.getUser(this.userId).subscribe((user) => {
  //     this.user = user;
  //     this.errorMessage = '';
  //     this.userId += 1;
  //   }, err => this.errorMessage = err.error.message);
  // }

  // private getAllUsers = () => {
  //   this.userService.getAllUsers().subscribe((users) => {
  //     this.users = users;
  //     this.errorMessage = '';
  //   }, err => this.errorMessage = err.error.message);
  // }


}
