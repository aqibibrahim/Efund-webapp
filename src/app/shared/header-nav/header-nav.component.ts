import { NotifyshareService } from "./../notifyshare.service";
import { NotificationsService } from "./../notifications.service";
import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";

import { LoginService } from "../../login/login.service";
import { HeaderService } from "./header.service";

import { Subscription, Observable, timer } from "rxjs";
import * as moment from "moment";
@Component({
  selector: "shared-header-nav",
  templateUrl: "./header-nav.component.html",
  styleUrls: ["./header-nav.component.scss"],
})
export class HeaderNavComponent implements OnInit {
  private subscription: Subscription;
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
  @Input() SearchDate: moment.Moment = moment();
  @Input() ElapsTime: number = 1;
  searchEndDate: moment.Moment;
  remainingTime: number;
  minutes: number;
  seconds: number;
  everySecond: Observable<number> = timer(0, 1000);
  shownotification = false;
  showprofile = false;
  notifications = [];
  notificationslength: any;
  asyncnotifications = [];
  role = "";
  isLoggedin;
  email;
  uservalue;
  roles;
  constructor(private loginService: LoginService, private ref: ChangeDetectorRef, private notificationService: NotificationsService, private notifyShare: NotifyshareService, private router: Router, private _header: HeaderService) {
    this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
    this.isLoggedin = this.loginService.username;
    this.email = localStorage.getItem("email");
    this.uservalue = localStorage.getItem("username");
    this.roles = localStorage.getItem("role");
    this.notificationService.setUpSocketConnection();
    this.notificationService.getNotifications().subscribe((result) => {
      this.notifications = [];
      console.log(result);
      this.notificationslength = result.length;
      console.log(this.notificationslength);
      for (let data in result) {
        let notification = {};
        if (result[data].notification_status == "rq_print_check") {
          notification = {
            id: result[data]._id,
            type: result[data].type,
            project: result[data].project,
            notification_status: "Print Cheque Request",
            purchasername: result[data].purchaserName,
            stauts: result[data].read_status,
          };
        } else {
          notification = {
            id: result[data]._id,
            type: result[data].type,
            project: result[data].project,
            notification_status: result[data].notification_status,
            purchasername: result[data].purchaserName,
            stauts: result[data].read_status,
          };
        }

        this.notifications.push(notification);
      }
      for (var i = this.notifications.length; i--; ) {
        this.asyncnotifications.push(this.notifications[i]);
        // console.log(this.asyncnotifications);
      }
    });
  }
  getnotifications() {
    console.log("get niotify clicked");
    this.notificationService.getNotifications().subscribe((result) => {
      this.notifications = [];
      console.log(result);
      this.notificationslength = result.length;
      console.log(this.notificationslength);
      for (let data in result) {
        let notification = {
          id: result[data]._id,
          type: result[data].type,
          project: result[data].project,
          notification_status: result[data].notification_status,
          purchasername: result[data].purchaserName,
        };
        this.notifications.push(notification);
      }
      for (var i = this.notifications.length; i--; ) {
        this.asyncnotifications.push(this.notifications[i]);
        // console.log(this.asyncnotifications);
      }
    });
  }
  ngOnInit() {
    this.role = this.loginService.getRole();
    // let role = localStorage.getItem("token");
    console.log("role in header ", this.roles);
    this.subscription = this.everySecond.subscribe((seconds) => {
      var currentTime: moment.Moment = moment();
      this.remainingTime = this.searchEndDate.diff(currentTime);
      this.remainingTime = this.remainingTime / 1000;
      if (this.remainingTime <= 0) {
        this.SearchDate = moment();
        this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
        this.TimerExpired.emit();
        //this.getnotifications();
      } else {
        this.minutes = Math.floor(this.remainingTime / 60);
        this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
      }
      this.ref.markForCheck();
    });
  }

  openNotification(notify) {
    console.log(notify);
    this.notifyShare.changeNotify(notify);
    this.toggleNotification();
    if (notify["notification_status"] === "RequestPayment") {
      this.router.navigate(["/dashboard/print-cheque"]);
    } else if (notify["notification_status"] === "ClaimRequest") {
      this.router.navigate(["/dashboard/claim-cheque"]);
    } else if (notify["notification_status"] === "wallet") {
      alert("Amount Transfer to " + notify["purchasername"] + " Wallet");
    } else if (notify["notification_status"] === "rq_print_check") {
      this.router.navigate(["/dashboard/ready-cheque"]);
    } else {
      this.router.navigate(["/dashboard/ready-cheque"]);
    }
    // if()
  }

  toggleNotification() {
    this.shownotification = !this.shownotification;
    this.showprofile = false;
  }

  toggleProfile() {
    this.showprofile = !this.showprofile;
    this.shownotification = false;
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/login"]);
  }
}
