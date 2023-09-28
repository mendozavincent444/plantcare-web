import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

const USER_API = "http://localhost:8080/api/v1/users";
const USER_KEY = "auth-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) {   }

  public fetchUser(): Observable<User> {
    return this.httpClient.get<User>(USER_API + "/current-user");
  }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(currentUser: User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(currentUser));
  }

  public getUser(): User {
    const currentUser = window.sessionStorage.getItem(USER_KEY);

    if (currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const currentUser = window.sessionStorage.getItem(USER_KEY);
    return currentUser ? true : false;
  }
}
