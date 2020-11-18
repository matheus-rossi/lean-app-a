import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoPageLoginModule } from '@po-ui/ng-templates';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';

import { ProcessComponent } from './application/process/process.component';
import { GboComponent } from './application/process/gbo/gbo.component';
import { GboIncludeComponent } from './application/process/gbo/include/include.component';

import { PpcpmComponent } from './application/ppcpm/ppcpm.component';
import { ProjectComponent } from './application/ppcpm/project/project.component';
import { ProjectViewerComponent } from './application/ppcpm/project/project-viewer/project-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ApplicationComponent,
    ProcessComponent,
    GboComponent,
    GboIncludeComponent,
    PpcpmComponent,
    ProjectComponent,
    ProjectViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    HttpClientModule,
    PoModule,
    PoTemplatesModule,
    PoPageLoginModule,
    FormsModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
