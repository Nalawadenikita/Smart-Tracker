import {Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreApiService {

  private baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  public get(contextPath: string, data?:any): Observable<any> {
    let httpParams = new HttpParams;
    if(data) {
      let {cylinderSize, gasType, distributorId} = data;
      httpParams = httpParams.append("cylinderSize", cylinderSize);
      httpParams = httpParams.append("gasType", gasType);
      httpParams = httpParams.append("distributorId", distributorId);
    }
    let url = this.baseURL + contextPath;
    return this.http.get<any>(url, {params: httpParams});
  }

  public get1(contextPath: string, data?:any): Observable<any> {
   
    let url = this.baseURL + contextPath;
    return this.http.get<any>(url, {params: data});
  }

  public getForPaginator(contextPath: string, data?: any) {
    let url = this.baseURL + contextPath;

    let httpParams = new HttpParams;
    if(data) {
      let {page, pageSize, search} = data;
      httpParams = httpParams.append("page", page);
      httpParams = httpParams.append("pageSize", pageSize);
      if(search) {
        httpParams = httpParams.append("search", search);
      }

    }

    return this.http.get<any>(url, {params: httpParams});
  }

  byCustomerReport(contextPath: string, customerId?: any, paginationData?: any, days?: any) {
    let url = this.baseURL + contextPath;

    let httpParams = new HttpParams;
    if(paginationData) {
      let {page, pageSize, search} = paginationData;
      httpParams = httpParams.append("page", page);
      httpParams = httpParams.append("pageSize", pageSize);
    }
    if(customerId) {
      httpParams = httpParams.append("customerId", customerId);
    }
    if(days) {
      httpParams = httpParams.append("days", days);
    }

    return this.http.get<any>(url, {params: httpParams});
    
  }

  getDailySalesReport(contextPath:string,paginationData?:any,transactionDate?:any){
    let url = this.baseURL + contextPath;
    let httpParams = new HttpParams;

    if(paginationData) {
      let {page, pageSize, search} = paginationData;
      httpParams = httpParams.append("page", page);
      httpParams = httpParams.append("pageSize", pageSize);
    }
    if(transactionDate){
      httpParams=httpParams.append('transactionDate',transactionDate);
    }

    return this.http.get<any>(url, {params: httpParams});
  }

  public transactionListSearch(contextPath: string, data: any, paginationData?: any) {
    let url = this.baseURL + contextPath;

    let httpParams = new HttpParams;
    if(paginationData) {
    let {page, pageSize} = paginationData;
      httpParams = httpParams.append("page", page);
      httpParams = httpParams.append("pageSize", pageSize);
    }

    return this.http.post<any>(url, data, {params: httpParams});
    
  }

  transactionAddSearch(contextPath:string,data:any,paginationData?:any){
    let url = this.baseURL + contextPath;

    let httpParams = new HttpParams;
    if(paginationData) {
    let {page, pageSize} = paginationData;
      httpParams = httpParams.append("page", page);
      httpParams = httpParams.append("pageSize", pageSize);
    }

    return this.http.post<any>(url, data, {params: httpParams});
  }

  public searchFilter(contextPath:string,data:any,paginationData?:any){
    let url=this.baseURL+contextPath;
    let httpParams=new HttpParams;
    if(paginationData){
      let {page,pageSize}=paginationData;
      httpParams=httpParams.append("page",page);
      httpParams=httpParams.append("pageSize",pageSize);
    }


    return this.http.post<any>(url,data,{params:httpParams})
  }

  public post(contextPath: string, payload: {}) {
    let url = this.baseURL + contextPath;
    return this.http.post(url, payload);
  }

  public put(contextPath: string, payload: {}) {
    let url = this.baseURL + contextPath;
    return this.http.put(url, payload);
  }

  public delete(contextPath: string) {
    let url = this.baseURL + contextPath; 
    return this.http.delete(url);
  }

  public patch(contextPath: string, payload:any) {
    let url = this.baseURL + contextPath;
    return this.http.patch(url, payload);
  }

}

