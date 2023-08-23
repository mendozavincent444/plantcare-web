import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { Roles } from './roles';
import { Role } from './role';

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
}
