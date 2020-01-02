import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemTableComponent} from "./item/item-table/item-table.component";
import {ItemCreateComponent} from "./item/item-create/item-create.component";
import {UserSignupComponent} from "./user/user-signup/user-signup.component";
import {UserUpdateComponent} from "./user/user-update/user-update.component";
import {UserResetPasswordComponent} from "./user/user-reset-password/user-reset-password.component";
import {UserForgotPasswordComponent} from "./user/user-forgot-password/user-forgot-password.component";
import {UserSigninComponent} from "./user/user-signin/user-signing.component";


const routes: Routes = [
  {path: 'item-table', component: ItemTableComponent},
  {path: 'item-create', component: ItemCreateComponent},
  {path: 'user-signup', component: UserSignupComponent},
  {path: 'user-signin', component: UserSigninComponent},
  {path: 'user-update', component: UserUpdateComponent},
  {path: 'user-reset-password', component: UserResetPasswordComponent},
  {path: 'user-forgot-password', component: UserForgotPasswordComponent},

  ];



@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
