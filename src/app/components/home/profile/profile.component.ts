import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';

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
    
    this.user = this.userService.getUser();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }
}
