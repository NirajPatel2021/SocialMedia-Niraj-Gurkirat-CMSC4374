import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {HttpClient} from "@angular/common/http";

class users {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public friends: [],
    public feed: [],
    public requests: []
  ) {
  }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title = 'User';
  name = sessionStorage.getItem('username')


  users: users[] = [];


  public user: { id: number, username: String, password: String, friends: [], feed: [] } | null = null
  userId: number = 1;
  public errorMessage: string = '';

  // constructor(private userService: UserService) {
  // }

  constructor(
    private userService: UserService
  ) {
  }

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
      while (i in response) {
        let newuser = <users>({
          id: response[i].id,
          username: response[i].username,
          password: response[i].password,
          friends: response[i].friends,
          feed: response[i].feed,
          requests: response[i].requests
        })
        this.users.push(newuser);
        i++;
      }
    });
  }


  // public sendFriendRequest = (data:any) => {
  //   this.userService.sendFriendRequest(data).subscribe((resp)=>{
  //     alert(JSON.stringify(resp));
  //   }, err=> {
  //     alert(JSON.stringify(err));
  //   })
  //
  // }


  public sendFriendRequest = (data: any) => {

    let LoggedId = 0;
    this.userService.getAllUsers().subscribe(response => {
      let i = 1;
      while (i in response) {
        if (response[i].username === sessionStorage.getItem('username')) {
          LoggedId = response[i].id
          break;
        }
        i++;
      }

      this.userService.sendFriendRequest(LoggedId, data).subscribe(
        (resp) => {
          {
          }
        })
    });

  }


}
