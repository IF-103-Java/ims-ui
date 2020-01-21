import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class RegistrationService {
  constructor(@Inject('BASE_API_URL') private baseUrl: string, private http: HttpClient) {
  }

  public regUser(user: User) {
    return this.http.post(this.baseUrl + '/signup', user);
  }

}
