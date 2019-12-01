import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthUser} from '../model/auth-user-model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {LocalStorageKey, Api} from '../utils/app-const';
import {map} from 'rxjs/operators';
import {ApiResponse} from './../model/apiResponse-model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  currentUserSubject:BehaviorSubject<AuthUser>;
  http;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthUser>(undefined);
    this.http = http;
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
    return this.http.post(Api.login, userObj, this.httpOptions).pipe(tokenPipe);
  }
}
