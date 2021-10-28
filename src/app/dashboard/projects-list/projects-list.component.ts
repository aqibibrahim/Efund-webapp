import { convertdateToDMYFormat } from './../../helpers/dateFormatConverter';
import { EmployeeService } from './../../settings-service/employee.service';
import { DashboardEmployeeService } from './../../dashboard-services/employee.service';

import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsService } from "./../../dashboard-services/projects.service";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DirectorService } from "./../../ceo-services/director.service";
interface PeriodicElement {
  id: number;
  position: number;
  details: {
    _id: any;
    purchaser: any;
    purchaser_name: any;
    supervisor: any;
    supervisor_name: any;
  };
  project_name: any;
  date_submit: string;
  description: any;
}

@Component({
  selector: "app-projects-list",
  templateUrl: "./projects-list.component.html",
  styleUrls: ["./projects-list.component.scss"]
})
export class ProjectsListComponent implements OnInit {
  deleteitem
  modalOptions: NgbModalOptions;
  closeResult: string;
  displayedColumns: string[] = [
    "position",
    "project_name",
    "date_submit",
    
    "actions"
  ];
  dataSource;
  convertDateToDMY = convertdateToDMYFormat;
  ELEMENT_DATA: PeriodicElement[] = [];
  detailsData = {
    date: "",
    _id: "",
    project_name: "",
    description: "",
    details: [{
      _id: "",
      purchaser: '',
      purchaser_name: '',
      supervisor: '',
      supervisor_name: ''
    }]
  }
  projectData = {
    date: "",
    _id: "",
    project_name: "",
    description: "",
    details: [{
      _id: "",
      purchaser: '',
      purchaser_name: '',
      supervisor: '',
      supervisor_name: ''
    }]
  }
  supervisor = []
  purchaser = []
  directors = []
  director_id:"";
  constructor(
    private projectService: ProjectsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private employeeservice: DashboardEmployeeService,
    private employeeService: EmployeeService,
    private directorService: DirectorService,
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
      centered: true
      // windowClass: 'customModal'
    }
  }

  form = new FormGroup({
    project_name: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*")
    ]),
    description: new FormControl("", [Validators.required]),
    details: new FormArray([])
  });

  get project_name() {
    return this.form.get("project_name");
  }
  get description() {
    return this.form.get("description");
  }
  get details() {
    return this.form.get("details") as FormArray;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.populateTable()
    
      // let position = 1;
      // for (let data in result["employee"]) {
      //   let employee: PeriodicElement = {
      //     id: result["employee"][data]._id,
      //     position: position,
      //     name: result["employee"][data].name,
      //     cnic: result["employee"][data].cnic,
      //     phone: result["employee"][data].phone,
      //     email: result["employee"][data].email,
      //     role: result["employee"][data].roles,
      //     date: (result["employee"][data].date as string).slice(0, 10),
      //   };
      //   this.ELEMENT_DATA.push(employee);
      //   position++;
      // }
      // this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    
  }

  getdirector(deviceValue) {
    console.log(deviceValue);
    this.director_id = deviceValue

}
  populateTable() {
    this.projectService.getProjects().subscribe(result => {
      console.log(result);
      let position = 1;
      for (let data of result["project"]) {
        let project: PeriodicElement = {
          id: data._id,
          position: position,
          project_name: data.project_name,
          description: data.description,
          date_submit: (data.date as string).slice(0, 10),
          details: data.details
        };
        this.ELEMENT_DATA.push(project);
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

  deleteProject(id) {
    this.projectService.deleteProject(id).subscribe(
      result => {
        this.modalService.dismissAll()
        this.showNotificationDelete()
        this.dataSource.data.splice(id, 1)
        this.dataSource._updateChangeSubscription()
      }
    )
  }

  openEdit(modal, id) {
    this.employeeservice.getPurchasers().subscribe(result => {
      for (let data in result["employee"]) {
        let employee = {
          _id: result["employee"][data]._id,
          name: result["employee"][data].name
        };
        this.purchaser.push(employee);
      }
    });
    this.employeeservice.getSupervisors().subscribe(result => {
      for (let data in result["employee"]) {
        let employee = {
          _id: result["employee"][data]._id,
          name: result["employee"][data].name
        };
        this.supervisor.push(employee);
      }
    });
    this.directorService.getDirectors().subscribe((result) => {
      for (let data in result["employee"]){
        let employee = {
          _id: result["employee"][data]._id,
          name: result["employee"][data].name
        };
        this.directors.push(employee);
      }
      
    });
    let promise = new Promise((resolve, reject) => {
      this.projectService.getProject(id).subscribe(
        result => {
          let det = []
          var looper = new Promise((resolve, reject) => {
            let index = 0
            for (let detail of result['project'].details) {
              this.employeeService.getOneEmployee(detail.supervisor).subscribe(
                sup => {
                  this.employeeService.getOneEmployee(detail.purchaser).subscribe(
                    purch => {
                      this.details.push(
                        new FormGroup({
                          supervisor: new FormControl(detail.supervisor, [Validators.required]),
                          purchaser: new FormControl(detail.purchaser, [Validators.required])
                        })
                      )
                      det.push({
                        _id: detail._id,
                        supervisor: detail.supervisor,
                        purchaser: detail.purchaser,
                        supervisor_name: sup['employee'].name,
                        purchaser_name: purch['employee'].name,
                      })
                    }
                  )
                }
              )
              if (index === (result['project'].details.length) - 1) {
                resolve()
              }
              index++
            }
          })
          looper.then(() => {
            let pair = {
              date: "",
              _id: "",
              project_name: "",
              description: "",
              details: [{
                _id: "",
                purchaser: '',
                purchaser_name: '',
                supervisor: '',
                supervisor_name: ''
              }]
            }
            pair.project_name = result['project'].project_name
            pair.date = (result['project'].date).slice(0, 10)
            pair._id = result['project']._id
            pair.description = result['project'].description
            pair.details = det
            this.projectData = pair
            resolve()
          })
        }
      )
    })
    promise.then(() => {
      this.modalService.open(modal, this.modalOptions).result.then((result) => {
        this.emptyModalFields();
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    })
  }

  removeProject(project: FormControl) {
    let index = this.details.controls.indexOf(project);
    this.details.removeAt(index);
  }

  addProject() {
    this.details.push(
      new FormGroup({
        supervisor: new FormControl("", [Validators.required]),
        purchaser: new FormControl("", [Validators.required])
      })
    );
  }

  updateProject(data) {
    let projectid = this.projectData._id;
    if(this.director_id == undefined){
      this.projectService.updateProject(this.projectData._id, data).subscribe(
        result => {
          this.emptyModalFields()
          this.modalService.dismissAll()
          this.showNotificationUpdate()
          this.ELEMENT_DATA = []
          this.populateTable()
        }
      )
    }
    else{
      this.projectService.updateProject(this.projectData._id, data).subscribe(
        result => {
          this.emptyModalFields()
          this.modalService.dismissAll()
          this.showNotificationUpdate()
          this.ELEMENT_DATA = []
          this.populateTable()
          console.log(projectid);
          console.log(this.director_id);
          
          let body = {
            director_id: this.director_id
          }
          this.projectService.transferProject(projectid, body).subscribe(result=>{
            console.log(result);
          });
        }
      )
    }
    
  }

  openDetails(modal, id) {
    let promise = new Promise((resolve, reject) => {
      this.projectService.getProject(id).subscribe(
        result => {
          let det = []
          var looper = new Promise((resolve, reject) => {
            let index = 0
            for (let detail of result['project'].details) {
              this.employeeService.getOneEmployee(detail.supervisor).subscribe(
                sup => {
                  this.employeeService.getOneEmployee(detail.purchaser).subscribe(
                    purch => {
                      det.push({
                        _id: detail._id,
                        supervisor: detail.supervisor,
                        purchaser: detail.purchaser,
                        supervisor_name: sup['employee'].name,
                        purchaser_name: purch['employee'].name,
                      })
                    }
                  )
                }
              )
              if (index === (result['project'].details.length) - 1) {
                resolve()
              }
              index++
            }
          })
          looper.then(() => {
            let pair = {
              date: "",
              _id: "",
              project_name: "",
              description: "",
              details: [{
                _id: "",
                purchaser: '',
                purchaser_name: '',
                supervisor: '',
                supervisor_name: ''
              }]
            }
            pair.project_name = result['project'].project_name
            pair.date = (result['project'].date).slice(0, 10)
            pair._id = result['project']._id
            pair.description = result['project'].description
            pair.details = det
            this.detailsData = pair
            resolve()
          })
        }
      )
    })
    promise.then(() => {
      this.modalService.open(modal, this.modalOptions).result.then((result) => {
        this.emptyModalFields();
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    })
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
    this.detailsData = {
      date: "",
      _id: "",
      project_name: "",
      description: "",
      details: [{
        _id: "",
        purchaser: '',
        purchaser_name: '',
        supervisor: '',
        supervisor_name: ''
      }]
    }
    this.form.reset()
    this.projectData = {
      date: "",
      _id: "",
      project_name: "",
      description: "",
      details: [{
        _id: "",
        purchaser: '',
        purchaser_name: '',
        supervisor: '',
        supervisor_name: ''
      }]
    }
    this.supervisor = []
    this.purchaser = []
    while (this.details.length > 0) {
      this.details.removeAt(0)
    }
  }
  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Deleted Project</span>',
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
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Updated Project</span>',
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
