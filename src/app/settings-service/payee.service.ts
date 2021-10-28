import { Injectable, Component } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ApiService } from '../_services/api.service';

@Injectable({
  providedIn: "root"
})
export class PayeeService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService:ApiService, private http: HttpClient) {}

  // add Payee
  addPayee(data) {
    this.setOptions();
    return this.http.post(
       this.apiService.baseUrl+"payee/",
      data,
      this.options
    );
  }

  getPayees() {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"payee",
      this.options
    );
  }

  getPayee(id) {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"payee/"+id,
      this.options
    );
  }

  deletePayee(id){
    this.setOptions();
    return this.http.delete(
       this.apiService.baseUrl+"payee/"+id,
      this.options
    );
  }

  updatePayee(id, data){
    this.setOptions();
    return this.http.patch(
       this.apiService.baseUrl+"payee/"+id, data,
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
