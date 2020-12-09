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
import { ApplicationHomeComponent } from './application/application-home/application-home.component';

import { ProcessComponent } from './application/process/process.component';
import { GboComponent } from './application/process/gbo/gbo.component';
import { GboIncludeComponent } from './application/process/gbo/include/include.component';

import { PpcpmComponent } from './application/ppcpm/ppcpm.component';
import { ProjectComponent } from './application/ppcpm/project/project.component';
import { ProjectViewerComponent } from './application/ppcpm/project/project-viewer/project-viewer.component';
import { PoComponent } from './application/ppcpm/po/po.component';
import { PoViewerComponent } from './application/ppcpm/po/po-viewer/po-viewer.component';

import { HelpcenterComponent } from './application/helpcenter/helpcenter.component';
import { HelpcenterHomeComponent } from './application/helpcenter/helpcenter-home/helpcenter-home.component';

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
    ProjectViewerComponent,
    ApplicationHomeComponent,
    HelpcenterComponent,
    HelpcenterHomeComponent,
    PoComponent,
    PoViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
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
