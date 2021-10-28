import { ApiService } from './../_services/api.service';
import { Injectable, Component } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService:ApiService, private http: HttpClient) {}

  // add employee
  addEmployee(data) {
    console.log(data);
    this.setOptions();
    return this.http.post(
       this.apiService.baseUrl+"employee",
      data,
      this.options
    );
  }

  getEmployee() {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"employee",
      this.options
    );
  }

  getOneEmployee(id) {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"employee/"+id,
      this.options
    );
  }

  deleteEmployee(id){
    this.setOptions();
    return this.http.delete(
       this.apiService.baseUrl+"employee/"+id,
      this.options
    );
  }

  updateEmployee(data, id){
    this.setOptions();
    return this.http.patch(
       this.apiService.baseUrl+"employee/"+id, data,
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
