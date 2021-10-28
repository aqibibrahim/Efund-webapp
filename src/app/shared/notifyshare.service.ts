import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyshareService {

  constructor() { }
  
  private notifySource = new BehaviorSubject('default notification');
  currentNotify = this.notifySource.asObservable();


  changeNotify(notify: string) {
    this.notifySource.next(notify)
  }
}
