import { CostcenterService } from "./../../settings-service/costcenter.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-cost-center",
  templateUrl: "./cost-center.component.html",
  styleUrls: ["./cost-center.component.scss"]
})
export class CostCenterComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z ]*")
    ]),
    description: new FormControl("", [Validators.required])
  });

  get name() {
    return this.form.get("name");
  }
  get description() {
    return this.form.get("description");
  }

  constructor(
    private costcenterService: CostcenterService,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  addCostCenter(data: NgForm) {
    this.costcenterService.addCostcenter(data).subscribe(result => {
      if (result) {
        this.showNotification();
        this._router.navigate(["/settings/costcenter-list"]);
      }
    });
  }

  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Costcenter</span>',
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
