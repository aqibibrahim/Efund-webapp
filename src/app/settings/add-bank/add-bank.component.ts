import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BankService } from "../../settings-service/bank.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {  NgbModal, NgbModalOptions, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: "app-add-bank",
  templateUrl: "./add-bank.component.html",
  styleUrls: ["./add-bank.component.scss"]
})
export class AddBankComponent implements OnInit {
  bank = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.required,
      Validators.pattern("[a-zA-Z ]*")
    ]),
    city: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[a-zA-Z ]*")
    ]),
    location: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    pin: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9 ]*")
    ])
  });
  constructor(
    private bankService: BankService,
    private _router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {}
  Addbank(bank: any) {
    this.bankService.addBank(this.bank.value).subscribe(result => {
      this.showNotification();
      this._router.navigate(["/settings/bank"]);
    } , (error)=>{
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+error.error.msg+'</span>',
        "",
        {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-error",
          positionClass: "toast-bottom-center"
        }
      );   
    });
  }

  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Cheque</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }
}
