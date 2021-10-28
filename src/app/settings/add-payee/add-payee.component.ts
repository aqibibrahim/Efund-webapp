import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PayeeService } from "../../settings-service/payee.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-payee",
  templateUrl: "./add-payee.component.html",
  styleUrls: ["./add-payee.component.scss"]
})
export class AddPayeeComponent implements OnInit {
  public mask = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/]
  addpayee = new FormGroup({
    payee_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z ]*")
    ]),
    payee_address: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    payee_cnic: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9.-]*"),
      Validators.minLength(13),
      Validators.maxLength(18)
    ]),
    payee_account: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9 ]*")
    ]),
    payee_city: new FormControl(null, [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  constructor(
    private payeeService: PayeeService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  AddPayee(addpayee: any) {
    this.payeeService.addPayee(this.addpayee.value).subscribe(result => {
      this._router.navigate(["/settings/payee"]);
      this.showNotification();
    } , error=>{
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
