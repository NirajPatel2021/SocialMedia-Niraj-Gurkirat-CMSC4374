import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";

class users {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public friends: [],
    public feed: []
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

  users: users[] = [];
  friends: users[] = [];

  LoggedUserName: string | null = null
  LoggedId: number = 1;

  public user: { id: number, username: String, password: String, friends: [], feed: [] } | null = null
  userId: number = 1;
  public errorMessage: string = '';


  friendsCount: number = 0;

  LoggedUserName: string | null = null
  LoggedId: number = 1;

  public user: { id: number, username: String, password: String, friends: [], feed: [] } | null = null
  userId: number = 1;
  public errorMessage: string = '';


  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.LoggedUserName = sessionStorage.getItem("username")
    this.findLoggedId()
    this.getUsers();
  }

  getUsers() {

    this.userService.getAllUsers().subscribe(response => {

      let j = 0;
      while (j in response[this.LoggedId].friends) {
        console.log(response[this.LoggedId].friends[j])

        let newuser = <users>({
          id: response[response[this.LoggedId].friends[j]].id,
          username: response[response[this.LoggedId].friends[j]].username,
          password: response[response[this.LoggedId].friends[j]].password,
          friends: response[response[this.LoggedId].friends[j]].friends,
          feed: response[response[this.LoggedId].friends[j]].feed
        })
        this.friends.push(newuser);

        j++
      }

      this.users = [];

      let i = 1;

      while (i in response) {

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


    });
  }

  findLoggedId() {

    this.userService.getAllUsers().subscribe(response => {

      let i = 1;
      while (i in response) {
        if (response[i].username === this.LoggedUserName)
        {
          this.LoggedId = response[i].id
          break;
        }

        i++;
      }

    });

    // console.log("in Init")
    // console.log(sessionStorage.getItem("username"))
    // console.log(this.LoggedUserName)
    this.getUsers();
  }

  getUsers() {

    // console.log("in getUsers")
    // console.log(this.LoggedUserName)

    this.userService.getAllUsers().subscribe(response => {
      // console.log("response");
      // console.log(response[1]);
      // console.log(response);

      this.friendsCount = response[1].friends.length
      // console.log("in get users")
      // console.log(this.friendsCount)

      let j = 0;
      while (j in response[this.LoggedId].friends) {
        console.log(response[this.LoggedId].friends[j])

        let newuser = <users>({
          id: response[response[this.LoggedId].friends[j]].id,
          username: response[response[this.LoggedId].friends[j]].username,
          password: response[response[this.LoggedId].friends[j]].password,
          friends: response[response[this.LoggedId].friends[j]].friends,
          feed: response[response[this.LoggedId].friends[j]].feed
        })
        this.friends.push(newuser);


        j++
      }


      this.users = [];

      let i = 1;

      while (i in response) {

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


    });
  }

  findLoggedId() {

    this.userService.getAllUsers().subscribe(response => {

      let i = 1;
      while (i in response) {
        if (response[i].username === this.LoggedUserName)
        {
          this.LoggedId = response[i].id
          break;
        }

        i++;
      }

    });
  }


}
