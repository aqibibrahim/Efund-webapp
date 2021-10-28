import { convertdateToDMYFormat } from "./../../helpers/dateFormatConverter";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ChequebookService } from "../../settings-service/chequebook.service";
import { NgbModalOptions, NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators } from "@angular/forms";

interface PeriodicElement {
  id: any;
  position: number;
  bank_name: string;
  cheque_no: any;
  chequebook_name: string;
  date: any;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'UBL', payee: 'Payee 1', cheque: '001', amount:'Pkr 55555', date:'1-1-2020'},
//   {position: 2, name: 'UBL', payee: 'Payee 2', cheque: '001', amount:'Pkr 55555', date:'1-1-2020'},
//   {position: 3, name: 'UBL', payee: 'Payee 3', cheque: '001', amount:'Pkr 55555', date:'1-1-2020'},
//   {position: 4, name: 'UBL', payee: 'Payee 4', cheque: '001', amount:'Pkr 55555', date:'1-1-2020'},
//   {position: 5, name: 'UBL', payee: 'Payee 5', cheque: '001', amount:'Pkr 55555', date:'1-1-2020'},

// ];

@Component({
  selector: "app-chequebook",
  templateUrl: "./chequebook.component.html",
  styleUrls: ["./chequebook.component.scss"],
})
export class ChequebookComponent implements OnInit {
  deleteitem;
  modalOptions: NgbModalOptions;
  closeResult: string;
  accounts = [];
  displayedColumns: string[] = ["position", "bank_name", "cheque_no", "chequebook_name", "date", "actions"];
  dataSource;
  convertDateToDMY = convertdateToDMYFormat;
  ELEMENT_DATA: PeriodicElement[] = [];

  detailsData = {
    status: "",
    _id: "",
    chequebook_bank: "",
    chequebook_name: "",
    name: "",
    details: "",
    chequebook_st_no: "",
    chequebook_end_no: "",
    account_id: "",
    date: "",
  };
  chequedata = {
    id: "",
    name: "",
  };
  addchequebook = new FormGroup({
    chequebook_name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z ]*")]),
  });

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private chequeservice: ChequebookService, private modalService: NgbModal, private toastr: ToastrService) {
    this.modalOptions = {
      backdrop: "static",
      backdropClass: "customBackdrop",
      size: "lg",
      centered: true,
      // windowClass: 'customModal'
    };
  }

  ngOnInit() {
    this.populateTable();
  }

  populateTable() {
    this.chequeservice.getChequeBooks().subscribe((result) => {
      let position = 1;
      console.log(result);
      for (let data in result["chequebook"]) {
        let cheque: PeriodicElement = {
          position: position,
          bank_name: result["chequebook"][data].bank_name,
          cheque_no: result["chequebook"][data].chequebook_st_no,
          chequebook_name: result["chequebook"][data].user_name,
          date: result["chequebook"][data].date.slice(0, 10),
          id: result["chequebook"][data]._id,
        };
        position++;
        this.ELEMENT_DATA.push(cheque);
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

  deleteChequebook(id) {
    this.chequeservice.deleteChequebook(id).subscribe((result) => {
      this.modalService.dismissAll();
      this.showNotificationDelete();
      this.dataSource.data.splice(id, 1);
      this.dataSource._updateChangeSubscription();
    });
  }

  openEdit(modal, id) {
    this.chequeservice.getChequeBook(id).subscribe((result) => {
      this.chequedata.id = result["chequebook"]._id;
      this.chequedata.name = result["chequebook"].user_name;
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

  updateChequebook(data) {
    this.chequeservice.updateChequebook(this.chequedata.id, data).subscribe((result) => {
      this.modalService.dismissAll();
      this.showNotificationUpdate();
      this.emptyModalFields();
      this.ELEMENT_DATA = [];
      this.populateTable();
    });
  }

  openDetails(modal, id) {
    this.chequeservice.getChequeBook(id).subscribe((result) => {
      this.detailsData = result["chequebook"];
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

  emptyModalFields() {
    this.addchequebook.reset();
    this.chequedata = {
      id: "",
      name: "",
    };
    this.detailsData = {
      status: "",
      _id: "",
      chequebook_bank: "",
      chequebook_name: "",
      name: "",
      details: "",
      chequebook_st_no: "",
      chequebook_end_no: "",
      account_id: "",
      date: "",
    };
  }

  showNotificationDelete() {
    this.toastr.info('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Deleted Chequebook</span>', "", {
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: "toast-top-center",
    });
  }

  showNotificationUpdate() {
    this.toastr.info('<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Updated Chequebook</span>', "", {
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: "toast-top-center",
    });
  }
}
