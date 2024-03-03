import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { vars } from '../env';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  private user: User | null = null;
  private userCanal = new Subject<User>();

  register(user: User): Observable<any> {
    delete user.confirmPassword; //delete the confirmPassword attribute from the user (not in the model)
    return this.httpClient.post(vars.apiUri + '/user', user);
  }
  login(user: User): Observable<any> {
    return this.httpClient.post(vars.apiUri + '/user/login', user);
  }
  isAvailableName(name: string): Observable<any> {
    return this.httpClient.get(
      vars.apiUri + '/user/isAvailableName?name=' + name
    );
  }
  subscribeToUser(): Observable<User> {
    return this.userCanal.asObservable();
  }
  setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
    return this.userCanal.next(user);
  }
  getUser() {
    if (this.user == null) {
      const str: string = localStorage.getItem('user') as string;
      const localUser = JSON.parse(str) as User;
      this.user = localUser;
    }
    return this.user;
  }
  uploadProfilePhoto(file: File, userId: string) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('userId', userId);
    return this.httpClient.post(vars.apiUri + '/user/uploadProfilePhoto', fd);
  }
  updateUser(user: User) {
    return this.httpClient.put(vars.apiUri + '/user', user);
  }
  searchUserByName(key: string) {
    return this.httpClient.get(vars.apiUri + '/user/searchByName/' + key);
  }
}
