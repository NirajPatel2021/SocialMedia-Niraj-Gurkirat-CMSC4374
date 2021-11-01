import {Component, OnInit} from '@angular/core';
import {PostService} from "../service/post.service";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-makeposts',
  templateUrl: './makeposts.component.html',
  styleUrls: ['./makeposts.component.scss']
})
export class MakepostsComponent implements OnInit {
  title = "Posts"
  name = sessionStorage.getItem('username')

  constructor(private postService: PostService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.findLoggedId()

  }

  temptext: string = "post text";
  temptime: string = new Date().toString();
  LoggedId: number = 0;

  public createPost = (data: any) => {
    this.postService.createPost(data).subscribe((resp) => {
      alert(JSON.stringify(resp));
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
