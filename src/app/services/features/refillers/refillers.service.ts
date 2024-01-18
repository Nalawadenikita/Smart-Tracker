import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { REFILLERS } from 'src/app/utils/api-endpoints';
@Injectable({
  providedIn: 'root'
})
export class RefillersService {

  constructor(private coreApiService: CoreApiService) { }


  rowData:any;

  getRefillers() {
    return this.coreApiService.get(REFILLERS.REFILLERS_LIST);
  }
   
  addRefillers(data: any) {
    return this.coreApiService.post(REFILLERS.REFILLERS_ADD, data);
  }

  getRefillersByDistributorId(id: number, paginationData?: any) {
    return this.coreApiService.getForPaginator(`${REFILLERS.REFILLERS_BY_DISTRIBUTOR_LIST}/${id}`, paginationData);
  }

  deleteRefiller(id: number) {
    return this.coreApiService.delete(`${REFILLERS.REFILLERS_DELETE}/${id}`);
  }

  editRefiller(data: any, id: number) {
    return this.coreApiService.put(`${REFILLERS.REFILLERS_EDIT}/${id}`, data);
  }

 withRefiller(distributorID:number){
  return this.coreApiService.get(`${REFILLERS.WITH_REFILLERS}/${distributorID}`);
 
 }
}
