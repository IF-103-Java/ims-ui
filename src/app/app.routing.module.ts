import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemTableComponent} from "./item/item-table/item-table.component";
import {ItemCreateComponent} from "./item/item-create/item-create.component";
import {AccountViewComponent} from './account/account-view/account-view.component';


const routes: Routes = [
  {path: 'item-table', component: ItemTableComponent},
  {path: 'item-create', component: ItemCreateComponent},
  {path: 'account-view', component: AccountViewComponent}
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
