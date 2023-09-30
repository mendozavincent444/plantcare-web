import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

const USER_API = "http://localhost:8080/api/v1/users"
const ADMIN_ROLE_ID = 2;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ManageAdminsService {

  admins$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

  constructor(private httpClient: HttpClient) { 
  }
  
  public getAdminByUsername(adminUsername: string): Observable<any> {
    return this.httpClient.get(USER_API + `/admins/${adminUsername}`, httpOptions)
  }
  
  public getAllAdmins(): Observable<any> {
    return this.httpClient.get(USER_API + `/roles/${ADMIN_ROLE_ID}`, httpOptions);
  }

  public banAdmin(admin: User, adminId: number): Observable<any> {
    return this.httpClient.put(USER_API + `/admins/${adminId}/ban`, admin, httpOptions);
  }

  
}
