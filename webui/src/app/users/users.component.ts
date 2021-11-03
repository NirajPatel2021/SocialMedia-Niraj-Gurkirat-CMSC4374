import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";

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
  AllUsers: users[] = []
  LoggedUser: users[] = []
  public user: { id: number, username: String, password: String, friends: [], feed: [] } | null = null
  userId: number = 1
  public errorMessage: string = ''

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(response => {
      this.AllUsers = [];
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
        if ((response[i].username === sessionStorage.getItem('username'))) {
          this.LoggedUser.push(newuser)
        } else {
          this.AllUsers.push(newuser)
        }
        i++;
      }
    });
  }


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

    this.AllUsers = []
    this.LoggedUser = []
    setTimeout(() => this.getUsers(),100);



  }

  alreadyFriends = (id: number) => {
    let myId = this.LoggedUser[0].id
    let friends: [] = [];
    for (let i = 0; i < this.AllUsers.length; i++) {
      if (this.AllUsers[i].id === id) {
        friends = this.AllUsers[i].friends
        break;
      }
    }
    for (let i = 0; i < friends.length; i++) {
      if (myId == friends[i]) {
        return true
        break;
      }
    }
    return false
  }


  alreadyRequested = (id: number) => {
    let myId = this.LoggedUser[0].id
    let requests: [] = [];
    for (let i = 0; i < this.AllUsers.length; i++) {
      if (this.AllUsers[i].id === id) {
        requests = this.AllUsers[i].requests
        break;
      }
    }
    for (let i = 0; i < requests.length; i++) {
      if (myId == requests[i]) {
        return true
        break;
      }
    }
    return false
  }


}
