import { GetDataService } from "./../../dashboard-services/get-data.service";
import { ReportsharingService } from "./../../dashboard-services/reportsharing.service";
import {ReportsService} from "../../dashboard-services/reports.service"
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Observable, interval, Subscription } from 'rxjs';
import { ReadPropExpr } from '@angular/compiler';
@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"]
})
export class ReportsComponent implements OnInit {
  private updateSubscription: Subscription;
  activatedmenu = "Date Log";
  menus = [
    "Date Log",
    "Bank Log",
    "Cheque Book Log",
    "Payee Log",
    "Cost Log",
    // "Request Payment"
  ];
  payees = [];
  banks = [];
  bankaccounts= [];
  constructor(
    private router: Router,
    private reportshare: ReportsharingService,
    private dataService: GetDataService,
    private _reportservice:ReportsService
  ) { }

  dateForm = new FormGroup({
    start_date: new FormControl("", Validators.required),
    end_date: new FormControl("", Validators.required)
  });

  bankForm = new FormGroup({
    bankAccount: new FormControl("", Validators.required),
    account: new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    end_date: new FormControl("", Validators.required)
  });

  chequebookForm = new FormGroup({
    check_st_no: new FormControl("", Validators.required),
    check_end_no: new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    end_date: new FormControl("", Validators.required)
  });

  payeeForm = new FormGroup({
    payee: new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    end_date: new FormControl("", Validators.required)
  });

  costForm = new FormGroup({
    amount_start: new FormControl("", Validators.required),
    amount_end: new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    end_date: new FormControl("", Validators.required)
  });
  
  paymentForm = new FormGroup({
    payment: new FormControl("", Validators.required),
    start_date: new FormControl("", Validators.required),
    end_date: new FormControl("", Validators.required)
  });

  ngOnInit() {
    let token = localStorage.getItem("token");
    this.dataService.getPayees().subscribe(result => {
      for (let data in result["payee"]) {
        let payee = {
          _id: result["payee"][data]._id,
          payee_name: result["payee"][data].payee_name
        };
        this.payees.push(payee);
        console.log(this.payees);
        console.log(token);
      }
    });
    this.dataService.getBanks().subscribe(
      result => {
        for (let data in result['bank']) {
          let bank = {
            _id: result['bank'][data]._id,
            name: result['bank'][data].name + "/" + result['bank'][data].location
          }
          this.banks.push(bank)
        }
      })
      // this.updateSubscription = interval(1000).subscribe(
      //   (val) => { alert(val)
      // }
  // );
  }
  onBankSelected(value:string){
    console.log(value);
  
    this._reportservice.getFrommBankAccount(value).subscribe(
      result => {
        console.log(result);
        for (let data in result['account']) {
          let account = {
            _id: result['account'][data]._id,
            name: result['account'][data].account_name 
          }
          this.bankaccounts.push(account)
          console.log(this.bankaccounts)
        }
    })
  }
  onOptionsSelected(value:string){
    console.log(value);
  }
  changeMenu(menu) {
    this.activatedmenu = menu;
  }

  submitDate(data: NgForm) {
    let st_date = new Date(data['start_date'].year, data['start_date'].month - 1, data['start_date'].day + 1);
    let en_date = new Date(data['end_date'].year, data['end_date'].month - 1, (data['end_date'].day + 1));
    this.dateForm.patchValue({
      start_date: st_date.toISOString(),
      end_date: en_date.toISOString()
    })
    this.reportshare.changedata(this.dateForm.value);
    this.router.navigate(["/dashboard/reports-list"]);
  }

  submitBank(data: NgForm) {
    console.log(data);
    let st_date = new Date(data['start_date'].year, data['start_date'].month - 1, data['start_date'].day + 1);
    let en_date = new Date(data['end_date'].year, data['end_date'].month - 1, (data['end_date'].day + 1));
    this.bankForm.patchValue({
      start_date: st_date.toISOString(),
      end_date: en_date.toISOString()
    })
    this.reportshare.changedata(this.bankForm.value);
    this.router.navigate(["/dashboard/reports-list"]);
  }

  submitChequebook(data: NgForm) {
    let st_date = new Date(data['start_date'].year, data['start_date'].month - 1, data['start_date'].day + 1);
    let en_date = new Date(data['end_date'].year, data['end_date'].month - 1, (data['end_date'].day + 1));
    this.chequebookForm.patchValue({
      start_date: st_date.toISOString(),
      end_date: en_date.toISOString()
    })
    this.reportshare.changedata(this.chequebookForm.value);
    this.router.navigate(["/dashboard/reports-list"]);
  }

  submitPayee(data: NgForm) {
    console.log(data)
    let st_date = new Date(data['start_date'].year, data['start_date'].month - 1, data['start_date'].day + 1);
    let en_date = new Date(data['end_date'].year, data['end_date'].month - 1, (data['end_date'].day + 1));
    this.payeeForm.patchValue({
      start_date: st_date.toISOString(),
      end_date: en_date.toISOString(),

    })
    this.reportshare.changedata(this.payeeForm.value);
    this.router.navigate(["/dashboard/reports-list"]);
  }

  submitCost(data: NgForm) {
    let st_date = new Date(data['start_date'].year, data['start_date'].month - 1, data['start_date'].day + 1);
    let en_date = new Date(data['end_date'].year, data['end_date'].month - 1, (data['end_date'].day + 1));
    this.costForm.patchValue({
      start_date: st_date.toISOString(),
      end_date: en_date.toISOString()
    })
    this.reportshare.changedata(this.costForm.value);
    this.router.navigate(["/dashboard/reports-list"]);
  }
  submitPayment(data: NgForm) {
    this.reportshare.changedata(data);
    let st_date = new Date(data['start_date'].year, data['start_date'].month - 1, data['start_date'].day + 1);
    let en_date = new Date(data['end_date'].year, data['end_date'].month - 1, (data['end_date'].day + 1));
    this.paymentForm.patchValue({
      start_date: st_date.toISOString(),
      end_date: en_date.toISOString()
    })
    this.reportshare.changedata(this.paymentForm.value);
    this.router.navigate(["/dashboard/reports-list"]);
  }
}
