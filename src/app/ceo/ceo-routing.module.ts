import { AddDirectorComponent } from './add-director/add-director.component';
import { SettingsComponent } from './settings/settings.component';
import { DirectorComponent } from './director/director.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CeoComponent } from './ceo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: CeoComponent,
    children: [{
      path: '',
      children: [
        { path: 'dashboard', component : DashboardComponent },
        { path: 'directors-list', component : DirectorComponent },
        { path: 'add-director', component : AddDirectorComponent },
        { path: 'settings', component : SettingsComponent },

      ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CeoRoutingModule { }
