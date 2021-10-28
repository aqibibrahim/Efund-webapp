import { HeaderNavModule } from './../shared/header-nav/header-nav.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { AccountComponent } from './account/account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { AddChequebookComponent } from './add-chequebook/add-chequebook.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BankComponent } from './bank/bank.component';
import { ChequebookComponent } from './chequebook/chequebook.component';
import { EmployeeComponent } from './employee/employee.component';
import { PayeeComponent } from './payee/payee.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SettingsComponent } from './settings/settings.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddPayeeComponent } from './add-payee/add-payee.component';
import { SettingFormComponent } from './setting-form/setting-form.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { CostCenterListComponent } from './cost-center-list/cost-center-list.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AddChartofaccountsComponent } from './add-chartofaccounts/add-chartofaccounts.component';
import { ChartofaccountsComponent } from './chartofaccounts/chartofaccounts.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AccountComponent, 
    BankComponent, 
    ChequebookComponent, 
    EmployeeComponent, 
    PayeeComponent, 
    SideNavComponent,
    SettingsComponent,
    AddEmployeeComponent,
    AddAccountComponent,
    AddBankComponent,
    AddChequebookComponent,
    AddPayeeComponent,
    SettingFormComponent,
    CostCenterComponent,
    CostCenterListComponent,
    AddChartofaccountsComponent,
    ChartofaccountsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    HeaderNavModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModule,
    TextMaskModule
  ],
  entryComponents: [AddBankComponent],
  exports: [
    AddBankComponent
  ]
})
export class SettingsModule { }
