import { ApiService } from "./../_services/api.service";
import { Injectable, Component } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ChequebookService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService, private http: HttpClient) {}

  // add Cheque
  addCheque(data) {
    this.setOptions();
    return this.http.post(this.apiService.baseUrl + "chequebook/", data, this.options);
  }

  getChequebooksofBank(id) {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "bankAccount/check/" + id, this.options);
  }

  getChequeBooks() {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "chequebook/", this.options);
  }

  getChequeBook(id) {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "chequebook/single-chequebook/" + id, this.options);
  }

  deleteChequebook(id) {
    this.setOptions();
    return this.http.delete(this.apiService.baseUrl + "chequebook/" + id, this.options);
  }

  updateChequebook(id, data) {
    this.setOptions();
    return this.http.patch(this.apiService.baseUrl + "chequebook/" + id, data, this.options);
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
