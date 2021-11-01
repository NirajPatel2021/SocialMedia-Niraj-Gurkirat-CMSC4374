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

class post {
  constructor(
    public id: number,
    public text: string,
    public time: string,
    public postedByNum: number,
    public postedByString: string
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
  friendsPosts: post[] = [];


  LoggedUserName: string | null = null
  LoggedId: number = 745;

  constructor(
    private userService: UserService, private postService: PostService, private router: Router
  ) {
  }

  ngOnInit(): void {
    this.LoggedUserName = sessionStorage.getItem("username")
    this.findLoggedId()
    this.getUsers();
    this.getAllPosts();

  }

  getUsers() {

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

  getAllPosts() {
    this.postService.getAllPosts().subscribe(response => {

      let postedBy: number = 1;
      let username: string = "";
      let i = 1;
      while (i in response) {

        let idTemp: number = response[i].id
        let textTemp: string = response[i].text
        let timeTemp: string = response[i].time
        let postedByNumTemp: number = response[i].postedBy
        postedBy = response[i].postedBy
        this.userService.getUser(postedBy).subscribe(response => {
          username = response.username

          let newpost = <post>({
              id: idTemp,
              text: textTemp,
              time: timeTemp,
              postedByNum: postedByNumTemp,
              postedByString: username
            }
          )

          if (sessionStorage.getItem('username') === newpost.postedByString) {
            this.friendsPosts.push(newpost);
          }
          let isValidPost = false
          let k = 0
          while (k in this.friends) {
            if (this.friends[k].username === username) {
              isValidPost = true;
            }
            k++
          }
          if (isValidPost) {
            this.friendsPosts.push(newpost);
          }
        });
        i++;
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
            this.router.navigate([''])

          }
        })
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


}
