import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  tempusername:string = "ClarkKent";
  temppassword:string = "Superman";

  public createUser = (data:any) => {
    this.userService.createUser(data).subscribe((resp)=>{
      // alert(JSON.stringify(resp));
    }, err=> {
      alert(JSON.stringify(err));
    })

  }

}
