import { ApiService } from './../_services/api.service';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DashboardEmployeeService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getPurchasers() {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"employee/purchaser",
      this.options
    );
  }

  getSupervisors() {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"employee/supervisor",
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
