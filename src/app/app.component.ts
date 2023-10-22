import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { FarmManagementService } from './components/home/farm-management/farm-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private farmService: FarmManagementService
    ) {
  }


  ngOnInit(): void {
    this.userService.autoLogin();
    this.farmService.autoLoadFarm();
  }
}
