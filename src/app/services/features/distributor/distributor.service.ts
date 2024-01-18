import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { DISTRIBUTOR, IMAGE } from 'src/app/utils/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(private coreAPIService: CoreApiService) { }

  rowData: any = null;

  getDistributor(paginationData?: any) {
    return this.coreAPIService.getForPaginator(DISTRIBUTOR.DISTRIBUTOR_LIST, paginationData);
  }

  addDistributor(data: any) {
    return this.coreAPIService.post(DISTRIBUTOR.DISTRIBUTOR_ADD, data);
  }

  deleteDistributor(id: any) {    
    return this.coreAPIService.delete(`${DISTRIBUTOR.DISTRIBUTOR_DELETE}/${id}`);
  }

  editDistributor(data: any, id: any) {
    return this.coreAPIService.put(`${DISTRIBUTOR.DISTRIBUTOR_EDIT}/${id}`, data);
  }

  getDistributorById(id:any){
    return this.coreAPIService.get(`${DISTRIBUTOR.GET_DISTRIBUTOR_BY_ID}/${id}`);
  }
 getCity(){
  return this.coreAPIService.get(DISTRIBUTOR.GET_CITY);
 }
 postImage(distributorId: any, data:any){
  return this.coreAPIService.post(`${IMAGE.DISTRIBUTOR_IMAGE}/${distributorId}`,data);
 }
}
