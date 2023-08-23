import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {}

  ngOnInit () {
    this.userService.user$.subscribe((user) => this.user = user);
  }
}
