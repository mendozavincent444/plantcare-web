import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageAdminsService } from '../manage-admins.service';
import { User } from 'src/app/shared/models/user';

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
    private adminService: ManageAdminsService
  ) {

  }

  ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe((admins: User[]) => {
      this.admins = admins;
    })

  }

  onDetails(adminUsername: string) {
    this.router.navigate([`../admin/${adminUsername}`], { relativeTo: this.route });
  }

  onDeactivateAdmin(admin: User) {
    this.adminService.deactivateAdmin(admin, admin.id).subscribe(data => {
      // fix receive data
      console.log(data);

      this.ngOnInit();
    })
  }

  onReactivateAdmin(admin: User) {
    this.adminService.reactivateAdmin(admin, admin.id).subscribe(data => {
      // fix receive data
      console.log(data);
      this.ngOnInit();
    });
  }

}
