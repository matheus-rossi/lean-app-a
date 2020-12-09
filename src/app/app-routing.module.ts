import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  {
    path: '',
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
        path: 'home',
        component: ApplicationHomeComponent
      },
      {
      path:  'process',
      component:  ProcessComponent,
      children: [
        {
        path:  'gbo',
        component:  GboComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'include'
          },
          {
            path: 'include',
            component: GboIncludeComponent
          }
        ]
        }
      ]
    },
    {
      path: 'ppcpm',
      component: PpcpmComponent,
      children: [
        {
          path: 'project',
          component: ProjectComponent,
          children: [
            {
              path: '',
              pathMatch: 'full',
              redirectTo: 'viewer'
            },
            {
              path: 'viewer',
              component: ProjectViewerComponent
            }
          ]
        },
        {
          path: 'po',
          component: PoComponent,
          children: [
            {
              path: '',
              pathMatch: 'full',
              redirectTo: 'viewer'
            },
            {
              path: 'viewer',
              component: PoViewerComponent
            }
          ]
        }
      ]
    },
    {
      path: 'helpcenter',
      component: HelpcenterComponent,
      children: [
        {
          path: 'home',
          component: HelpcenterHomeComponent
        }
      ]
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
