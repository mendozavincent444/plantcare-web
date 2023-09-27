import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Farm } from 'src/app/shared/models/farm';
import { Role } from 'src/app/shared/models/role';
import { Roles } from 'src/app/shared/models/roles';
import { User } from 'src/app/shared/models/user';


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
    const user: User = new User(1, "Admin", "roger.feder54", "federroger444@gmail.com", "Roger", "Federer");

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
