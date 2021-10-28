import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  // public baseUrl = "http://efundapp.herokuapp.com/api/";
  public baseUrl = "http://206.189.231.236:3000/api/";

  constructor() {}
}
