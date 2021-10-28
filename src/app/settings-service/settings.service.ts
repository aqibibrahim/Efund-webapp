import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from '../_services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService:ApiService , private http: HttpClient) { }

  getUser() {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"employee/user/",
      this.options
    );
  }

  updateUser(data) {
    this.setOptions();
    return this.http.patch(
       this.apiService.baseUrl+"employee/user/", data,
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

