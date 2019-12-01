import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userType: string = 'Admin'
  router;
  constructor(router: Router){
    this.router = router;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if(this.userType !== next.data.roleType) {
      // this.router.navigate(['/405'])
      return true;
    }
    // this.router.navigate(['/'])
    return false;
  }

}
