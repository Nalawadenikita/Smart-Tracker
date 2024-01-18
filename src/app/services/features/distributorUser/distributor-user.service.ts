import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { DISTRIBUTOR_USER } from 'src/app/utils/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class DistributorUserService {

  constructor(private coreAPIService:CoreApiService) { }
  rowData:any;
  getDistributerUser(id: any, paginationData?: any){
    return this.coreAPIService.getForPaginator(`${DISTRIBUTOR_USER.DISTRIBUTOR_USER_LIST}/${id}`, paginationData);
  }
  
  addDistributerUser(data:any, id: any){
    return this.coreAPIService.post(`${DISTRIBUTOR_USER.DISTRIBUTOR_USER_ADD}/${id}`, data);
  }

  editDistributorUser(data:any,id:number){
    return this.coreAPIService.put(`${DISTRIBUTOR_USER.DISTRIBUTOR_USER_EDIT}/${id}`,data);
  }
  
  deleteDistributerUser(id:any){
    return this.coreAPIService.delete(`${DISTRIBUTOR_USER.DISTRIBUTOR_USER_DELETE}/${id}`);
  }

  getDistributorUserById(id: number) {
    return this.coreAPIService.get(`${DISTRIBUTOR_USER.DISTRIBUTOR_USER_BY_ID}/${id}`);
  }
}
