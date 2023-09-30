import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { ManageAdminsService } from '../manage-admins.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {

  adminUsername: string;
  admin: User;

  constructor(
    private adminService: ManageAdminsService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    const adminUsername = this.route.snapshot.params["admin-username"];

    this.adminService.getAdminByUsername(adminUsername).subscribe(data => {
      this.admin = data;
    });
  }

}
