import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user';
import { ManageFarmersService } from '../manage-farmers.service';

@Component({
  selector: 'app-farmer-list',
  templateUrl: './farmer-list.component.html',
  styleUrls: ['./farmer-list.component.css']
})
export class FarmerListComponent {

  farmers!: User[];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private manageFarmersService: ManageFarmersService
  ) {

  }


  ngOnInit(): void {
    this.manageFarmersService.farmers$.subscribe((farmers) => {
      this.farmers = farmers;
    })
  }

  onDetails(farmerName: string) {
    this.router.navigate([`../farmer/${farmerName}`], { relativeTo: this.route });
  }
}
