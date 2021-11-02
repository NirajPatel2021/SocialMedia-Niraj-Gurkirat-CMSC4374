import {Component, OnInit} from '@angular/core';
import {PostService} from "../service/post.service";
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
  selector: 'app-makeposts',
  templateUrl: './makeposts.component.html',
  styleUrls: ['./makeposts.component.scss']
})
export class MakepostsComponent implements OnInit {
  title = "Posts"
  name = sessionStorage.getItem('username')

  friends: users[] = [];
  friendsPosts: post[] = [];

  constructor(private postService: PostService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.findLoggedId()
    this.getAllPosts()

  }

  temptext: string = "post text";
  temptime: string = new Date().toString();
  LoggedId: number = 0;

  public createPost = (data: any) => {
    this.postService.createPost(data).subscribe((resp) => {
      //alert(JSON.stringify(resp));
      this.getAllPosts()
    }, err => {
      alert(JSON.stringify(err));
    })

  }

  public updatePost = (data: any) => {
    this.postService.updatePost(data).subscribe((resp) => {
      alert(JSON.stringify(resp));
    }, err => {
      alert(JSON.stringify(err));
    })

  }

  public deletePost = (id: number) => {

    this.postService.deletePost(id).subscribe(() => {
      //alert("deleted");
      this.getAllPosts();
    }, err => {
      alert(JSON.stringify(err));
    })

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

          if (newpost.postedByString === sessionStorage.getItem('username')) {
            this.friendsPosts.push(newpost);
          }
        });
        i++;
      }
    });
  }


  findLoggedId() {
    this.userService.getAllUsers().subscribe(response => {
      let CurrentUsername = sessionStorage.getItem('username')

      let i = 1;
      while (i in response) {
        if (response[i].username === CurrentUsername) {
          this.LoggedId = response[i].id
          break;
        }
        i++;
      }
    });
  }

}
