import { NotifyshareService } from "./../../shared/notifyshare.service";
import { NotificationsService } from "./../../shared/notifications.service";
import { Router } from "@angular/router";
import { ChequeService } from "./../../dashboard-services/cheque.service";
import { GetDataService } from "./../../dashboard-services/get-data.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray, NgForm } from "@angular/forms";
import { numWords } from "../../../../node_modules/num-words";
import { ToastrService } from "ngx-toastr";

interface chequedata {
  type: any;
  status: any;
  _id: any;
  from: any;
  purchaserName: any;
  purchaserID: any;
  to: any;
  project: any;
  message: any;
}

@Component({
  selector: "app-print-checque",
  templateUrl: "./print-checque.component.html",
  styleUrls: ["./print-checque.component.scss"],
})
export class PrintChequeComponent implements OnInit {
  constructor(private chequeService: ChequeService, private dataService: GetDataService, private toastr: ToastrService, private router: Router, private notifyService: NotificationsService, private notifyShare: NotifyshareService) {}

  payees = [];
  cheques = [];
  banks = [];
  accounts = [];
  costcenters = [];
  alphabetAmount = "";
  currentAmount;
  bankselected;
  chartofAccounts = [];
  typeofCharts = [];
  notification;
  chequedata: chequedata = {
    type: "",
    status: "",
    _id: "",
    from: "",
    purchaserName: "",
    purchaserID: "",
    to: "",
    project: "",
    message: "",
  };
  payee_selected = "";
  message;
  setprice;
  project;
  marked = false;
  theCheckbox = false;
  request_id: "";
  ngOnInit() {
    // this.dataService.getAccountsWithBanks().subscribe(
    //   (result:any)=>{
    // console.log(result);
    //     this.accounts = result.account;
    //   },
    //   (error)=>console.error(error)
    // );
    this.dataService.getAccountsWithBanks().subscribe(
      (result: any) => {
        // console.log(result);
        this.accounts = result.account;
        this.notifyShare.currentNotify.subscribe((result) => {
          this.notification = result;
          this.notifyService.getNotificationData(result["id"]).subscribe((result) => {
            console.log("final result ", result);
            this.request_id = result.request;
            this.form.patchValue({
              bankAccount: result.bank_id,
            });
            this.payee_selected = result.purchaserName;
            console.log(this.payee_selected);
            this.chequedata = result;
            this.message = JSON.parse(this.chequedata.message);
            this.setprice = 0;
            for (let message of this.message) {
              this.setprice += message["pkr"];
            }
            this.amount.setValue(this.setprice);
            console.log("=bank is ", result.bank_id, this.form);
            this.setBank(result.bank_id);
          });
        });
      },
      (error) => console.error(error)
    );

    this.dataService.getBanks().subscribe(
      (result) => {
        // console.log(result);
        for (let data in result["bank"]) {
          let bank = {
            _id: result["bank"][data]._id,
            name: result["bank"][data].name + "/" + result["bank"][data].location,
          };
          this.banks.push(bank);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    this.dataService.getPayees().subscribe((result) => {
      console.log("payes ", result);
      for (let data in result["payee"]) {
        let payee = {
          _id: result["payee"][data]._id,
          payee_name: result["payee"][data].payee_name,
        };
        this.payees.push(payee);
      }
      console.log(this.payees);
    });

    this.dataService.getCostcenters().subscribe((result) => {
      for (let data of result["costcenter"]) {
        this.costcenters.push(data);
      }
    });

    this.dataService.getChartofAccounts().subscribe((result) => {
      for (let chart of result["chart"]) {
        this.chartofAccounts.push(chart);
      }
    });
  }

  form = new FormGroup({
    bankAccount: new FormControl("", [Validators.required]),
    checkno: new FormControl("", [Validators.required]),
    payee: new FormControl("", [Validators.required]),
    cashier_name: new FormControl("", [Validators.required]),
    issue_date: new FormControl("", [Validators.required]),
    account_head: new FormControl("", [Validators.required]),
    chart_of_accounts: new FormControl("", [Validators.required]),
    type: new FormControl("", [Validators.required]),
    amount: new FormControl("", [Validators.required, Validators.pattern("[0-9 ]*")]),
    // costcenter: new FormControl('', [
    //   Validators.required
    // ]),
  });
  toggleVisibility(e) {
    this.marked = e.target.checked;
  }

  get type() {
    return this.form.get("type");
  }

  get chart_of_accounts() {
    return this.form.get("chart_of_accounts");
  }

  get account_head() {
    return this.form.get("account_head");
  }

  get bankAccount() {
    return this.form.get("bankAccount");
  }

  get checkno() {
    return this.form.get("checkno");
  }

  get payee() {
    return this.form.get("payee");
  }

  get issue_date() {
    return this.form.get("issue_date");
  }

  get amount() {
    return this.form.get("amount");
  }
  // get costcenter() {
  //   return this.form.get('costcenter')
  // }

  setTypeofChart(event) {
    this.typeofCharts = [];
    this.dataService.getTypeofAccountChart(event.target.value).subscribe((result) => {
      for (let type of result["chart"].items) {
        this.typeofCharts.push(type);
      }
    });
  }

  printCheque(data: NgForm) {
    console.log(data);
    var blankcheque = 0;
    if (this.marked == true) {
      blankcheque = 1;
      let date = new Date(data["issue_date"].year, data["issue_date"].month - 1, data["issue_date"].day + 1);
      this.form.patchValue({
        issue_date: date.toISOString(),
      });
    } else {
      this.form.patchValue({
        issue_date: "",
      });
    }

    let transformedBody = {
      ...this.form.value,
      project: this.notification.project,
      blank_check: blankcheque,
      request: this.request_id,
    };
    console.log(transformedBody);
    this.notifyService.sendForInitialApproval(transformedBody);
    // this.notifyService.sendPrintData(this.form.value)
    this.showNotification();
  }

  setBank(value) {
    console.warn("Set bank :", value);
    console.warn("account :", this.accounts);
    this.bankselected = true;
    this.currentAmount = this.accounts.find((account) => account._id == value).amount;
    console.warn("currentAmount :", this.currentAmount);
    // if(this.currentAmount == undefined){

    // }
    this.dataService.getChequeBook(value).subscribe((result) => {
      // console.log(result);
      this.cheques = [];
      for (let data in result["chequebook"]) {
        for (let check in result["chequebook"][data].details) {
          if (!result["chequebook"][data].details[check].check_status) {
            let checknumber = {
              _id: result["chequebook"][data].details[check]._id,
              check_no: result["chequebook"][data].details[check].check_no,
            };
            this.cheques.push(checknumber);
          }
        }
      }
    });
    // this.chequeService.getAmountofBank(value).subscribe(
    //   result => {
    //     this.currentAmount = result['account'].amount
    //   }
    // )
  }

  newConv(value) {
    let a = ["", "one ", "two ", "three ", "four ", "five ", "six ", "seven ", "eight ", "nine ", "ten ", "eleven ", "twelve ", "thirteen ", "fourteen ", "fifteen ", "sixteen ", "seventeen ", "eighteen ", "nineteen "];

    let b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    if (value) {
      let num: any = Number(value);
      if (num) {
        if ((num = num.toString()).length > 9) {
          return "Amount too big :)";
        }
        const n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) {
          return "";
        }
        let str = "";
        str += Number(n[1]) !== 0 ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "crore " : "";
        str += Number(n[2]) !== 0 ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "lakh " : "";
        str += Number(n[3]) !== 0 ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "thousand " : "";
        str += Number(n[4]) !== 0 ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "hundred " : "";
        str += Number(n[5]) !== 0 ? (str != "" ? "and " : "") + (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) : "";
        return str;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  convertToWords(val) {
    this.alphabetAmount = this.newConv(val) + " Rupees Only";
  }

  showNotification() {
    this.toastr.info('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully sent for approval</span>', "", {
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: "toast-top-center",
    });
  }
}
