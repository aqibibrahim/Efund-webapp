import { ProjectsService } from "./../../dashboard-services/projects.service";
import { DashboardEmployeeService } from "./../../dashboard-services/employee.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  NgForm
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: "app-projects-add",
  templateUrl: "./projects-add.component.html",
  styleUrls: ["./projects-add.component.scss"]
})
export class ProjectsAddComponent implements OnInit {
  purchaser = [];
  supervisor = [];
  form = new FormGroup({
    project_name: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*")
    ]),
    description: new FormControl("", [Validators.required]),
    details: new FormArray([
      new FormGroup({
        supervisor: new FormControl("", [Validators.required]),
        purchaser: new FormControl("", [Validators.required])
      })
    ])
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

  constructor(
    private employeeService: DashboardEmployeeService,
    private projectService: ProjectsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.populatePurchasers();
    this.populateSupervisors();
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

  populatePurchasers() {
    this.employeeService.getPurchasers().subscribe(result => {
      for (let data in result["employee"]) {
        let employee = {
          _id: result["employee"][data]._id,
          name: result["employee"][data].name
        };
        this.purchaser.push(employee);
      }
    });
  }

  populateSupervisors() {
    this.employeeService.getSupervisors().subscribe(result => {
      for (let data in result["employee"]) {
        let employee = {
          _id: result["employee"][data]._id,
          name: result["employee"][data].name
        };
        this.supervisor.push(employee);
      }
    });
  }

  doAddProject(data: NgForm) {
    this.projectService.addProject(data).subscribe(result => {
      this.showNotification();
      this.router.navigate(["/dashboard/projects-list"]);
    } ,  error=>{
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+error.message+'</span>',
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
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Projects</span>',
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
