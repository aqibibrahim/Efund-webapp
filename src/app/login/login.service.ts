import { ApiService } from "./../_services/api.service";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  role = "";
  username = "";
  email = "";
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService, private http: HttpClient) {}

  // add Account
  login(data) {
    this.setOptions();
    return this.http.post(this.apiService.baseUrl + "user/login", data, this.options);
  }

  setOptions() {
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    this.options = { headers: headers };
  }

  setRole(role) {
    this.role = role;
    console.log("role in login ", this.role);
  }

  getRole() {
    return this.role;
  }
}
