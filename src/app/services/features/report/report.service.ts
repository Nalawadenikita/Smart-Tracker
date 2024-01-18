import { Injectable } from '@angular/core';
import { CoreApiService } from '../../api/core-api.service';
import { TRANSACTIONS } from 'src/app/utils/api-endpoints';
import { HttpParams } from '@angular/common/http';
import { IMAGE } from 'src/app/utils/api-endpoints';
import {REPORT} from 'src/app/utils/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private coreApiService: CoreApiService) { }

  getReports(distributorId: any, paginationData?: any) {
    return this.coreApiService.getForPaginator(`${TRANSACTIONS.TRANSACTION_REPORTS}/${distributorId}`, paginationData);
  }
  byCustomerReport(Id: any, customerId?: any, paginationData?: any, day?: number) {
    return this.coreApiService.byCustomerReport(`${TRANSACTIONS.TRANSACTIONS_BYCUSTOMER_REPORT}/${Id}`, customerId, paginationData, day);
  }

  billingReport(distributorId: any, customerId?: any, gasType?: any, cylinderSize?: any) {
    return this.coreApiService.get(`${TRANSACTIONS.BILLING_REPORT}/${distributorId}?customerId=${customerId}&cylinderSizeId=${cylinderSize}&gasTypeId=${gasType}`)
  }

  getDailySalesReport(Id:any,paginationData?:any,date?:any){
    return this.coreApiService.getDailySalesReport(`${REPORT.GET_DAILYSALES_REPORTS}/${Id}`,paginationData,date)
  }



  

  billingReportAll(distributorId: any, customerId?: any, gasId?: any, cylinderSizeId?: any, startDate?:any,endDate?:any, paginationData?: any,) {

    let params = new HttpParams();

    if (customerId) {
      params = params.append("customerId", customerId);
    }
    if (gasId) {
      params = params.append("gasTypeId", gasId);
    }
    if (cylinderSizeId) {
      params = params.append("cylinderSizeId", cylinderSizeId);
    }
    if(startDate){
      params=params.append("startDate",startDate);
    }
    if(endDate){
      params=params.append("endDate",endDate);
    }
    if (paginationData) {
      const { page, pageSize } = paginationData;

      params = params.append("page", page);
      params = params.append("pageSize", pageSize);

    }


    return this.coreApiService.get1(`${TRANSACTIONS.BILLING_REPORT}/${distributorId}`, params);
  }

  billingReportByCustomer(distributorId: any, customerId: any) {
    return this.coreApiService.get(`${TRANSACTIONS.BILLING_REPORT}/${distributorId}?customerId=${customerId}`)
  }

  billingReportByCylinder(distributorId: any, cylinderSize: any) {
    return this.coreApiService.get(`${TRANSACTIONS.BILLING_REPORT}/${distributorId}?cylinderSizeId=${cylinderSize}`)
  }

  billingReportByGas(distributorId: any, gasType: any) {
    return this.coreApiService.get(`${TRANSACTIONS.BILLING_REPORT}/${distributorId}?gasTypeId=${gasType}`)
  }

  billingReportByCyAndGas(distributorId: any, cylinderSize: any, gasType: any) {
    return this.coreApiService.get(`${TRANSACTIONS.BILLING_REPORT}/${distributorId}?cylinderSizeId=${cylinderSize}&gasTypeId=${gasType}`)
  }

  getImageBydistributor(distributorId: any) {
    return this.coreApiService.get(`${IMAGE.GET_IMAGE}/${distributorId}`);
  }

  getNewCustomerHolding(distributorId:any,paginationData:any){
    let params = new HttpParams();

    if (paginationData) {
     

      const { page, pageSize } = paginationData;

      params = params.append("page", page);
      params = params.append("pageSize", pageSize);

    }
    return this.coreApiService.get1(`${REPORT.CUSTOMER_HOLDING_REPORT}/${distributorId}`,params);
  }

  getCustomerHoldingByCustomer(distributorId:any,CustomerId:any,paginationData:any){
    let params = new HttpParams();

    if (paginationData) {
     

      const { page, pageSize } = paginationData;

      params = params.append("page", page);
      params = params.append("pageSize", pageSize);

    }
    return this.coreApiService.get1(`${REPORT.CUSTOMER_HOLDING_FILTER_BY_CUSTOMER}/${distributorId}/${CustomerId}`,params);
  }


  

  searchFilterForDelivery(data:any,paginationData?:any){
    return this.coreApiService.searchFilter(`${REPORT.SEARCH_BY_POST}`,data,paginationData)

  }


}
