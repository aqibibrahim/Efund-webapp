import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { LoginService } from '../../login/login.service';

// declare let mLayout: any;
@Component({
  selector: 'app-dashboard-sidebar',
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
})
export class DashboardSidebarComponent implements OnInit {
  role = '';

  constructor(private loginService: LoginService) {

  }
  ngOnInit() {
    this.role = localStorage.getItem('role');
   
    console.log("Dashboard sidebar", this.role)
  }
  // ngAfterViewInit() {

  //     mLayout.initAside();

  // }

}
