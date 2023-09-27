import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from 'src/app/shared/models/role';
import { Roles } from 'src/app/shared/models/roles';
import { User } from 'src/app/shared/models/user';


@Injectable({
  providedIn: 'root'
})
export class ManageFarmersService {

  farmers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

  constructor() {
    this.loadData();
  }


  private loadData(): void {

    this.farmers$.next([
      new User(1, "Admin", "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, "Admin", "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, "Admin", "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, "Admin", "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, "Admin", "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, "Admin", "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, "Admin", "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
      new User(1, "Admin", "roger.feder54","federroger444@gmail.com", "Roger", "Federer"),
    ]);

  }
}
