import { ApiService } from './../_services/api.service';
import { Injectable, Component } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService,private http: HttpClient) {}

  // add Account
  addAccount(data) {
    console.log(data)
    this.setOptions();
    return this.http.post(
       this.apiService.baseUrl+"bankAccount/",
      data,
      this.options
    );
  }
  getAccount() {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"bankAccount/",
      this.options
    );
  }

  getOneAccount(id) {
    console.log(id)
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"bankAccount/"+id,
      this.options
    );
  }

  deleteAccount(id){
    this.setOptions()
    return this.http.delete( this.apiService.baseUrl+"bankAccount/"+id, this.options)
  }

  updateAccount(data, id){
    console.log(data);
    this.setOptions()
    return this.http.patch( this.apiService.baseUrl+"bankAccount/"+id, data, this.options)
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
