import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ItemTableComponent} from './item/item-table/item-table.component';
import {ItemCreateComponent} from './item/item-create/item-create.component';
import {AccountViewComponent} from './account/account-view/account-view.component';
import {EventComponent} from './event/event.component';
import {UserSignupComponent} from './user/user-signup/user-signup.component';
import {UserResetPasswordComponent} from './user/user-reset-password/user-reset-password.component';
import {UserForgotPasswordComponent} from './user/user-forgot-password/user-forgot-password.component';
import {UserSigninComponent} from './user/user-signin/user-signin.component';
import {ItemSortableDirective} from './item/item-sortable.directive';
import {HomeComponent} from './home/home.component';
import {AuthGuardService as AuthGuard} from './user/services/auth-guard.service';
import {AccountUpgradeComponent} from './account/account-upgrade/account-upgrade.component';
import {UserInviteComponent} from './account/account-invite/account-invite.component';
import {NotificationComponent} from "./websocket/notification/notification.component";
import {WarehouseAdviceComponent} from './warehouse-advice/warehouse-advice.component';
import {WarehouseCreateComponent} from "./warehouse/warehouse-create/warehouse-create.component";
import {WarehousesComponent} from "./warehouse/warehouses/warehouses.component";
import {WarehouseUpdateComponent} from "./warehouse/warehouse-update/warehouse-update.component";
import {DashboardComponent} from './dashboard/dashboard.component';
import {AssociateComponent} from "./associate/associate.component";
import {FormAssociateComponent} from "./associate/form-associate/form-associate.component";
import {UserInfoComponent} from "./user/user-info/user-info.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {UserConfirmationComponent} from "./user/user-confirmation/user-confirmation.component";
import {LoginPageGuardService} from "./user/services/login-page-guard.service";


export const routerComponents = [
  // main components("/home", "/sign-in", "/sign-up")
  HomeComponent,
  UserSigninComponent,
  UserSignupComponent,
  // nav components:
  // "/home/(nav:users)",
  // "/home/(nav:warehouses)"
  ItemCreateComponent,
  ItemTableComponent,
  ItemSortableDirective,
  EventComponent,
  UserForgotPasswordComponent,
  UserResetPasswordComponent,
  AccountViewComponent,
  AccountUpgradeComponent,
  UserInviteComponent,
  NotificationComponent,
  WarehouseAdviceComponent,
  WarehouseCreateComponent,
  WarehousesComponent,
  WarehouseUpdateComponent,
  DashboardComponent,
  AssociateComponent,
  FormAssociateComponent,
  UserInfoComponent,
  UserConfirmationComponent
];

@NgModule({
  imports: [
    NgbModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'sign-in', canActivate: [LoginPageGuardService], component: UserSigninComponent},
      {path: 'sign-up', canActivate: [LoginPageGuardService], component: UserSignupComponent},
      {path: 'forgot-password', canActivate: [LoginPageGuardService], component: UserForgotPasswordComponent},
      {path: 'reset-password', canActivate: [LoginPageGuardService], component: UserResetPasswordComponent},
      {path: 'users/confirmation', canActivate: [LoginPageGuardService], component: UserConfirmationComponent},
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
          {path: 'events', component: EventComponent, outlet: 'nav'},
          {path: 'item-table', component: ItemTableComponent, outlet: 'nav'},
          {path: 'account', component: AccountViewComponent, outlet: 'nav'},
          {path: 'upgrade', component: AccountUpgradeComponent, outlet: 'nav'},
          {path: 'invite', component: UserInviteComponent, outlet: 'nav'},
          {path: 'socket', component: NotificationComponent},
          {path: 'warehouse-advice', component: WarehouseAdviceComponent, outlet: 'nav'},
          {path: 'warehouse-create', component: WarehouseCreateComponent, outlet: 'nav'},
          {path: 'warehouses', component: WarehousesComponent, outlet: 'nav'},
          {path: 'warehouse-update/:id', component: WarehouseUpdateComponent, outlet: 'nav'},
          {path: 'dashboard', component: DashboardComponent, outlet: 'nav'},
          {path: 'associates', component: AssociateComponent, outlet: 'nav'},
          {path: 'add-associate', component: FormAssociateComponent, outlet: 'nav'},
          {path: 'edit-associate/:id', component: FormAssociateComponent, outlet: 'nav'},
          {path: 'profile-info', component: UserInfoComponent, outlet: 'nav'},
        ]
      },
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
