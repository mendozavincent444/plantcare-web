import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Roles } from '../models/roles';
import { Role } from '../models/role';

const USER_KEY = "auth-user";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor() { 
    this.loadData();
  }

  loadData() {
    this.user$.next(new User(
      1, 
      new Role(1, Roles.ADMIN), 
      "vincent12345",
      "mendozavincent444@gmail.com",
      "Vincent Gabriel",
      "Mendoza"));
  }

  public clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return true;
    }

    return false;
  }
}
