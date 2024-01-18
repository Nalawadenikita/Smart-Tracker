import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LOCALSTORAGE_KEYS, LOCALSTORAGE_VALUES } from 'src/app/utils/app-constants';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router,
    private storageService: StorageService) { }
  canActivate() {
    if (!(!this.auth.IsLoggedIn())) {
      return true;
    }

    this.router.navigate(['auth/login']);
    return false;


    // if(this.storageService.get(LOCALSTORAGE_KEYS.USER_TYPE) === LOCALSTORAGE_VALUES.DISTRIBUTOR){
    //   this.router.navigate(['auth/distributor-login']);
    //   return false;
    // } else{
    //   this.router.navigate(['auth/login']);
    //   return false;
    // }
  }

}
