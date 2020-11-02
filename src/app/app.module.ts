import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';

import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoPageLoginModule } from '@po-ui/ng-templates';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';
import { ProcessComponent } from './application/process/process.component';

import { GboComponent } from './application/process/gbo/gbo.component';
import { GboIncludeComponent } from './application/process/gbo/include/include.component';
import { GboHelpComponent } from './application/process/gbo/help/help.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApplicationComponent,
    ProcessComponent,
    GboComponent,
    GboIncludeComponent,
    GboHelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    PoModule,
    PoTemplatesModule,
    PoPageLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
