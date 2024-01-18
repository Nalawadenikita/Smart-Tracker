import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeactivateLoginGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router) {}
  canActivate()
  {    
    if(this.auth.IsLoggedIn())
    {
      this.router.navigate(['features/dashboard']);
      return false;       
    }
    return true;
  }
  
}
