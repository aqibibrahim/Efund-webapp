import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ApiService } from "../_services/api.service";
import { delay } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class GetDataService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService, private http: HttpClient) {}

  getPayees() {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "payee/", this.options).pipe(delay(5000));
  }

  getBanks() {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "banks/", this.options);
  }

  getAccountsWithBanks() {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "bankAccount/", this.options).pipe(delay(5000));
  }

  getChequeBook(id) {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "chequebook/" + id, this.options);
  }

  getCostcenters() {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "costCenter/", this.options);
  }

  getChartofAccounts() {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "chart/", this.options);
  }

  getTypeofAccountChart(account) {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "chart/" + account, this.options);
  }

  getallusers(id) {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "employee/get-emp/" + id, this.options);
  }

  setOptions() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-auth-token": token,
    });
    this.options = { headers: headers };
  }
}
