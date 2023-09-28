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

  $currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {   }

  public fetchUser(): Observable<User> {
    return this.httpClient.get<User>(USER_API + "/current-user");
  }

  public clean(): void {
    this.$currentUser.next(null);
  }

  public saveUser(currentUser: User) {
    this.$currentUser.next(currentUser);
  }

  public getUser(): BehaviorSubject<User> {
    return this.$currentUser;
  }

  public isLoggedIn(): boolean {
    return this.$currentUser.value ? true : false;
  }
}
