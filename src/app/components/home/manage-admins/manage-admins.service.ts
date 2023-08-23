import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from 'src/app/shared/role';
import { Roles } from 'src/app/shared/roles';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root'
})
export class ManageAdminsService {

  admins$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

  constructor() { 
    this.loadData();
  }

  private loadData(): void {
    this.admins$.next([
      new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, new Role(1, Roles.ADMIN), "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
    ]);
  }
}
