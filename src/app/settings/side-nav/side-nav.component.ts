import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
@Component({
  selector: 'settings-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  role = '';
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    
    this.role = localStorage.getItem('role');
    console.log("Side nav", this.role)
  }

}
