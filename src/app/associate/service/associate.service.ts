import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Associate} from "../../models/associate";
import {Page} from "../../models/page";

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) { }

  getAssociatePage(page: number, size: number, sort: string): Observable<Page<Associate>> {
    return this.http.get<Page<Associate>>(this.baseUrl + '/associates/?page=' + page + '&size=' + size + '&sort=' + sort);
  }

  public addAssociate(associate: Associate) {
    this.http.post(this.baseUrl + "/associates/", associate).subscribe(data => console.log(data));
  }

  public deleteAssociate(id: number) {
    this.http.delete(this.baseUrl + "/associates/" + id).subscribe();
  }

  public updateAssociate(id:number, associate: Associate) {
    this.http.put(this.baseUrl + "/associates/" + id, associate);
  }

}
