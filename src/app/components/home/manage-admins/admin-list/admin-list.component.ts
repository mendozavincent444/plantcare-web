import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/shared/roles';
import { User } from 'src/app/shared/user';
import { ManageAdminsService } from '../manage-admins.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {

  admins!: User[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ManageAdminsService: ManageAdminsService
  ) {

  }


  ngOnInit(): void {
    this.ManageAdminsService.admins$.subscribe((admins) => {
      this.admins = admins;
    })
  }

  onDetails(adminUsername: string) {
    this.router.navigate([`../admin/${adminUsername}`], { relativeTo: this.route });
  }

}
