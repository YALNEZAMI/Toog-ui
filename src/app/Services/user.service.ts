import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { vars } from '../env';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  register(user: User): Observable<any> {
    delete user.confirmPassword;
    return this.httpClient.post(vars.apiUri + '/user', user);
  }
  login(user: User): Observable<any> {
    console.log('login');

    return this.httpClient.post(vars.apiUri + '/user/login', user);
  }
}
