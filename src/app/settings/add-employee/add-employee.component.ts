import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeeService } from "../../settings-service/employee.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.scss"]
})
export class AddEmployeeComponent implements OnInit {
  public mask = [/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/]
 
  addemployee = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z ]*")
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ]),
    cnic: new FormControl(null, [
      Validators.required,
      Validators.pattern("[0-9.-]*"),
      Validators.minLength(13),
      Validators.maxLength(18),

    ]),
    address: new FormControl("", [
      Validators.required,
      Validators.minLength(5)
    ]),
    roles: new FormControl("", [Validators.required]),
    phone: new FormControl("", [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern(/^\d+(?:-\d+)*$/),
    ]),
  });

  get phone(){
    return this.addemployee.get('phone')
  }

  constructor(
    private employeeService: EmployeeService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  AddEmployee(addemployee: any) {
    this.employeeService
      .addEmployee(this.addemployee.value)
      .subscribe(result => {
        this.showNotification();
        this._router.navigate(["/settings/employee"]);
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

  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully added Employee</span>',
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
