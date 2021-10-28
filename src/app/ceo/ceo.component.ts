import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ceo',
  templateUrl: './ceo.component.html',
  styleUrls: ['./ceo.component.scss']
})
export class CeoComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.router.navigate(['ceo/directors-list'])
  }

}
