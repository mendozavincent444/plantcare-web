import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FarmManagementService } from './farm-management/farm-management.service';
import { Farm } from 'src/app/shared/models/farm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  farm: Farm;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private farmService: FarmManagementService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.userService.getUser().subscribe(user => this.user = user);

    this.farmService.getCurrentFarm().subscribe(farm => this.farm = farm);
  }

  onLogout() {
    this.authService.logout();
    this.userService.clean();

    this.router.navigate(["/login"])
  }
}
