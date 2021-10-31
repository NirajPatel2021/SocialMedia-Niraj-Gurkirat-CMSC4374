import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignupComponent} from "./signup/signup.component";
import {MakepostsComponent} from "./makeposts/makeposts.component";

const routes: Routes = [
  {path: 'signup', component: SignupComponent},
  {path: 'writeposts', component: MakepostsComponent}//,
  //{path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
