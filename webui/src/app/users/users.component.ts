import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {HttpClient} from "@angular/common/http";

class users {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public friends: [],
    public feed: []
    )
  {
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(response => {
      console.log("response");
      console.log(response[1]);
      console.log(response);

      this.users = [];

      let i = 1;

      while(i in response){

        let newuser = <users>({
          id: response[i].id,
          username: response[i].username,
          password: response[i].password,
          friends: response[i].friends,
          feed: response[i].feed
        })
        this.users.push(newuser);

        i++;
      }

      // for(let i = 0; i < response.length; i++){
      //   let newuser = <users>({
      //     id: response[i].id,
      //     username: response[i].username,
      //     password: response[i].password,
      //     friends: response[i].friends,
      //     feed: response[i].feed
      //   })
      //   this.users.push(newuser);
      // }

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
