import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthServiceService} from './auth-service.service'
import {AuthUser} from '../model/auth-user-model';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthServiceService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const authUser: AuthUser = this.authenticationService.currentUserValue;
    console.log('------')
    console.log(authUser)
    console.log('------')
    if (authUser && authUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${authUser.type} ${authUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
