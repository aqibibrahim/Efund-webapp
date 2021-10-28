import { GetDataService } from './../../dashboard-services/get-data.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from "@angular/forms";
import { AccountService } from "../../settings-service/account.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.scss"]
})
export class AddAccountComponent implements OnInit {
  public mask = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/]
  loading = false;
  addaccount = new FormGroup({
    account_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z ]*")
    ]),
    account_address: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    account_cnic: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9.-]*"),
      Validators.minLength(13),
      Validators.maxLength(18)
    ]),
    account_no: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9 ]*")
    ]),
    bank_name: new FormControl("", [Validators.required]),
    opening_balance: new FormControl(null, [
      Validators.pattern(/^\d+/),
    ]),
    child_account : new FormArray([])
  });

  get child_account(){
    return this.addaccount.get('child_account') as FormArray
  }

  alphabetAmount
  banks = []
  
  constructor(
    private accountService: AccountService,
    private _router: Router,
    private toastr: ToastrService,
    private dataService: GetDataService
  ) {}

  ngOnInit() {
   
    this.dataService.getBanks().subscribe(
      result => {
        for (let data in result['bank']) {
          let bank = {
            _id: result['bank'][data]._id,
            name: result['bank'][data].name + "/" + result['bank'][data].location
          }
          this.banks.push(bank)
        }
      }
    )
  }
  addChildAccount(){
    this.child_account.push(
      new FormGroup({
        child_name: new FormControl('', Validators.required),
        child_id: new FormControl('', Validators.required),
        child_location: new FormControl('', Validators.required)
      })
    )
  }

  removeChildAccount(control:AbstractControl){
    this.child_account.removeAt(this.child_account.controls.indexOf(control))
  }

  AddAccount(addaccount: any) {
    this.loading = true;
    console.log(addaccount);
    this.accountService.addAccount(this.addaccount.value).subscribe(result => {
      console.log(result);
      this.showNotification();
      this.loading = false;
      this._router.navigate(["/settings/account"]);
    } , error=>{
      console.log(error.error.msg);
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+error.error.msg+'</span>',
        "",
        {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-error",
          positionClass: "toast-bottom-center"
        }
      )
    });
  }

  newConv(value) {
    let a = [
      '',
      'one ',
      'two ',
      'three ',
      'four ',
      'five ',
      'six ',
      'seven ',
      'eight ',
      'nine ',
      'ten ',
      'eleven ',
      'twelve ',
      'thirteen ',
      'fourteen ',
      'fifteen ',
      'sixteen ',
      'seventeen ',
      'eighteen ',
      'nineteen '];

    let b = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety'];

    if (value) {
      let num: any = Number(value);
      if (num) {
        if ((num = num.toString()).length > 9) { return 'Amount too big :)'; }
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) { return ''; }
        let str = '';
        str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (Number(n[5]) !== 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  convertToWords(val) {
    this.alphabetAmount = this.newConv(val) + " Rupees Only"
  }

  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Account</span>',
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
