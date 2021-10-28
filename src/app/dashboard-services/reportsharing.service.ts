import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ReportsharingService {
  constructor() {}

  private dataSource = new BehaviorSubject<any>("");
  currentdata = this.dataSource.asObservable();

  changedata(data: any) {
    this.dataSource.next(data);
  }
}
