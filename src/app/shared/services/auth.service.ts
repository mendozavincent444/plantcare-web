import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequestDto } from '../payload/registerrequestdto';
import { EditUserProfileDto } from '../payload/edit-user-profile-dto';
import { ForgotPasswordRequestDto } from '../payload/forgot-password-request-dto';
import { ApiService } from './api.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpUploadOptions = {
  headers: new HttpHeaders({ "Content-Type": "multipart/form-data" })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private apiService: ApiService) { }

  AUTH_API = this.apiService.getBaseUrl() + "/api/v1/auth";
  
  public login(username: string, password: string): Observable<any> {
    return this.httpClient.post(this.AUTH_API + "/login", { username, password }, httpOptions);
  }

  public logout(): Observable<any> {
    return this.httpClient.post(this.AUTH_API + "/logout", {}, httpOptions);
  }

  public forgotPasswordRequest(forgotPasswordRequestDto: ForgotPasswordRequestDto): Observable<any> {
    return this.httpClient.post(this.AUTH_API + "/forgot-password", forgotPasswordRequestDto, httpOptions)
  }

  public register(registerRequest: RegisterRequestDto): Observable<any> {
    return this.httpClient.post(this.AUTH_API + "/register", registerRequest, httpOptions);
  }

  public updatePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.httpClient.post(this.AUTH_API + "/update-password", { currentPassword, newPassword });
  }

  public confirmPasswordRequest(token: string, forgotPasswordRequestDto: ForgotPasswordRequestDto) {
    return this.httpClient.post(this.AUTH_API + `/confirm-request?token=${token}`, forgotPasswordRequestDto, httpOptions);
  }

  public updateUserProfile(editedUser: EditUserProfileDto): Observable<any> {
    return this.httpClient.put(this.AUTH_API + "/update-profile", editedUser, httpOptions);
  }

  public registerFarmersBulk(farmId: number, file: FormData): Observable<any> {
    return this.httpClient.post(this.AUTH_API + `/farm/${farmId}/farmers/bulk-register`, file);
  }




}
