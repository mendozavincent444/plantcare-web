import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/shared/services/api.service';


const ADMIN_ROLE_ID = 2;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ManageAdminsService {

  admins$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(null);

  constructor(private httpClient: HttpClient, private apiService: ApiService) { 
  }
  
  USER_API = this.apiService.getBaseUrl() + "/api/v1/users";

  public getAdminByUsername(adminUsername: string): Observable<any> {
    return this.httpClient.get(this.USER_API + `/admins/${adminUsername}`, httpOptions)
  }
  
  public getAllAdmins(): Observable<any> {
    return this.httpClient.get(this.USER_API + `/roles/${ADMIN_ROLE_ID}`, httpOptions);
  }

  public deactivateAdmin(admin: User, adminId: number): Observable<any> {
    return this.httpClient.put(this.USER_API + `/admins/${adminId}/ban`, admin, httpOptions);
  }

  public reactivateAdmin(admin: User, adminId: number): Observable<any> {
    return this.httpClient.put(this.USER_API + `/admins/${adminId}/reactivate`, admin, httpOptions);
  }

  
}
