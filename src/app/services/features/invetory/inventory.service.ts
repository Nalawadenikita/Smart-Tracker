import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { INVENTORY } from 'src/app/utils/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  loggedInDistributorId: any;

  CylinderHistoryData: [];

  constructor(private coreAPIService:CoreApiService) { }
  rowData:any=null;
  getInventory() {
    return this.coreAPIService.get(INVENTORY.INVENTORY_LIST);
  }

  addInventory(data: any) {
    return this.coreAPIService.post(INVENTORY.INVENTORY_ADD, data);
  }

  deleteInventory(id:any) {
    return this.coreAPIService.delete(`${INVENTORY.INVENTORY_DELETE}/${id}`);
  }
  editInventory(data: any, id: any) {
    return this.coreAPIService.put(`${INVENTORY.INVENTORY_EDIT}/${id}`, data);
  }

  getInventoryInfo(data: any) {
    return this.coreAPIService.get(INVENTORY.INVENTORY_GET_INFO, data);
  }

  getCylinderById(id:any){
    return this.coreAPIService.get(`${INVENTORY.GET_INVENTORY_BY_ID}/${id}`)
  }

  countGasType(distributorId?: any){
    if(distributorId) {
      return this.coreAPIService.get(`${INVENTORY.COUNT_GASTYPE_BY_ID}/${distributorId}`);
    } else {
      return this.coreAPIService.get(`${INVENTORY.COUNT_GASTYPE_BY_ID}`)
    }
  }

  countCylinderSize(distributorId?: any){
    if(distributorId) {
      return this.coreAPIService.get(`${INVENTORY.COUNTCYLINDER_BY_ID}/${distributorId}`);
    } else {
      return this.coreAPIService.get(`${INVENTORY.COUNTCYLINDER_BY_ID}`)
    }
  }

  updateCylinderStatus(cylinderId: any, filled: any, data: any) {
    return this.coreAPIService.put(`${INVENTORY.UPDATE_CYLINDER_STATUS}/${cylinderId}?isFilled=${filled}`, data)
  }

  getCylinderHistory(cylinderId: any) {
    return this.coreAPIService.get(`${INVENTORY.GET_CYLINDER_HOSTORY}/${cylinderId}`);
  }

}
