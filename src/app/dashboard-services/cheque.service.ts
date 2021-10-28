import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ApiService } from '../_services/api.service';

@Injectable({
  providedIn: "root"
})
export class ChequeService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService, private http: HttpClient) {}

  printCheque(data) {
    this.setOptions();
    return this.http.post(
       this.apiService.baseUrl+"printcheck",
      data,
      this.options
    );
  }

  getAmountofBank(id){
    this.setOptions()
    return this.http.get( this.apiService.baseUrl+"bankAccount/"+id, this.options)
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
