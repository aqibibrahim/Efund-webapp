import { ApiService } from './../_services/api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartofaccountsService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService, private http: HttpClient) {}

  
  addChartofAccounts(data){
    this.setOptions()
    return this.http.post( this.apiService.baseUrl+"chart/", data, this.options)
  }

  getChartofAccounts(){
    this.setOptions()
    return this.http.get( this.apiService.baseUrl+"chart/", this.options)
  }

  getChartofAccount(id){
    this.setOptions()
    return this.http.get( this.apiService.baseUrl+"chart/"+id, this.options)
  }

  deleteChartofAccount(id){
    this.setOptions()
    return this.http.delete( this.apiService.baseUrl+"chart/"+id, this.options)
  }
  
  updateChartofAccount(data, id){
    this.setOptions()
    return this.http.post( this.apiService.baseUrl+"chart/"+id, data, this.options)
  } 
  // updateChartofAccount(id, data){
  //   this.setOptions()
  //   return this.http.patch( this.apiService.baseUrl+"chart/"+id, data, this.options)
  // }

  setOptions() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-auth-token": token
    });
    this.options = { headers: headers };
  }
}
