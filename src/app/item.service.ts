import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Item } from './models/item.model';
import {Warehouse} from './models/warehouse.model';
import {SavedItem} from './models/savedItem.model';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ItemService {
constructor(private http: HttpClient) { }

  public findSortedAndPaginatedItem(page: number, size: number, sort: string, direction: string) {
    return this.http.get<Item[]>('http://localhost:8080/items?page='+page+'&size='+size+'&sort='+sort+'&direction='+direction+'');
  }
  public addItem(item: Item){
  this.http.post('http://localhost:8080/items', item);
  }




}

