import { ChartofaccountsComponent } from './chartofaccounts/chartofaccounts.component';
import { AddChartofaccountsComponent } from './add-chartofaccounts/add-chartofaccounts.component';
import { CostCenterListComponent } from './cost-center-list/cost-center-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { AccountComponent } from './account/account.component';
import { BankComponent } from './bank/bank.component';
import { PayeeComponent } from './payee/payee.component';
import { EmployeeComponent } from './employee/employee.component';
import { ChequebookComponent } from './chequebook/chequebook.component';
import { SettingFormComponent } from './setting-form/setting-form.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { AddChequebookComponent } from './add-chequebook/add-chequebook.component';
import { AddPayeeComponent } from './add-payee/add-payee.component';
import { CostCenterComponent } from './cost-center/cost-center.component';


const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
      children: [
        { path:'account',component: AccountComponent},
        { path:'bank',component:BankComponent  },
        { path:'payee',component:PayeeComponent  },
        { path:'employee',component:EmployeeComponent  },
        { path:'chequebook',component:ChequebookComponent  },
        { path:'setting',component:SettingFormComponent  },
        { path:'add-employee',component:AddEmployeeComponent  },
        { path:'add-account',component:AddAccountComponent  },
        { path:'add-bank',component:AddBankComponent  },
        { path:'add-chequebook',component:AddChequebookComponent  },
        { path:'add-payee',component:AddPayeeComponent  },
        { path:'costcenter-list',component:CostCenterListComponent  },
        { path:'add-costcenter',component:CostCenterComponent  },
        { path:'add-chartofaccounts',component:AddChartofaccountsComponent  },
        { path:'chartofaccounts',component:ChartofaccountsComponent  },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
