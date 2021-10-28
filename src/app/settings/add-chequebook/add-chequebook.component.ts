import { GetDataService } from "./../../dashboard-services/get-data.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ChequebookService } from "../../settings-service/chequebook.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-chequebook",
  templateUrl: "./add-chequebook.component.html",
  styleUrls: ["./add-chequebook.component.scss"],
})
export class AddChequebookComponent implements OnInit {
  banks = [];
  accounts = [];
  selectedid;

  addchequebook = new FormGroup({
    chequebook_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z ]*"),
    ]),
    chequebook_bank: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    chequebook_st_no: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9 ]*"),
    ]),
    chequebook_end_no: new FormControl(null, [Validators.required]),
    account_id: new FormControl(null, []),
  });
  constructor(
    private chequebookService: ChequebookService,
    private _router: Router,
    private toastr: ToastrService,
    private dataService: GetDataService
  ) {}

  ngOnInit() {
    this.dataService.getBanks().subscribe((result) => {
      for (let data in result["bank"]) {
        let bank = {
          _id: result["bank"][data]._id,
          name: result["bank"][data].name + "/" + result["bank"][data].location,
        };
        this.banks.push(bank);
      }
    });
  }

  AddChequeBook(addchequebook: any) {
    this.addchequebook.patchValue({
      account_id: this.selectedid,
    });

    this.chequebookService
      .addCheque(this.addchequebook.value)
      .subscribe((result) => {
        this.showNotification();
        this._router.navigate(["/settings/chequebook"]);
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

  bankchange(event) {
    this.accounts = [];
    this.chequebookService
      .getChequebooksofBank(event.target.value)
      .subscribe((result) => {
        console.log(result);
        for (let data of result["account"]) {
          this.accounts.push(data);
        }
      });
  }

  changeChequebook(event) {
    for (let data of this.accounts) {
      if (data._id == event.target.value) {
        this.selectedid = data.account_no;
        console.log(this.selectedid);
        break;
      }
    }
  }

  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Chequebook</span>',
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
