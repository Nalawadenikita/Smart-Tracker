import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { LOCALSTORAGE_KEYS } from 'src/app/utils/app-constants';
import { CoreApiService } from '../api/core-api.service';
import { AUTH } from 'src/app/utils/api-endpoints';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storageService: StorageService,
    private coreAPIService: CoreApiService) { }

  getLogin(data: any) {
    return this.coreAPIService.post(AUTH.LOGIN, data);
  }

  IsLoggedIn() {
    return this.storageService.get(LOCALSTORAGE_KEYS.ACCESS_TOKEN);
  }

  resetPassword(data: any) {
    return this.coreAPIService.put(AUTH.RESET_PASS, data);
  }
}
