import { ApiService } from './../_services/api.service';
import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  basePath = "";
  socket;
  constructor(private apiService: ApiService,private toastr: ToastrService) {
       this.basePath= this.apiService.baseUrl.replace("/api/" , "");
       console.log(this.basePath);
  }

  setUpSocketConnection() {
    this.socket = io(this.basePath, {
      query: "token=" + localStorage.getItem("token"),
    });
  }

  getNotifications() {
    return Observable.create((observer) => {
      this.socket.on("output", function (data) {
        observer.next(data);
        //this.toastr.success("Succesfully Print Data","Congratualtions");
      });
    });
  }

  getNotificationData(data) {
    this.socket.emit("single-notification", data);
    return Observable.create((observer) => {
      this.socket.on("single-noti", function (data) {
        console.log("single noti" , data);
        observer.next(data);
    
      });
    });
  }

  sendForInitialApproval(dataObj) {
    console.log(dataObj);
    this.socket.emit("approval-message", dataObj);
    
    return Observable.create((observer) => {
      this.socket.on("approve-message", function (dataObj) {
        observer.next(dataObj);
      });
    });
  }

  sendPrintData(data) {
    console.log("print-check ",data);
    this.socket.emit("print-check", data);
    // return Observable.create((observer) => {
    //   this.socket.on('printed', function (data) {
    //     observer.next(data)
    //   })
    // })
  }
  sendClaimCheque(data){
    console.log("print-check ",data);
    this.socket.emit("claim-payment", data);
  }
}
