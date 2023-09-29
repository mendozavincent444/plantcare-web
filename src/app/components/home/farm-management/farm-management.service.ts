import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Farm } from 'src/app/shared/models/farm';
import { Role } from 'src/app/shared/models/role';
import { Roles } from 'src/app/shared/models/roles';
import { User } from 'src/app/shared/models/user';

const FARM_API = "http://localhost:8080/api/v1/farms";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FarmManagementService {

  farms$: BehaviorSubject<Farm[]> = new BehaviorSubject<Farm[]>(null);;

  constructor(private httpClient: HttpClient) {
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

  public addFarm(name: string, location: string): Observable<any> {
    return this.httpClient.post(FARM_API, { name, location }, httpOptions);
  }




}
