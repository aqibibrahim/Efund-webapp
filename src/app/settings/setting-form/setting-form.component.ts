import { SettingsService } from './../../settings-service/settings.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-setting-form',
  templateUrl: './setting-form.component.html',
  styleUrls: ['./setting-form.component.scss']
})
export class SettingFormComponent implements OnInit {

  data = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    address: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    phone: new FormControl(null, [Validators.required,  Validators.pattern(/^\d+(?:-\d+)*$/), Validators.minLength(11), Validators.maxLength(11)]),
  })

  employee = {
    name: "",
    phone: "",
    address: '',
  }

  constructor(
    private settingService: SettingsService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.populateForm()
  }

  populateForm() {
    this.settingService.getUser().subscribe(
      result => {
        this.employee = {
          name: result['employee'].name,
          phone: result['employee'].phone,
          address: result['employee'].address
        }
      }
    )
  }

  update(data: any) {
    this.settingService.updateUser(data).subscribe(
      result => {
        this.employee = {
          name: "",
          phone: "",
          address: ''
        }
        this.showNotification()
        this.data.reset()
        this.populateForm()
      },
      error=>{
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+error.message+'</span>',
          "",
          {
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-error",
            positionClass: "toast-bottom-center"
          }
        )
      }    
    )
  }

  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Settings saved successfully!</span>',
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
