import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderNavModule } from './../shared/header-nav/header-nav.module';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PrintChequeComponent } from './print-checque/print-checque.component';
import { ReadyChequeComponent } from './ready-cheque/ready-cheque.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsAddComponent } from './projects-add/projects-add.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsListComponent } from './reports-list/reports-list.component';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import {AddBankComponent } from '../settings/add-bank/add-bank.component';
import { SettingsModule } from '../settings/settings.module';
import { ClaimChequeComponent } from './claim-cheque/claim-cheque.component';
import { ShortnumberPipe } from './shortnumber.pipe';

@NgModule({
  declarations: [
    DashboardSidebarComponent,
    PrintChequeComponent,
    ReadyChequeComponent,
    DashboardComponent,
    ProjectsListComponent,
    ProjectsAddComponent,
    ReportsComponent,
    ReportsListComponent,
    DashboardLayoutComponent,
    ClaimChequeComponent,
    ShortnumberPipe,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderNavModule,
    NgbModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    SettingsModule
  ],
  entryComponents: [AddBankComponent]
})
export class DashboardModule { }
