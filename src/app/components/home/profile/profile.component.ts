import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!: User;

  editMode!: boolean;

  constructor(private userService: UserService) {
    
  }

  ngOnInit(): void {
    this.editMode = false;

    this.userService.user$.subscribe((user) => this.user = user);
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
}
