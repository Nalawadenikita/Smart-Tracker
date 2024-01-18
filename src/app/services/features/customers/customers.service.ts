import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { CITES, CUSTOMERS, LOCATION } from 'src/app/utils/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private coreApiService: CoreApiService) { }
  rowData: any;

  getCustomers() {
    return this.coreApiService.get(CUSTOMERS.CUSTOMERS_LIST);
  }

  addCustomers(data: any) {
    return this.coreApiService.post(CUSTOMERS.CUSTOMERS_ADD, data);
  }

  deleteCustomers(id: number) {
    return this.coreApiService.delete(`${CUSTOMERS.CUSTOMERS_DELETE}/${id}`);
  }

  editCustomers(data: any, id: number) {
    return this.coreApiService.put(`${CUSTOMERS.CUSTOMERS_EDIT}/${id}`, data);
  }

  getCustomersById(id: number) {
    return this.coreApiService.get(`${CUSTOMERS.CUSTOMERS_BY_ID}/${id}`);
  }

  getCustomersByDistributorId(id: number, paginationData?: any) {
    return this.coreApiService.getForPaginator(`${CUSTOMERS.CUSTOMERS_BY_DISTRIBUTOR_LIST}/${id}`, paginationData);
  }


  deleteCustomersByDistributorId(customerId: number, distributorId: number) {
    return this.coreApiService.delete(`${CUSTOMERS.CUSTOMERS_BY_DISTRIBUTOR_DELETE}/${customerId}/${distributorId}`);
  }

  editCustomersByDistributorId(data: any, id: number) {
    return this.coreApiService.put(`${CUSTOMERS.CUSTOMERS_BY_DISTRIBUTOR_EDIT}/${id}`, data);
  }
  customerCount(distributorID: number ,) {
    return this.coreApiService.get(`${CUSTOMERS.WITH_CUSTOMERS}/${distributorID}`);
  }
  customerAvailable() {
    return this.coreApiService.get(CUSTOMERS.CUSTOMER_BY_AVAILABLE);
  }

  getStates() {
    return this.coreApiService.get(CITES.GET_STATES);
  }

  getCitiesByState(state: any) {
    return this.coreApiService.get(`${CITES.GET_CITIES_BY_STATE}/${state}`);
  }

  addCustomerSite(data:any){
    return this.coreApiService.post(LOCATION.CUSTOMER_SITE_DETAILS,data);
  }


  getSiteByCustomer(id:any){
    return this.coreApiService.get(`${LOCATION.GET_SITE_BY_CUSTOMER}/${id}`);
  }


  

}
