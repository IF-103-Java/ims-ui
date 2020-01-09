import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import {HttpClientModule} from '@angular/common/http';
import {ItemService} from './item/item.service';
import {ItemCreateComponent} from './item/item-create/item-create.component';
import {ItemTableComponent} from './item/item-table/item-table.component';
import {ItemSortableDirective} from './item/item-sortable.directive';
import {EventComponent} from './event/event.component';
import {EventService} from './event/service/event.service';


@NgModule({
  declarations: [
    AppComponent,
    ItemCreateComponent,
    ItemTableComponent,
    ItemSortableDirective,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ItemService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
