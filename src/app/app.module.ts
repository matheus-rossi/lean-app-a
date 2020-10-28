import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoNavbarModule } from '@po-ui/ng-components';
import { PoMenuModule } from '@po-ui/ng-components';
import { PoPageLoginModule } from '@po-ui/ng-templates';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';
import { MenuComponent } from './application/menu/menu.component';
import { ToolbarComponent } from './application/toolbar/toolbar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApplicationComponent,
    MenuComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    PoModule,
    PoTemplatesModule,
    PoNavbarModule,
    PoMenuModule,
    PoPageLoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
