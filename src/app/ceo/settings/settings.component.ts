import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  setting = new FormGroup({
    name : new FormControl(null,[Validators.required, Validators.minLength(3)]),
    occupation : new FormControl(null,[Validators.required, Validators.minLength(3)]),
    address : new FormControl('',[Validators.required, Validators.minLength(5)]),
    phone : new FormControl(null,[Validators.required, Validators.pattern(/^\d+(?:-\d+)*$/), Validators.minLength(11), Validators.maxLength(11)]),
  })
  constructor(
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  Setting(setting:any){
    this.showNotification()
  }

  showNotification(){
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

  update(form){
    
  }

}
