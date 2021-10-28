import { ChartofaccountsService } from './../../settings-service/chartofaccounts.service';
import { GetDataService } from './../../dashboard-services/get-data.service';
import { ChequebookService } from './../../settings-service/chequebook.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-chartofaccounts',
  templateUrl: './add-chartofaccounts.component.html',
  styleUrls: ['./add-chartofaccounts.component.scss']
})
export class AddChartofaccountsComponent implements OnInit {

  banks = [];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    items: new FormArray([
      new FormGroup({
        item_name: new FormControl('', Validators.required)
      })
    ]) 
  });

  get name(){
    return this.form.get('name')
  }
  get items(){
    return this.form.get('items') as FormArray
  }

  constructor(
    private chequebookService: ChequebookService,
    private _router: Router,
    private toastr: ToastrService,
    private dataService: GetDataService,
    private chartofaccountservice: ChartofaccountsService
  ) {}

  ngOnInit() {

  }

  addItem(){
    this.items.push(
      new FormGroup({
        item_name: new FormControl('', Validators.required)
      })
    )
  }

  removeItem(control:AbstractControl){
    this.items.removeAt(this.items.controls.indexOf(control))
  }

  addChart(data: NgForm) {
    this.chartofaccountservice.addChartofAccounts(data).subscribe(
      result=>{
        this.showNotification();
        this._router.navigate(["/settings/chartofaccounts"]);
      },
      error=>{
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
      }
    )
  }

  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Chart of Accounts</span>',
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
