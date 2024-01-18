import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { LOCALSTORAGE_KEYS } from '../utils/app-constants';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeaderInterceptorInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService) {}

  private baseURL = environment.baseURL;
  refreshURL = this.baseURL + "refreshToken";

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let request: any;
    let token = this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN);

    if(token) {
      
    req = req.clone({
      setHeaders: {      
     Authorization: `Bearer ${token}`
       }     
    })
  }

    return next.handle(req);
  }
}
