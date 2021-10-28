import { ToastrService } from "ngx-toastr";
import { NotifyshareService } from "./../../shared/notifyshare.service";
import { NotificationsService } from "./../../shared/notifications.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import {GetDataService} from '../../dashboard-services/get-data.service';
import {take} from 'rxjs/operators';
interface chequedata {
  type: any;
  status: any;
  _id: any;
  from: any;
  to: any;
  message: any;
}

@Component({
  selector: "app-ready-cheque",
  templateUrl: "./ready-cheque.component.html",
  styleUrls: ["./ready-cheque.component.scss"],
})
export class ReadyChequeComponent implements OnInit {
  constructor(
    private notifyService: NotificationsService,
    private notifyShare: NotifyshareService,
    private toastr: ToastrService,
    private _getdata: GetDataService
  ) {}

  form = new FormGroup({
    date: new FormControl("", [Validators.required]),
    payee: new FormControl("", [Validators.required]),
    bank: new FormControl("", [Validators.required]),
    amount: new FormControl("", [Validators.required]),
  });

  chequedata: chequedata = {
    type: "",
    status: "",
    _id: "",
    to: "",
    from: "",
    message: "",
  };
  message;
  bankselected
  notification;
  bankName = "";
  accountname = "";
  accounts = [];
  cheques =[];
  bankvalue : string;
  ngOnInit() {
    this._getdata.getAccountsWithBanks().subscribe(
      (result:any)=>{
        console.log(result);
        this.accounts = result.account;
      },
      (error)=>console.error(error)
    );
    this.notifyShare.currentNotify.pipe(take(1)).subscribe((result) => {
      this.notification = result;
      this.notifyService
        .getNotificationData(result["id"]).pipe(take(1))
        .subscribe((result:any) => {
          console.log("result ",result);
          this.chequedata = result;
          this.message = this.chequedata.message;
          console.log("message ", this.message);
          if(result.message[0].bank_name == undefined){
            this.bankName = result.message[0].bankAccount
          }
          else{
            this.bankName = result.message[0].bank_name
          }

         
          // if(result.message[0].bank_id != undefined){
          //   this._getdata.getAccountsWithBanks().subscribe((results)=>{
          //     console.log(results);
          //     for(let data in results){
          //         console.log(data)
          //       // if(result[data]._id == result.message[0].bank_id){
          //       //   console.log(results[data].name);
          //       // }
          //     }
          //   });
          // }
          //this.setBank(result.message[0].bankAccount_id);
          
          console.log(this.bankvalue); 
          console.log(this.bankName)
          this.form.patchValue({
            date:  result.date.slice(0, 10),
            payee: result.message[0].payee,
            bank: this.bankName,
            amount: result.message[0].amount,
          });
         
          
        } ,  error=>{
          this.toastr.error(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+error.message+'</span>',
            "",
            {
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-error",
              positionClass: "toast-bottom-center"
            }
          );    
        });
    });
  }

  print(data: NgForm) {
    console.log(data);
    this.showNotification()
     this.notifyService.sendPrintData(this.chequedata._id);
    
  }
  setBank(value) {
    console.log(value);
    this.bankselected = true;
    this.accountname = this.accounts.find(account=>account._id==value).account_name;
    this.bankvalue = this.accountname + " | " + this.bankName
    console.log(this.bankvalue);
    
  }
  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Please wait for print..</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center",
      }
    );
  }
}
