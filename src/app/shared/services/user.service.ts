import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';


const USER_KEY = "auth-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  $currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient, private apiService: ApiService) {   }

  USER_API = this.apiService.getBaseUrl() + "/api/v1/users";

  public fetchUser(): Observable<User> {
    return this.httpClient.get<User>(this.USER_API + "/current-user");
  }

  public clean(): void {
    this.$currentUser.next(null);
    sessionStorage.clear();
  }

  public saveUser(currentUser: User) {
    this.$currentUser.next(currentUser);
    sessionStorage.setItem(USER_KEY, JSON.stringify(currentUser));
  }

  public getUser(): BehaviorSubject<User> {
    return this.$currentUser;
  }

  public autoLogin() {
    const currentUser = JSON.parse(sessionStorage.getItem(USER_KEY));

    if (!currentUser) {
      this.$currentUser.next(null);
    }

    this.$currentUser.next(currentUser);
  }

  public isLoggedIn(): boolean {
    return this.$currentUser.value ? true : false;
  }
}
