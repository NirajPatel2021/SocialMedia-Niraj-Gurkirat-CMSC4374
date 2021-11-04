import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {PostService} from "../service/post.service";
import {ActivatedRoute} from "@angular/router";

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
  selector: 'app-viewfriendpage',
  templateUrl: './viewfriendpage.component.html',
  styleUrls: ['./viewfriendpage.component.scss']
})
export class ViewfriendpageComponent implements OnInit {

  public friend: any = {}
  friendPosts: post[] = []
  friendFriends: users[] = []
  friendId: number = 0

  constructor(private userService: UserService, private postService: PostService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.friendId = Number(this.route.snapshot.paramMap.get(('id')))
    this.getFriendName()
    this.getFriendPosts()
    this.getFriendFriends()
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
          })
          this.friendPosts.push(newpost)
        });
      }
    });
  }


  getFriendFriends() {
    this.userService.getUser(this.friendId).subscribe(response => {
      let myFriends = response.friends
      for (let i = 0; i < myFriends.length; i++) {
        this.userService.getUser(myFriends[i]).subscribe(response => {
          let newuser = <users>({
            id: response.id,
            username: response.username,
            password: response.password,
            friends: response.friends,
            feed: response.feed,
            requests: response.requests
          })
          this.friendFriends.push(newuser)
        });
      }
    });
  }





}
