import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {PostService} from "../service/post.service";
import {ActivatedRoute} from "@angular/router";

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
  selector: 'app-viewfriendpage',
  templateUrl: './viewfriendpage.component.html',
  styleUrls: ['./viewfriendpage.component.scss']
})
export class ViewfriendpageComponent implements OnInit {

  public friend: any = {}
  // name = sessionStorage.getItem('username')

  myPosts: post[] = [];
  friendId: number = 0;


  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.friendId = Number(this.route.snapshot.paramMap.get(('id')))
    this.getFriendName()
    this.getFriendPosts()

  }

  private getFriendName = () => {
    this.userService.getUser(this.friendId).subscribe(response => {
      this.friend = response.username
    });
  }


  getFriendPosts() {

    this.userService.getUser(this.friendId).subscribe(response => {
      let myFeed = response.feed
      for (let i = 0; i < myFeed.length; i++) {
        this.postService.getPost(myFeed[i]).subscribe(response => {
          let newpost = <post>({
            id: response.id,
            text: response.text,
            time: response.time,
            postedByNum: response.postedBy,
            // postedByString: this.name
          })
          this.myPosts.push(newpost)
        });
      }
    });

  }
}
