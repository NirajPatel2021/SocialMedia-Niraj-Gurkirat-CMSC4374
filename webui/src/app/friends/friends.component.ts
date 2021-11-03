import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {PostService} from "../service/post.service";
import {Router} from "@angular/router";

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
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  title = 'Friends';
  name = sessionStorage.getItem('username')
  friends: users[] = [];
  LoggedUserName: string | null = null
  LoggedId: number = 0;

  constructor(
    private userService: UserService, private postService: PostService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this.LoggedUserName = sessionStorage.getItem("username")
    this.findLoggedId()
    this.getFriends()
  }

  getFriends() {
    this.userService.getAllUsers().subscribe(response => {
      let j = 0;
      while (j in response[this.LoggedId].friends) {
        let newuser = <users>({
          id: response[response[this.LoggedId].friends[j]].id,
          username: response[response[this.LoggedId].friends[j]].username,
          password: response[response[this.LoggedId].friends[j]].password,
          friends: response[response[this.LoggedId].friends[j]].friends,
          feed: response[response[this.LoggedId].friends[j]].feed,
          requests: response[response[this.LoggedId].friends[j]].requests
        })
        this.friends.push(newuser);
        j++
      }
    });
  }

  public unFriend = (data: any) => {
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
      this.userService.unFriend(LoggedId, data).subscribe(
        (resp) => {
          {
          }
        })
    });
    this.refresh()
  }

  findLoggedId() {
    this.userService.getAllUsers().subscribe(response => {
      let i = 1;
      while (i in response) {
        if (response[i].username === this.LoggedUserName) {
          this.LoggedId = response[i].id
          break;
        }
        i++;
      }
    });
  }

  private refresh() {
    this.friends = []
    this.findLoggedId()
    this.getFriends()
  }
}
