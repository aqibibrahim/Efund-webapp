import { ApiService } from './../_services/api.service';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CostcenterService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService , private http: HttpClient) {}

  addCostcenter(data) {
    this.setOptions();
    return this.http.post(
       this.apiService.baseUrl+"costCenter",
      data,
      this.options
    );
  }

  getCostcenters() {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"costCenter",
      this.options
    );
  }

  getCostcenter(id) {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"costCenter/"+id,
      this.options
    );
  }

  deleteCostcenter(id){
    this.setOptions();
    return this.http.delete(
       this.apiService.baseUrl+"costCenter/"+id,
      this.options
    );
  }

  updateCostcenter(id, data){
    this.setOptions();
    return this.http.patch(
       this.apiService.baseUrl+"costCenter/"+id, data,
      this.options
    );
  }

  setOptions() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-auth-token": token
    });
    this.options = { headers: headers };
  }
}
