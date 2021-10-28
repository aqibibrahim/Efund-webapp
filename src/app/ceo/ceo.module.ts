import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CeoRoutingModule } from './ceo-routing.module';
import { CeoComponent } from './ceo.component';
import { CeoSidebarComponent } from './ceo-sidebar/ceo-sidebar.component';
import { HeaderNavModule } from '../shared/header-nav/header-nav.module';
import { CeoNavbarComponent } from './ceo-navbar/ceo-navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DirectorComponent } from './director/director.component';
import { SettingsComponent } from './settings/settings.component';
import { AddDirectorComponent } from './add-director/add-director.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  declarations: [
    CeoComponent,
    CeoSidebarComponent,
    CeoNavbarComponent,
    DashboardComponent,
    DirectorComponent,
    SettingsComponent,
    AddDirectorComponent
  ],
  imports: [
    CommonModule,
    CeoRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    HeaderNavModule,
    ReactiveFormsModule,
    TextMaskModule
  ]
})
export class CeoModule { }
