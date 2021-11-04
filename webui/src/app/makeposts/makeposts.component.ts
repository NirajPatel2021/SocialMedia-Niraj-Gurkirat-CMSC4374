import {Component, OnInit} from '@angular/core';
import {PostService} from "../service/post.service";
import {UserService} from "../service/user.service";
import {Router} from "@angular/router";


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
  myPosts: post[] = [];

  constructor(private postService: PostService, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.findLoggedId()
    this.getAllPosts()
  }

  temptext: string = "Post Text";
  temptime: string = new Date().toLocaleString()
  edittext: string = "Edit Text";
  LoggedId: number = 0;

  public createPost = (data: any) => {
    this.temptime = new Date().toLocaleString()
    this.postService.createPost(data).subscribe((resp) => {
      this.router.navigate(['posts'])
    }, err => {
      alert(JSON.stringify(err));
    })
    setTimeout(() => 2000);
    this.myPosts = [];
    this.getAllPosts();
  }

  public updatePost = (data: any) => {
    this.postService.updatePost(data).subscribe((resp) => {
    }, err => {
      alert(JSON.stringify(err));
    })
    setTimeout(() => 2000);
    this.myPosts = []
    this.getAllPosts()
  }

  public deletePost = (id: number) => {
    this.postService.deletePost(id).subscribe(() => {
    }, err => {
      alert(JSON.stringify(err));
    })
    setTimeout(() => 2000);
    this.myPosts = []
    this.getAllPosts()
  }

  getAllPosts() {
    let LoginID = 0
    this.userService.getAllUsers().subscribe(response => {
      let i = 1;
      while (i in response) {
        if (response[i].username === sessionStorage.getItem('username')) {
          LoginID = response[i].id
          break;
        }
        i++;
      }
      this.userService.getUser(LoginID).subscribe(response => {
        let myFeed = response.feed
        for (let i = 0; i < myFeed.length; i++) {
          this.postService.getPost(myFeed[i]).subscribe(response => {
            let newpost = <post>({
              id: response.id,
              text: response.text,
              time: response.time,
              postedByNum: response.postedBy,
              postedByString: this.name
            })
            this.myPosts.push(newpost)
            this.myPosts.sort()
          });
        }
      });
    });
  }

  findLoggedId() {
    this.userService.getAllUsers().subscribe(response => {
      let i = 1;
      while (i in response) {
        if (response[i].username === sessionStorage.getItem('username')) {
          this.LoggedId = response[i].id
          break;
        }
        i++;
      }
    });
  }


}
