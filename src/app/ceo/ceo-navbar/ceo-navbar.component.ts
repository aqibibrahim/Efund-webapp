import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ceo-navbar',
  templateUrl: './ceo-navbar.component.html',
  styleUrls: ['./ceo-navbar.component.scss']
})
export class CeoNavbarComponent implements OnInit {
  shownotification = false;
  showprofile = false;
  constructor() { }

  ngOnInit() {
  }

  toggleNotification() {
    this.shownotification = !this.shownotification
    this.showprofile = false;
  }

  toggleProfile() {
    this.showprofile = !this.showprofile
    this.shownotification = false;
  }

}
