import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { OWNER } from 'src/app/utils/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private coreAPIService:CoreApiService) { }
  getOwner(){
    return this.coreAPIService.get(OWNER.OWNER_GET);
  }
}
