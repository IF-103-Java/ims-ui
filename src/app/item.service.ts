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
  private getAllItemsURL = 'http://localhost:8080/items/getAllItems';
  private addItemURL = 'http://localhost:8080/items/addItem';
  private addSavedItemURL = 'http://localhost:8080/items/addSavedItem';
  private getItemsByParamURL = 'http://localhost:8080/items/getItemsByParam';
  private getUsefullWarehousesURL = 'http://localhost:8080/items/getUsefullWarehouses';
  private getItemByIdURL = 'http://localhost:8080/items/getItemById';
  private getSavedItemByItemDtoURL = 'http://localhost:8080/items/getSavedItemByItemDto';
  private getSavedItemByIdURL = 'http://localhost:8080/items/getSavedItemById';
  private moveItemURL = 'http://localhost:8080/items/moveItem';
  private outcomeItemURL = 'http://localhost:8080/items/outcomeItem';
  private softDeleteItemURL = 'http://localhost:8080/items/softDeleteItem';

  constructor(private http: HttpClient) { }
  public addItem(item: Item) {
    return this.http.post<Item>(this.addItemURL, item);
  }
  public addSavedItem() {
    return this.http.get<Item[]>(this.addSavedItemURL);
  }
  public findItemsById() {
    return this.http.get<Item[]>(this.getItemByIdURL);
  }
  public findAllItems() {
    return this.http.get<Item[]>(this.getAllItemsURL);
  }
  public findItemsByParam() {
    return this.http.get<Item[]>(this.getItemsByParamURL);
  }
  public findUsefullWarehouses(savedItem: SavedItem) {
    console.log(JSON.stringify(savedItem));
    const param = new HttpParams().set('savedItem', JSON.stringify(savedItem));
    return this.http.get<Item[]>(this.getUsefullWarehousesURL, {params: param}  );
  }
  public findSavedItemByItem(item: Item) {
    console.log(JSON.stringify(item));
    console.log('item.itemToString()');
    const test = item.itemToString();
    const param = new HttpParams().set('itemDto', test);
    return this.http.get<SavedItem>(this.getSavedItemByItemDtoURL, {headers: httpOptions.headers, params: param });
  }
  public findSavedItemById() {
    return this.http.get<Item[]>(this.getSavedItemByIdURL);
  }
  public moveItem(warehouse: Warehouse, savedItem: SavedItem) {

    return this.http.put<Item[]>(this.moveItemURL, {warehouse, savedItem});
  }
  public outcomeItem(savedItem: SavedItem, quantity: number) {
    return this.http.put<Item[]>(this.outcomeItemURL, {savedItem, quantity});
  }
  public softDeleteItem(item: Item) {
    return this.http.put<Item[]>(this.softDeleteItemURL, item);
  }


}
