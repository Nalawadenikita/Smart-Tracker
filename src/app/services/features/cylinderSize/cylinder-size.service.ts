import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { CYLINDER_SIZE } from 'src/app/utils/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CylinderSizeService {

  constructor(private coreAPIService: CoreApiService) { }
 
  getCylinderSize(paginationData?: any) {
    return this.coreAPIService.getForPaginator(CYLINDER_SIZE.CYLINDER_SIZE_LIST, paginationData);
  }

  addCylinderSize(data: any) {
    return this.coreAPIService.post(CYLINDER_SIZE.CYLINDER_SIZE_ADD, data);
  }

  deleteCylinderSize(id:any) {
    return this.coreAPIService.delete(`${CYLINDER_SIZE.CYLINDER_SIZE_DELETE}/${id}`);
  }

  editCylinderSize(data: any, id: any) {
    return this.coreAPIService.put(`${CYLINDER_SIZE.CYLINDER_SIZE_EDIT}/${id}`, data);
  }

}
