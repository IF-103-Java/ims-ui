import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ItemTableComponent} from './item/item-table/item-table.component';
import {ItemCreateComponent} from './item/item-create/item-create.component';
import {EventComponent} from './event/event.component';
import {UserSignupComponent} from './user/user-signup/user-signup.component';
import {UserUpdateComponent} from './user/user-update/user-update.component';
import {UserResetPasswordComponent} from './user/user-reset-password/user-reset-password.component';
import {UserForgotPasswordComponent} from './user/user-forgot-password/user-forgot-password.component';
import {UserSigninComponent} from './user/user-signin/user-signin.component';
import {ItemSortableDirective} from './item/item-sortable.directive';
import {MainScreenComponent} from './main-screen/main-screen.component';

export const routerComponents = [
  ItemCreateComponent,
  ItemTableComponent,
  ItemSortableDirective,
  EventComponent,
  UserSigninComponent,
  UserSignupComponent,
  UserUpdateComponent,
  UserForgotPasswordComponent,
  UserResetPasswordComponent
];

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home', component: MainScreenComponent, children: [
          {path: 'events', component: EventComponent, outlet: 'nav'},
          {path: 'item-table', component: ItemTableComponent, outlet: 'nav'},
        ]
      },
      {path: 'sign-in', component: UserSigninComponent},
      {path: 'sign-up', component: UserSignupComponent}
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
