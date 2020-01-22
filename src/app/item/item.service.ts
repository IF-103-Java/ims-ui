import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Item} from '../models/item.model';
import {SavedItem} from '../models/savedItem.model';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ItemService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public findSortedAndPaginatedItems(page: number, size: number, sort: string, direction: string) {
    return this.http.get<Item[]>(this.baseUrl + '/items?page=' + page + '&size=' + size + '&sort=' + sort + '&direction=' + direction + '');
  }

  public addItem(item: Item) {
    this.http.post(this.baseUrl + '/items', item);
  }

  public getSavedItemsByItemId(itemId: bigint) {
    return this.http.get<SavedItem[]>(this.baseUrl + '/savedItems/itemId/' + itemId);
  }
}
