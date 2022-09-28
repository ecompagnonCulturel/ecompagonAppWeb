import { createComponent } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './authentification/guards/auto-login.guard';
import { CreateComponent } from './authentification/create/create.component';
import {AuthentificationGuard} from './authentification/guards/authentification.guard';
import {ForgetComponent } from './authentification/forget/forget.component';
import {InitComponent } from './authentification/init/init.component';
import {ConfirmComponent } from './authentification/confirm/confirm.component';
import { ResendmailComponent } from './authentification/resendmail/resendmail.component';


const routes: Routes = [
{ path: 'login',
  loadChildren: () => import('./authentification/login/login.module').then( m => m.LoginModule),
  canLoad: [AutoLoginGuard]},
    {
        path: 'init',
        component: InitComponent

    }
    ,
{ path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthentificationGuard]
  },
  { path: 'create', component: CreateComponent },
   { path: 'resendmail', component: ResendmailComponent },
    {
        path: 'forget',
        component: ForgetComponent
    },
    {
        path: 'confirm/:token',
        component: ConfirmComponent
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'questionnaire',
    loadChildren: () => import('./formation/questionnaire/questionnaire.module').then( m => m.QuestionnairePageModule)
  },



    /*  {
       path: 'session',
       loadChildren: () => import('./formation/session/session/session.module').then( m => m.SessionPageModule)
     },
     {
       path: 'session',
       loadChildren: () => import('./formation/session/session.module').then( m => m.SessionPageModule)
     }, */



];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
