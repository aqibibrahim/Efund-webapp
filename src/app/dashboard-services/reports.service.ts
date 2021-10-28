import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ApiService } from "../_services/api.service";

@Injectable({
  providedIn: "root",
})
export class ReportsService {
  options: {
    headers: HttpHeaders;
  };
  datewisedata: any;
  constructor(private apiService: ApiService, private http: HttpClient) {}

  setOptions() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
      "x-auth-token": token,
    });
    this.options = { headers: headers };
    console.log(this.options);
  }

  getFromDate(data) {
    this.setOptions();
    return this.http.post(this.apiService.baseUrl + "reports/datewise", data, this.options);
  }

  getFromPayee(data) {
    console.log(data);
    this.setOptions();
    return this.http.post("https://efundapp.herokuapp.com/api/reports/payee-report", data, this.options);
  }

  getFromPayment(data) {
    this.setOptions();
    return this.http.post("https://efundapp.herokuapp.com/api/reports/request-payment-web", data, this.options);
  }

  getFromBank(data) {
    this.setOptions();
    return this.http.post("https://efundapp.herokuapp.com/api/reports/bankwise", data, this.options);
  }

  getFrommBankAccount(id) {
    this.setOptions();
    return this.http.get("https://efundapp.herokuapp.com/api/bankAccount/bank-acc/" + id, this.options);
  }

  getFromChequebook(data) {
    this.setOptions();
    return this.http.post("https://efundapp.herokuapp.com/api/reports/check", data, this.options);
  }

  getFromCost(data) {
    this.setOptions();
    return this.http.post("https://efundapp.herokuapp.com/api/reports/cost", data, this.options);
  }
}
