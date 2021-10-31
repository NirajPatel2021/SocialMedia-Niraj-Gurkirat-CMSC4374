import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {MakepostsComponent} from "./makeposts/makeposts.component";
import {LoginComponent} from "./login/login.component";
import {UsersComponent} from "./users/users.component";
import {RequestsComponent} from "./requests/requests.component";
import {PathGuard} from "./guards/path.guard";
import {FriendsComponent} from "./friends/friends.component";

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent, canActivate: [PathGuard]},
  {path: 'friends', component: FriendsComponent, canActivate: [PathGuard]},
  {path: 'requests', component: RequestsComponent, canActivate: [PathGuard]},
  {path: 'posts', component: MakepostsComponent, canActivate: [PathGuard]}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
