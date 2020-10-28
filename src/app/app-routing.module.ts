import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';
import { ProcessComponent } from './application/process/process.component';

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
      path:  'gbo',
      component:  ProcessComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
