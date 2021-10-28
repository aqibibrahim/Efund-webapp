import { convertdateToDMYFormat } from './../../helpers/dateFormatConverter';
import { AccountService } from "./../../settings-service/account.service";
import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit } from "@angular/core";
import {
  NgbModalOptions,
  NgbModal,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

interface PeriodicElement {
  id: number;
  name: string;
  holder: string;
  position: number;
  amount: any;
  location: any;
  date: any;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Salim J', code: '1', location: 'H-8', city:'Islamabad, Pakistan', date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', code: '1', location: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', code: '1', location: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', code: '1', location: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', code: '1', location: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', code: '1', location: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},

// ];

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  deleteitem;
  modalOptions: NgbModalOptions;
  closeResult: string;
  displayedColumns: string[] = [
    "position",
    "name",
    "location",
    "holder",
    "amount",
    "date",
    "actions",
  ];
  dataSource;
  convertDateToDMY = convertdateToDMYFormat;
  ELEMENT_DATA: PeriodicElement[] = [];
  detailsData = {
    _id: "",
    account_name: "",
    account_address: "",
    account_cnic: "",
    account_no: "",
    bank_name: "",
    opening_balance: "",
    child_account: "",
    date: "",
    name: "",
    amount: "",
  };
  accountData = {
    name: "",
    id: "",
    acc_no: "",
    address: "",
    amount:""
  };
  currentamount= 0;
  sameamount =0;
  cred_debt: string;
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private accountService: AccountService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      size: "lg",
      centered: true,
    };
  }

  addaccount = new FormGroup({
    account_name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z ]*"),
    ]),
    account_address: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
    ]),
    account_no: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9 ]*"),
    ]),
    amount: new FormControl(null, [
      Validators.pattern(/^\d+/),
    ]),
  });

  ngOnInit() {
    this.populateTable();
  }

  populateTable() {
    this.accountService.getAccount().subscribe((result) => {
      console.log(result)
      let position = 1;
      
      for (let data in result["account"]) {
        if(result["account"][data].amount == undefined){
          let account: PeriodicElement = {
            id: result["account"][data]._id,
            position: position,
            name: result["account"][data].name,
            location: result["account"][data].account_address,
            holder: result["account"][data].account_name,
            amount: result["account"][data].opening_balance,
            date: (result["account"][data].date as string).slice(0, 10),
          };
          this.ELEMENT_DATA.push(account);
          position++;
        }
        else{
          let account: PeriodicElement = {
            id: result["account"][data]._id,
            position: position,
            name: result["account"][data].name,
            location: result["account"][data].account_address,
            holder: result["account"][data].account_name,
            amount: result["account"][data].amount,
            date: (result["account"][data].date as string).slice(0, 10),
          };
          this.ELEMENT_DATA.push(account);
          position++;
        }
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  openDelete(modal, id) {
    this.deleteitem = id;
    this.modalService.open(modal).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  deleteAccount(id) {
    this.accountService.deleteAccount(id).subscribe((result) => {
      this.modalService.dismissAll();
      this.showNotificationDelete();
      let index = this.dataSource.data.findIndex(account=>account.id==id);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  openEdit(modal, id) {
    this.accountService.getOneAccount(id).subscribe((result) => {
      console.log(result);
      this.accountData.id = result["account"]._id;
      this.accountData.name = result["account"].account_name;
      this.accountData.acc_no = result["account"].account_no;
      this.accountData.address = result["account"].account_address;
      this.accountData.amount = result["account"].amount;
      this.currentamount = parseFloat(this.accountData.amount);
      this.sameamount = parseFloat(this.accountData.amount);
      console.log(this.currentamount);
    });
    this.modalService.open(modal, this.modalOptions).result.then(
      (result) => {
        this.emptyModalFields();
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    if(searchValue == ""){
      this.currentamount = this.sameamount;
      //this.currentamount = this.currentamount + parseInt(searchValue);
    }
    else if(this.cred_debt == "credit"){
      this.currentamount = this.sameamount + parseFloat(searchValue);
    }
    else if(this.cred_debt == "debit"){
      this.currentamount = this.sameamount - parseFloat(searchValue);
    }
    else{
      this.currentamount = this.sameamount;
    }
    console.log(this.currentamount);
  }
  updateAccount(data) {
    console.log(data);
    this.accountService
      .updateAccount(data, this.accountData.id)
      .subscribe((result) => {
        this.modalService.dismissAll();
        this.showNotificationUpdate();
        this.emptyModalFields();
        this.ELEMENT_DATA = [];
        this.populateTable();
      });
  }

  openDetails(modal, id) {
    this.accountService.getOneAccount(id).subscribe((result) => {
      this.detailsData = result["account"];
      this.detailsData.date = (this.detailsData.date as string).slice(0, 10);
    });
    this.modalService.open(modal, this.modalOptions).result.then(
      (result) => {
        this.emptyModalFields();
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  emptyModalFields() {
    this.addaccount.reset();
    this.accountData = {
      name: "",
      id: "",
      acc_no: "",
      address: "",
      amount:""
    };
    this.detailsData = {
      _id: "",
      account_name: "",
      account_address: "",
      account_cnic: "",
      account_no: "",
      bank_name: "",
      opening_balance: "",
      child_account: "",
      date: "",
      name: "",
      amount: "",
    };
  }

  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Deleted Account</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center",
      }
    );
  }

  showNotificationUpdate() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Updated Account</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center",
      }
    );
  }

  private getDismissReason(reason: any): string {
    this.emptyModalFields();
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.deleteitem = "";
      return "by clicking on a backdrop";
    } else {
      "closing";
      return `with: ${reason}`;
    }
  }
  ChangingValue(event){
    console.log(event.target.value);
    this.cred_debt = event.target.value;
  }
}
