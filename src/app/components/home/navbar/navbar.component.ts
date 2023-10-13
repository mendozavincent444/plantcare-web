import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: User;
  constructor(private userService: UserService) {}


  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.currentUser = user);
  }

  isRoleAdmin(): boolean {
    return this.currentUser.role === "ROLE_ADMIN" ? true : false;
  }

  isRoleSuperAdmin(): boolean {
    return this.currentUser.role === "ROLE_SUPERADMIN" ? true : false;
  }
  
}
