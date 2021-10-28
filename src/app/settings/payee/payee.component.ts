import { convertdateToDMYFormat } from './../../helpers/dateFormatConverter';
import { PayeeService } from "./../../settings-service/payee.service";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface PeriodicElement {
  id: number;
  name: string;
  position: any;
  cnic: any;
  account: string;
  address: string;
  city: any;
  date: any;
}
@Component({
  selector: "app-payee",
  templateUrl: "./payee.component.html",
  styleUrls: ["./payee.component.scss"]
})
export class PayeeComponent implements OnInit {
  deleteitem
  modalOptions: NgbModalOptions;
  closeResult: string;
  convertDateToDMY = convertdateToDMYFormat;
  displayedColumns: string[] = [
    "position",
    "name",
    "cnic",
    "account",
    "address",
    "city",
    "date",
    "actions"
  ];
  dataSource;
  ELEMENT_DATA: PeriodicElement[] = [];
  payeedata = {
    id: '',
    name: '',
    address: '',
    account: '',
    city: ''
  }
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
    payee_account: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9 ]*")
    ]),
    payee_city: new FormControl(null, [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private payeeService: PayeeService,
    private modalService: NgbModal,
    private toastr: ToastrService, ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
      centered: true
      // windowClass: 'customModal'
    }
  }

  ngOnInit() {
    this.populateTable()
  }

  populateTable() {
    this.payeeService.getPayees().subscribe(result => {
      let position = 1;
      for (let data in result["payee"]) {
        let payee: PeriodicElement = {
          id: result["payee"][data]._id,
          position: position,
          name: result["payee"][data].payee_name,
          cnic: result["payee"][data].payee_cnic,
          account: result["payee"][data].payee_account,
          address: result["payee"][data].payee_address,
          city: result["payee"][data].payee_city,
          date: (result["payee"][data].date as string).slice(0, 10)
        };
        this.ELEMENT_DATA.push(payee);
        position++;
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  openDelete(modal, id) {
    this.deleteitem = id
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deletePayee(id) {
    this.payeeService.deletePayee(id).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationDelete()
        this.dataSource.data.splice(id, 1)
        this.dataSource._updateChangeSubscription()
      }
    )
  }

  openEdit(modal, id) {
    this.payeeService.getPayee(id).subscribe(
      result => {
        this.payeedata.id = result['payee']._id
        this.payeedata.name = result['payee'].payee_name
        this.payeedata.address = result['payee'].payee_address
        this.payeedata.account = result['payee'].payee_account
        this.payeedata.city = result['payee'].payee_city
      }
    )
    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.emptyModalFields();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updatePayee(data) {
    this.payeeService.updatePayee(this.payeedata.id, data).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationUpdate()
        this.emptyModalFields()
        this.ELEMENT_DATA = []
        this.populateTable()
      }
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.deleteitem = ""
      return 'by clicking on a backdrop';
    } else {
      "closing"
      return `with: ${reason}`;
    }
  }

  emptyModalFields() {
    this.addpayee.reset()
    this.payeedata = {
      id: '',
      name: '',
      address: '',
      city:'',
      account: ''
    }
  }

  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Deleted Payee</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }

  showNotificationUpdate() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Updated Payee</span>',
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
