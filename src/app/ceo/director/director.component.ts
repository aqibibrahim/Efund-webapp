import { convertdateToDMYFormat } from './../../helpers/dateFormatConverter';
import { DirectorService } from "./../../ceo-services/director.service";
import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalOptions,
} from "@ng-bootstrap/ng-bootstrap";
import { MatTableDataSource } from "@angular/material/table";
import { FormGroup, FormControl, Validators } from '@angular/forms';
interface PeriodicElement {
  id: number;
  name: string;
  position: number;
  email: any;
  cnic: any;
  phone: string;
  role: any;
  date: any;
}

@Component({
  selector: "app-director",
  templateUrl: "./director.component.html",
  styleUrls: ["./director.component.scss"],
})
export class DirectorComponent implements OnInit {
  public mask = [/\d/, /\d/,/\d/, /\d/,/\d/, '-', /\d/, /\d/,/\d/, /\d/,/\d/, /\d/,/\d/, '-', /\d/]
  deleteitem;
  modalOptions: NgbModalOptions;
  closeResult: string;
  displayedColumns: string[] = [
    "position",
    "name",
    "cnic",
    "email",
    "phone",
    "role",
    "date",
    "actions",
  ];
  updateData = {
    id: '',
    name: '',
    email: '',
    cnic: '',
    phone: ''
  }
  employee = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z ]*")
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    cnic: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9.-]*"),
      Validators.minLength(13),
      Validators.maxLength(18)
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern("[0-9 ]*"),
    ]),
  });
  dataSource;
  convertDateToDMY = convertdateToDMYFormat;
  ELEMENT_DATA: PeriodicElement[] = [];
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private directorService: DirectorService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.populateTable();
  }
  populateTable(){
    this.directorService.getDirectors().subscribe((result) => {
      let position = 1;
      for (let data in result["employee"]) {
        let employee: PeriodicElement = {
          id: result["employee"][data]._id,
          position: position,
          name: result["employee"][data].name,
          cnic: result["employee"][data].cnic,
          phone: result["employee"][data].phone,
          email: result["employee"][data].email,
          role: result["employee"][data].roles,
          date: (result["employee"][data].date as string).slice(0, 10),
        };
        this.ELEMENT_DATA.push(employee);
        position++;
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }
  openEdit(modal, id) {
    console.log(id);
    this.directorService.getOneDirector(id).subscribe((result) => {
      console.log(result);
      this.updateData.id = result['employee']._id
      this.updateData.name = result['employee'].name
      this.updateData.email = result['employee'].email
      this.updateData.cnic = result['employee'].cnic
      this.updateData.phone = result['employee'].phone
      console.log(this.updateData.name)
    });
    this.modalService.open(modal, this.modalOptions).result.then(
      (result) => {
        // this.emptyModalFields();
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openDelete(modal, id, index) {
    this.deleteitem = {
      id: id,
      index: index,
    };
    this.modalService.open(modal).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  updateDirector(data) {
    this.directorService.updateDirector(data, this.updateData.id).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationUpdate()
        // this.emptyModalFields()
        this.ELEMENT_DATA = []
        this.populateTable()
      }
    )
  }
  showNotificationUpdate() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Updated Employee</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }
  // emptyModalFields() {
  //   this.employee.reset()
  //   this.updateData = {
  //     id: '',
  //     name: '',
  //     email: '',
  //     address: '',
  //     phone: ''
  //   }
    
  //   this.detailsData = {
  //     _id: "",
  //     name: "",
  //     email: "",
  //     password: "",
  //     cnic: "",
  //     phone: "",
  //     date: "",
  //     roles: ""
  //   }
  // }
  deleteDirector() {
    this.directorService
      .deleteDirector(this.deleteitem.id)
      .subscribe((result) => {
        this.modalService.dismissAll();
        this.showNotificationDelete();
        this.dataSource.data.splice(this.deleteitem.index, 1);
        this.dataSource._updateChangeSubscription();
      });
  }

  private getDismissReason(reason: any): string {
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

  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Deleted Employee</span>',
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
