import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
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
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  title = 'Requests';
  name = sessionStorage.getItem('username')
  requests: users[] = [];
  LoggedUserName: string | null = null
  LoggedId: number = 1;

  constructor(
    private userService: UserService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this.LoggedUserName = sessionStorage.getItem("username")
    this.findLoggedId()
    this.getRequests();
  }

  getRequests() {
    this.userService.getAllUsers().subscribe(response => {
      let j = 0;
      while (j in response[this.LoggedId].requests) {
        let newuser = <users>({
          id: response[response[this.LoggedId].requests[j]].id,
          username: response[response[this.LoggedId].requests[j]].username,
          password: response[response[this.LoggedId].requests[j]].password,
          friends: response[response[this.LoggedId].requests[j]].friends,
          feed: response[response[this.LoggedId].requests[j]].feed,
          requests: response[response[this.LoggedId].requests[j]].requests
        })
        this.requests.push(newuser);
        j++
      }
    });
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


  public acceptRequest = (data: any) => {
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
      this.userService.acceptRequest(LoggedId, data).subscribe(
        (resp) => {
          {
          }
        })
    });
    this.refresh()
  }

  public denyRequest = (data: any) => {
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
      this.userService.denyRequest(LoggedId, data).subscribe(
        (resp) => {
          {
          }
        })
    });
    this.refresh()
  }

  private refresh() {
    this.requests = []
    this.findLoggedId()
    this.getRequests()
  }
}
