import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ItemTableComponent} from "./item/item-table/item-table.component";


const routes: Routes = [
  {path: 'items', component: ItemTableComponent}
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
