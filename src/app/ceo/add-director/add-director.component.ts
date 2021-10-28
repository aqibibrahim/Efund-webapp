import { DirectorService } from './../../ceo-services/director.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-director',
  templateUrl: './add-director.component.html',
  styleUrls: ['./add-director.component.scss']
})
export class AddDirectorComponent implements OnInit {
  public mask = [/\d/, /\d/,/\d/, /\d/,/\d/, '-', /\d/, /\d/,/\d/, /\d/,/\d/, /\d/,/\d/, '-', /\d/]
  director = new FormGroup({
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
      Validators.maxLength(18)
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

  get phone() {
    return this.director.get('phone')
  }

  constructor(
    private directorService: DirectorService,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

   
  }


  addDirector(data: NgForm) {
    console.log(data);
    this.directorService
      .addDirector(data)
      .subscribe(result => {
        this.showNotification();
        this._router.navigate(["/ceo/directors-list"]);
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
        );    
      })
  }

  showNotification() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully added Director</span>',
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
