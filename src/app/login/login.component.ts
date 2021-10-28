import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../shared/header-nav/header.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  show = true;
  field="password";
  loading = false;

  showforgot = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  get email(){
    return this.form.get('email')
  }
  get password(){
    return this.form.get('password')
  }
  
  forgot = new FormGroup({})

  constructor(
    private router : Router,
    private loginservice: LoginService,
    private toastr: ToastrService,
    private _header:HeaderService
  ) { }
  // hide login form and show reset passwords
  onClick(): void {
    this.show = !this.show;
    this.showforgot = !this.showforgot;         //EVENT BINDING
  }
  ngOnInit() {
  }

  login(data:NgForm){
    this.loading = true;
    this.loginservice.login(data).subscribe(
      result=>{
        this.loading = false;
        console.log(result);
        this.loginservice.username = result['name'];
        this.loginservice.email = result['email'];
        localStorage.setItem('username',result['name']);
        localStorage.setItem('email',result['email']);
        this._header.isLoggedin.next(result['name']);
        localStorage.setItem('token', result['token']);
        localStorage.setItem('userid',result['user_id']);
        localStorage.setItem('role',result['roles']);
        this.loginservice.setRole(result['roles']);
        if(result['roles']=='CEO'){
          this.showNotification()
          this.router.navigate(['ceo'])
        }
        if(result['roles']=='Director'){
          this.showNotification()
          this.router.navigate(['dashboard'])
        }
        if(result['roles']=='Accountant'){
          this.showNotification()
          this.router.navigate(['reports'])
        }
      } ,  error=>{
        var message = "Invalid Username Or Password"
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'+message+'</span>',
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
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Login Successfull</span>',
      "",
      {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }


  onChecked(event:any){
    this.field =  event.target.checked ? "text" : "password";
  }

}
