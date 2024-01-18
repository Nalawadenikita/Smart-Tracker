import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { GAS_TYPE } from 'src/app/utils/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class GasTypeService {

  constructor(private coreAPIService:CoreApiService) { }

getGasType(paginationData?: any){
  return this.coreAPIService.getForPaginator(GAS_TYPE.GAS_TYPE_LIST, paginationData);
}
addGastype(data:any){
  return this.coreAPIService.post(GAS_TYPE.GAS_TYPE_ADD,data);
}
deleteGasType(id:any){
  return this.coreAPIService.delete(`${GAS_TYPE.GAS_TYPE_DELETE}/${id}`);
}
editGasType(data:any, id:any){
  return this.coreAPIService.put(`${GAS_TYPE.GAS_TYPE_EDIT}/${id}`, data);
}


}
