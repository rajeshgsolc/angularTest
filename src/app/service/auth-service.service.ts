import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthUser} from '../model/auth-user-model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageKey, Api} from '../utils/app-const';
import {map} from 'rxjs/operators';
import {ApiResponse} from './../model/apiResponse-model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  currentUserSubject:BehaviorSubject<AuthUser>;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(undefined);
  }

  public get currentUserValue(): AuthUser {
    return this.currentUserSubject.value;
  }

  login(obj: AuthUser) {
    const userObj = {
      email: obj.email,
      password: obj.password
    }
    const tokenPipe = map<any, ApiResponse<AuthUser>>(apiResponse => {
      if(apiResponse.co) {
        return apiResponse;
      }
      if(apiResponse.data && apiResponse.data.token) {
        this.currentUserSubject.next(apiResponse.data);
      }
      return apiResponse;
    })
    return this.http.post<ApiResponse<AuthUser>>(Api.login, userObj, this.httpOptions).pipe(tokenPipe);
  }
  logout() {
    localStorage.removeItem(LocalStorageKey.authUser);
    // localStorage.removeItem(LocalStorageKey.projectSections);
    // localStorage.removeItem(LocalStorageKey.selectedProject);
    // localStorage.removeItem(LocalStorageKey.userProfile);
    // localStorage.removeItem(LocalStorageKey.userPlan);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }
}
