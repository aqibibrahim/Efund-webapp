import { NgbDateFRParserFormatter } from './_services/NgbDateFRParserFormatter';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from "ngx-toastr";
import { NgbModule, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScriptLoaderService } from "./_services/script-loader.service";
import { DashboardModule } from "./dashboard/dashboard.module";
import { SettingsModule } from "./settings/settings.module";
import { LoginComponent } from "./login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { HrefPreventDefaultDirective } from './_directives/href-prevent-default.directive';
import { UnwrapTagDirective } from './_directives/unwrap-tag.directive';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AppComponent, LoginComponent, HrefPreventDefaultDirective, UnwrapTagDirective],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DashboardModule,
    SettingsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgbDatepickerModule,
  ],
  providers: [ScriptLoaderService , 
               {provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}],
  bootstrap: [AppComponent]
})
export class AppModule {}
