import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../storage/storage.service';
import { LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES } from 'src/app/utils/app-constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router,
    private storageService: StorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(route.data['requiredRole'].includes(JSON.parse(atob(this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN).split('.')[1]))['USER_TYPE'])) {
      return true;
    } else {
      this.router.navigate(['unauthorized']);
      return false;
    }

  }
  
}
