import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderNavRoutingModule } from './header-nav-routing.module';
import { HeaderNavComponent } from './header-nav.component';


@NgModule({
  declarations: [
    HeaderNavComponent
  ],
  imports: [
    CommonModule,
    HeaderNavRoutingModule,
    NgbModule
  ],
  exports: [
    HeaderNavComponent
  ]
})
export class HeaderNavModule { }
