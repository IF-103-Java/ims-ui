import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models/user.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class RegistrationService {
  constructor(private http: HttpClient) {
  }

  public regUser(user: User) {
    return this.http.post('http://localhost:8080/signup', user);
  }


}
