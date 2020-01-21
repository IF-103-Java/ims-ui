import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Associate} from "../../models/associate";
import {Item} from "../../models/item.model";
import {Page} from "../../models/page";
import {Event} from "../../models/event";

@Injectable()
export class AssociateService {

  private URL: string = 'http://localhost:8080/associates';

  constructor(private http: HttpClient) { }

  getAssociatePage(page: number, size: number, sort: string): Observable<Page<Associate>> {
    return this.http.get<Page<Associate>>(this.URL + '/?page=' + page + '&size=' + size + '&sort=' + sort);
  }

  public addAssociate(associate: Associate) {
    this.http.post(this.URL + "/", associate).subscribe(data => console.log(data));
  }

  public deleteAssociate(id: number) {
    this.http.delete(this.URL + "/" + id).subscribe();
  }

  public updateAssociate(id:number, associate: Associate) {
    this.http.put(this.URL + "/" + id, associate);
  }

}
