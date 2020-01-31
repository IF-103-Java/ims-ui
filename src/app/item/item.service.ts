import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Item} from '../models/item.model';
import {SavedItem} from '../models/savedItem.model';
import {Page} from "../models/page";
import {Observable} from "rxjs";
import {ItemTransactionRequest} from "../models/itemTransactionRequest.model";


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
  public getSavedItemsByItemId(itemId: bigint) {
    return this.http.get<SavedItem[]>(this.baseUrl + '/savedItems/itemId/' + itemId);
  }

  public searchItemsByNameQuery(query: string) {
    return this.http.get<Item[]>(this.baseUrl + '/items/name?q=' + query);
  }
}
