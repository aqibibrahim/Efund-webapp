import { EmployeeService } from "./../../settings-service/employee.service";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {convertdateToDMYFormat} from "../../helpers/dateFormatConverter";

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
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"]
})
export class EmployeeComponent implements OnInit {
  deleteitem
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
    "actions"
  ];

  convertDateToDMY = convertdateToDMYFormat;

  dataSource;
  ELEMENT_DATA: PeriodicElement[] = [];
  detailsData = {
    _id: "",
    name: "",
    email: "",
    password: "",
    cnic: "",
    phone: "",
    date: "",
    roles: ""
  }
  updateData = {
    id: '',
    name: '',
    email: '',
    address: '',
    phone: ''
  }

  employee = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z ]*")
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    address: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    phone: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern("[0-9 ]*"),
    ]),
  });


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {
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
    this.employeeService.getEmployee().subscribe(result => {
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
          date: (result["employee"][data].date as string).slice(0, 10)
        };
        this.ELEMENT_DATA.push(employee);
        position++;
      }
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    });
  }

  openDelete(modal, id, index) {
    this.deleteitem = {
      id: id,
      index: index
    }
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.deleteitem.id).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationDelete()
        this.dataSource.data.splice(this.deleteitem.index, 1)
        this.dataSource._updateChangeSubscription()
      }
    )
  }

  openEdit(modal, id) {
    this.employeeService.getOneEmployee(id).subscribe(
      result => {
        this.updateData.id = result['employee']._id
        this.updateData.name = result['employee'].name
        this.updateData.email = result['employee'].email
        this.updateData.address = result['employee'].address
        this.updateData.phone = result['employee'].phone
      }
    )
    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.emptyModalFields();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateEmployee(data) {
    this.employeeService.updateEmployee(data, this.updateData.id).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationUpdate()
        this.emptyModalFields()
        this.ELEMENT_DATA = []
        this.populateTable()
      }
    )
  }

  openDetails(modal, id) {
    this.employeeService.getOneEmployee(id).subscribe(
      result => {
        this.detailsData = result['employee']
        this.detailsData.date = (this.detailsData.date as string).slice(0, 10)
      }
    )
    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.emptyModalFields();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
    this.employee.reset()
    this.updateData = {
      id: '',
      name: '',
      email: '',
      address: '',
      phone: ''
    }
    
    this.detailsData = {
      _id: "",
      name: "",
      email: "",
      password: "",
      cnic: "",
      phone: "",
      date: "",
      roles: ""
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
        positionClass: "toast-top-center"
      }
    );
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
}
