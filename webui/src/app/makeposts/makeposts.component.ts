import { Component, OnInit } from '@angular/core';
import { PostService } from "../service/post.service";

@Component({
  selector: 'app-makeposts',
  templateUrl: './makeposts.component.html',
  styleUrls: ['./makeposts.component.scss']
})
export class MakepostsComponent implements OnInit {
  title = "Posts"
  name = sessionStorage.getItem('username')


  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  temptext:string = "post text";
  temptime:string = new Date().toString();

  public createPost = (data:any) => {
    this.postService.createPost(data).subscribe((resp)=>{
       alert(JSON.stringify(resp));
    }, err=> {
      alert(JSON.stringify(err));
    })

  }

  public updatePost = (data:any) => {
    this.postService.updatePost(data).subscribe((resp)=>{
      alert(JSON.stringify(resp));
    }, err=> {
      alert(JSON.stringify(err));
    })

  }

}
