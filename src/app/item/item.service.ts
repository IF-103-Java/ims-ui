import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Item} from '../models/item.model';
import {SavedItem} from '../models/savedItem.model';
import {Page} from "../models/page";
import {Observable} from "rxjs";
import {ItemTransactionRequest} from "../models/itemTransactionRequest.model";
import {AssociateType} from "../models/associate-type.enum";
import {SavedItemAssociateModel} from "../models/savedItemAssociate.model";
import {UsefulWarehouseModel} from "../models/usefulWarehouse.model";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public findSortedAndPaginatedItems(page: number, size: number, sort: string, direction: string) {
    return this.http.get<Page<Item>>(this.baseUrl + '/items?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  public addItem(item: Item): Observable<Item> {
   return this.http.post<Item>(this.baseUrl + '/items', item);
  }
  public addSavedItem(itemTransactionRequest: ItemTransactionRequest): Observable<SavedItem> {
    return this.http.post<SavedItem>(this.baseUrl + '/savedItems', itemTransactionRequest);
  }
  public getSavedItemsByItemId(itemId: number) {
    return this.http.get<Array<SavedItem>>(this.baseUrl + '/savedItems/itemId/' + itemId);
  }
  public getSavedItemsById(itemId: number) {
    return this.http.get<SavedItem>(this.baseUrl + '/savedItems/' + itemId);
  }
   public getItemById(itemId: number): Observable<Item> {
     return this.http.get<Item>(this.baseUrl + '/items/' + itemId);
   }
  public deleteItem(itemId: number): Observable<boolean> {
     return this.http.delete<boolean>(this.baseUrl + '/items/' + itemId);
  }
  public updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(this.baseUrl + '/items', item);
  }
  public moveSavedItem(item: ItemTransactionRequest): Observable<SavedItem> {
    return this.http.put<SavedItem>(this.baseUrl + '/savedItems/move', item);
  }
  public outSavedItem(item: ItemTransactionRequest): Observable<SavedItem> {
    return this.http.put<SavedItem>(this.baseUrl + '/savedItems/outcome', item);
  }
  public searchItemsByNameQuery(query: string) {
    return this.http.get<Item[]>(this.baseUrl + '/items/name?q=' + query);
  }
  public findClientByName(): Observable<SavedItemAssociateModel[]> {
    return this.http.get<SavedItemAssociateModel[]>(this.baseUrl + '/associates?type=CLIENT');
  }
  public findSuppliersByName(): Observable<SavedItemAssociateModel[]> {
    return this.http.get<SavedItemAssociateModel[]>(this.baseUrl + '/associates?type=SUPPLIER');
  }
  public findUsefulWarehouses(capacity: number) {
    return this.http.get<UsefulWarehouseModel[]>(this.baseUrl + '/savedItems/usefulWarehouses/' + capacity);
  }
}
