import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { 
   

  }
  isLoggedin = new Subject<any>();

}
