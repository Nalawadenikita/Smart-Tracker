import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { CYLINDER_MASTER, LOCATION, TRANSACTIONS } from 'src/app/utils/api-endpoints';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  
  
  get: any;
  // rowData:any;
  selectedItems: any[] = [];
  rowData:any=null;
  transactionDetails = [];

  constructor(private coreApiService: CoreApiService) { }

  getCylinderId(data: any) {
    return this.coreApiService.get(CYLINDER_MASTER.CYLINDER_MASTER_LIST, data);
  }

  getTransactionType() {
    return this.coreApiService.get(TRANSACTIONS.TRANSACTION_TYPE);
  }

  getTransactionDetails() {
    return this.coreApiService.get(TRANSACTIONS.TRANSACTION_DETAILS);
  }

  addTransactionDetails(data: any) {
    return this.coreApiService.post(TRANSACTIONS.TRANSACTION_ADD, data)
  }

  getTransactionDetailsForRefiller(data:any,paginationData:any) {
    return this.coreApiService.transactionAddSearch(`${TRANSACTIONS.TRANSACTION_DETAILS_FOR_REFILLER}/${data['distributorId']}`,data,paginationData);
  }

  getRefillerToDistributor(data: any, refillerId: number | string,paginationData:any) {
    return this.coreApiService.transactionAddSearch(`${TRANSACTIONS.REFILLER_TO_DISTRIBUTOR}/${data['distributorId']}?RefillerId=${refillerId}`,data,paginationData)
  }
  updateTransaction(id:any,data:any){
    return this.coreApiService.put(`${TRANSACTIONS.EDIT_TRANS_DATE}/${id}`,data);

  }

  addTransactionDetailsForRefiller(data: any) {
    return this.coreApiService.post(TRANSACTIONS.TRANSACTION_ADD_FOR_REFILLER, data)
  }

  getTransactionByDistributorId(id: number, paginationData?: any) {
    return this.coreApiService.getForPaginator(`${TRANSACTIONS.TRANSACTION_DETAILS}/${id}`, paginationData);
  }

  getAvailableCylinders(distributorId: any, paginationData?: any) {
    return this.coreApiService.getForPaginator(`${TRANSACTIONS.AVAILABLE_CYLINDERS_INVENTORY}/${distributorId}`, paginationData)
  }

  getAvailableCylindersDCR(data: any,paginationData:any) {
    return this.coreApiService.transactionAddSearch(`${TRANSACTIONS.AVAILABLE_CYLINDERS_DCR}/${data['distributorId']}`,data,paginationData)
  }

  getAvailableCylindersECR(data: any, customerId: any,paginationData:any) {
    return this.coreApiService.transactionAddSearch(`${TRANSACTIONS.AVAILABLE_CYLINDERS_ECR}/${data['distributorId']}?customerId=${customerId}`,data,paginationData)
  }

  availableCylinder(){
    return this.coreApiService.get(`${TRANSACTIONS.AVAILABLE_CYLINDER}`)
  }
  filledCylinder(){
    return this.coreApiService.get(`${TRANSACTIONS.TRANSACTIONS_FILLED_CYLINDER}`)
  }
  emptyCylinder(){
    return this.coreApiService.get(`${TRANSACTIONS.TRANSACTIONS_EMPTY_CYLINDER}`) 
  }

  getCylindersByFilter(distributorId: any, cylinderId?: any, gasId?: any) {
    
    let params = new HttpParams();
    
    if (cylinderId) {
      params = params.append("cylinderSizeId", cylinderId);
    }  if (gasId) {
      params = params.append("gasTypeId", gasId);
    }
    return this.coreApiService.get1(`${TRANSACTIONS.TRANSACTION_ADD_FILTERS}/${distributorId}`,params);


    // if(cylinderId && gasId) {
    //   return this.coreApiService.get(`${TRANSACTIONS.TRANSACTION_ADD_FILTERS}/${distributorId}?cylinderSizeId=${cylinderId}&gasTypeId=${gasId}`);
    // } else if(cylinderId) {
    //   return this.coreApiService.get(`${TRANSACTIONS.TRANSACTION_ADD_FILTERS}/${distributorId}?cylinderSizeId=${cylinderId}`);
    // } else if(gasId) {
    //   return this.coreApiService.get(`${TRANSACTIONS.TRANSACTION_ADD_FILTERS}/${distributorId}?gasTypeId=${gasId}`);
    // } else {
    //   return this.coreApiService.get(`${TRANSACTIONS.TRANSACTION_ADD_FILTERS}/${distributorId}`);
    // }


  }

  getTransactionReport(distributorId: any, TransactionID: any) {
    return this.coreApiService.get(`${TRANSACTIONS.TRANSACTIONS_DCR_REPORTS}?distributorId=${distributorId}&transactionDetailsId=${TransactionID}`)
  }
 
  availableCylinderByDistributer(distributorId: any){
    return this.coreApiService.get(`${TRANSACTIONS.AVAILABLE_CYLINDER_BYDISTRIBUTOR}/${distributorId}?distributorId=${distributorId}`)
  }
  empty_Cylinder_ByDistributor(distributorId: any){
    return this.coreApiService.get(`${TRANSACTIONS.TRANSACTION_EMPTY_CYLINDER_BY_DISTRIBUTOR}/${distributorId}?distributorId=${distributorId}`)
  }
  filled_Cylinder_ByDistributor(distributorId: any){
    return this.coreApiService.get(`${TRANSACTIONS.TRANSACTIONS_FILLED_CYLINDER_BY_DISTRIBUTOR}/${distributorId}?distributorId=${distributorId}`)
  }

  filled_cylinder_in_godown(distributorId:any){
    return this.coreApiService.get(`${TRANSACTIONS.GET_FILLED_CYLINDERS_IN_GODOWN}/${distributorId}?distributorId=${distributorId}`)

  }

  getCustomerLocationByCustomer(customerId: any) {
    return this.coreApiService.get(`${LOCATION.CUSTOMER_LOCATION_BY_CUSTOMER}/${customerId}`)
  }

  transactionListSearch(data: any, paginationData?: any) {
    return this.coreApiService.transactionListSearch(`${TRANSACTIONS.TRANSACTIONS_LIST_SEARCH}`, data, paginationData)
  }
  

}

