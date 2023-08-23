import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Farm } from 'src/app/shared/farm';
import { Role } from 'src/app/shared/role';
import { Roles } from 'src/app/shared/roles';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class FarmManagementService {

  farms$: BehaviorSubject<Farm[]> = new BehaviorSubject<Farm[]>(null);;

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    let users!: User[];
    const user: User = new User(1, new Role(1, Roles.ADMIN), "roger.feder54", "federroger444@gmail.com", "Roger", "Federer");

    this.farms$.next([
      new Farm(1, "California, USA", "AquaGrove Growers", users, user),
      new Farm(1, "California, USA", "AquaGrove Growers", users, user),
      new Farm(1, "California, USA", "AquaGrove Growers", users, user),
      new Farm(1, "California, USA", "AquaGrove Growers", users, user),
      new Farm(1, "California, USA", "AquaGrove Growers", users, user),
      new Farm(1, "California, USA", "AquaGrove Growers", users, user),
      new Farm(1, "California, USA", "AquaGrove Growers", users, user),
      new Farm(1, "California, USA", "AquaGrove Growers", users, user),
      new Farm(1, "California, USA", "AquaGrove Growers", users, user),
    ]);
  }




}
