import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Associate} from "../../models/associate";
import {Page} from "../../models/page";

@Injectable({
  providedIn: 'root'
})
export class AssociateService {

  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  getAssociatePage(page: number, size: number, sort: string): Observable<Page<Associate>> {
    return this.http.get<Page<Associate>>(this.baseUrl + '/associates/?page=' + page + '&size=' + size + '&sort=' + sort);
  }

  public addAssociate(associate: Associate): Observable<ResponseBody> {

    return this.http.post<ResponseBody>(this.baseUrl + "/associates/", associate);
  }

  public deleteAssociate(id: number) {
    return this.http.delete(this.baseUrl + "/associates/" + id);
  }

  public updateAssociate(id: number, associate: Associate) {
    this.http.put(this.baseUrl + "/associates/" + id, associate).subscribe();
  }

  public getAssociate(id: number): Observable<Associate> {
    return this.http.get<Associate>(this.baseUrl + "/associates/" + id);
  }

}

export interface ResponseBody {
  message: string;
}
