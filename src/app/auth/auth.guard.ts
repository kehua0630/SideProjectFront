import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { ROUTING_PATH } from '../shared/const/router.const';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  /**
   * @param url
   * @returns
   */
  checkLogin(url: string): boolean {
    if (sessionStorage.getItem('COMMON.TOKEN')) {
      return true;
    }

    // Navigate to the login page with extras
    // this.accountService.logout();
    this.router.navigate([ROUTING_PATH.LOGIN]);
    return false;
  }

}
