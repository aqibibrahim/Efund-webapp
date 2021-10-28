import { ApiService } from './../_services/api.service';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DirectorService {
  options: {
    headers: HttpHeaders;
  };

  constructor(private apiService: ApiService,private http: HttpClient) {}

  getDirectors() {
    this.setOptions();
    return this.http.get(
       this.apiService.baseUrl+"employee/get-director",
      this.options
    );
  }

  getOneDirector(id) {
    console.log(id)
    this.setOptions();

    return this.http.get(
       this.apiService.baseUrl+"employee/get-onedirector/"+ id,
      this.options
    );
  }

  addDirector(data) {
    this.setOptions();
    return this.http.post(
       this.apiService.baseUrl+"employee/create-director/",
      data,
      this.options
    );
  }

  deleteDirector(id) {
    this.setOptions();
    return this.http.delete(
       this.apiService.baseUrl+"employee/get-onedirector/"+ id,
      this.options
    );
  }
  updateDirector(data, id){
    console.log(data);
    this.setOptions();
    return this.http.post(
       this.apiService.baseUrl+"employee/get-onedirector/"+id, data,
      this.options
    );
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
