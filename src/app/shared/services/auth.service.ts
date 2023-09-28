import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequestDto } from '../payload/registerrequestdto';
import { User } from '../models/user';
import { EditUserProfileDto } from '../payload/edit-user-profile-dto';

const AUTH_API = "http://localhost:8080/api/v1/auth";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  
  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post(AUTH_API + "/login", { username, password }, httpOptions);
  }

  public logout(): Observable<any> {
    return this.httpClient.post(AUTH_API + "/logout", {}, httpOptions);
  }

  public register(registerRequest: RegisterRequestDto): Observable<any> {
    return this.httpClient.post(AUTH_API + "/register", registerRequest, httpOptions);
  }

  public updatePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.httpClient.post(AUTH_API + "/update-password", { currentPassword, newPassword });
  }

  public updateUserProfile(editedUser: EditUserProfileDto): Observable<any> {
    return this.httpClient.put(AUTH_API + "/update-profile", editedUser, httpOptions);
  }
}
