import { convertdateToDMYFormat } from './../../helpers/dateFormatConverter';
import { BankService } from "./../../settings-service/bank.service";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface PeriodicElement {
  id: number;
  name: string;
  position: number;
  branchpin: any;
  branchlocation: any;
  city: string;
  date: any;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'UBL', branchpin: '123', branchlocation: 'H-8', city:'Islamabad, Pakistan', date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', branchpin: 'asdas@gamil.com', branchlocation: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', branchpin: 'asdas@gamil.com', branchlocation: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', branchpin: 'asdas@gamil.com', branchlocation: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', branchpin: 'asdas@gamil.com', branchlocation: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},
//   // {position: 1, name: 'Salim J', branchpin: 'asdas@gamil.com', branchlocation: 44440000, city:'Islamabad, Pakistan', number: 0o322112323, date:'1-1-2020'},

// ];

@Component({
  selector: "app-bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.scss"]
})
export class BankComponent implements OnInit {
  deleteitem
  modalOptions: NgbModalOptions;
  closeResult: string;
  displayedColumns: string[] = [
    "position",
    "name",
    "branchlocation",
    "branchpin",
    "city",
    "date",
    "actions"
  ];
  convertDateToDMY = convertdateToDMYFormat;
  dataSource;
  ELEMENT_DATA: PeriodicElement[] = [];
  bankData = {
    id: '',
    name: '',
    city: '',
    location: '',
    pin: ''
  }
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private bankService: BankService,
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
    this.bankService.getBank().subscribe(result => {
      let position = 1;
      for (let data in result["bank"]) {
        let bank: PeriodicElement = {
          id: result["bank"][data]._id,
          position: position,
          name: result["bank"][data].name,
          branchlocation: result["bank"][data].location,
          branchpin: result["bank"][data].pin,
          city: result["bank"][data].city,
          date: (result["bank"][data].date as string).slice(0, 10)
        };
        this.ELEMENT_DATA.push(bank);
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

  deleteBank(id) {
    this.bankService.deleteBank(id).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationDelete()
        this.dataSource.data.splice(id, 1)
        this.dataSource._updateChangeSubscription()
      }
    )
  }

  openEdit(modal, id) {
    this.bankService.getOneBank(id).subscribe(
      result => {
        this.bankData.id = result['bank']._id
        this.bankData.name = result['bank'].name
        this.bankData.city = result['bank'].city
        this.bankData.location = result['bank'].location
        this.bankData.pin = result['bank'].pin

      }
    )
    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.emptyModalFields();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateBank(data) {
    this.bankService.updateBank(data, this.bankData.id).subscribe(
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
    this.emptyModalFields()
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
    this.bank.reset()
    this.bankData = {
      id: '',
      name: '',
      city: '',
      location: '',
      pin: ''
    }
  }

  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Deleted Bank</span>',
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
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Updated Bank</span>',
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
