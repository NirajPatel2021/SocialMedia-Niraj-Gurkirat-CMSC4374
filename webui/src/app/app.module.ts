import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule} from "@angular/forms";
import { MakepostsComponent } from './makeposts/makeposts.component';
import { LoginComponent } from './login/login.component';
import { FriendsComponent } from './friends/friends.component';
import { RequestsComponent } from './requests/requests.component';
import {UsersComponent} from "./users/users.component";


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MakepostsComponent,
    LoginComponent,
    FriendsComponent,
    RequestsComponent,
    UsersComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
