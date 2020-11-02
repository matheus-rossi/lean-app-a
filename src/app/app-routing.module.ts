import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';

import { ProcessComponent } from './application/process/process.component';

import { GboComponent } from './application/process/gbo/gbo.component';
import { GboIncludeComponent } from './application/process/gbo/include/include.component';
import { GboHelpComponent } from './application/process/gbo/help/help.component';

const routes: Routes = [
  { path: '', 
    pathMatch: 'full', 
    redirectTo: 'login' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'app', 
    component: ApplicationComponent,
    children: [
      {
      path:  'process',
      component:  ProcessComponent,
      children: [
        {
        path:  'gbo',
        component:  GboComponent,
        children: [
          {
            path: 'include',
            component: GboIncludeComponent
          },
          {
            path: 'help',
            component: GboHelpComponent
          }
        ]
        }
      ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
