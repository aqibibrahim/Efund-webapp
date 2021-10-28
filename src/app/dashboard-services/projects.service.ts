import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { ApiService } from "../_services/api.service";

@Injectable({
  providedIn: "root",
})
export class ProjectsService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService, private http: HttpClient) {}

  addProject(data) {
    this.setOptions();
    return this.http.post(this.apiService.baseUrl + "project", data, this.options);
  }

  getProjects() {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "project", this.options);
  }

  getUsersOnProjects() {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "project/mobile", this.options);
  }

  getProject(id) {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "project/" + id, this.options);
  }

  getChildProject(id) {
    this.setOptions();
    return this.http.get(this.apiService.baseUrl + "project/projectid/" + id, this.options);
  }

  deleteProject(id) {
    this.setOptions();
    return this.http.delete(this.apiService.baseUrl + "project/" + id, this.options);
  }

  updateProject(id, data) {
    this.setOptions();
    return this.http.patch(this.apiService.baseUrl + "project/" + id, data, this.options);
  }
  transferProject(id, data) {
    console.log(id);
    this.setOptions();
    return this.http.post(this.apiService.baseUrl + "project/transfer/" + id, data, this.options);
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
