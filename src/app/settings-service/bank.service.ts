import { Injectable, Component } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ApiService } from '../_services/api.service';

@Injectable({
  providedIn: "root"
})
export class BankService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService, private http: HttpClient) { }

  // add Bank
  addBank(data) {
    this.setOptions();
    return this.http.post(
      this.apiService.baseUrl+"banks",
      data,
      this.options
    );
  }

  getAllBanksAndAccounts(){
    this.setOptions();
    return this.http.get(
      this.apiService.baseUrl+"bankAccount",
      this.options
    );
  }

  getBank() {
    this.setOptions();
    return this.http.get(
      this.apiService.baseUrl+"banks",
      this.options
    );
  }

  getOneBank(id) {
    this.setOptions();
    return this.http.get(
      this.apiService.baseUrl+"banks/"+id,
      this.options
    );
  }

  deleteBank(id) {
    this.setOptions();
    return this.http.delete(
      this.apiService.baseUrl+"banks/"+id,
      this.options
    );
  }

  updateBank(data,id) {
    this.setOptions();
    return this.http.post(
      this.apiService.baseUrl+"banks/"+id, data,
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
