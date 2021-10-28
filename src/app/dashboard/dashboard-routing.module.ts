import { ReportsListComponent } from './reports-list/reports-list.component';
import { ReportsComponent } from './reports/reports.component';
import { ReadyChequeComponent } from './ready-cheque/ready-cheque.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsAddComponent } from './projects-add/projects-add.component';
import { PrintChequeComponent } from './print-checque/print-checque.component';
import { ClaimChequeComponent } from './claim-cheque/claim-cheque.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [{
      path: '',
      children: [
        { path: 'menu', component : DashboardComponent },
        { path: 'print-cheque', component: PrintChequeComponent },
        { path: 'projects-add', component: ProjectsAddComponent },
        { path: 'projects-list', component: ProjectsListComponent },
        { path: 'ready-cheque', component: ReadyChequeComponent },
        { path: 'reports', component: ReportsComponent },
        { path: 'reports-list', component: ReportsListComponent },
        { path: 'claim-cheque', component: ClaimChequeComponent }
      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
