import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from '../authentification/profile/update/update.component';
import { ProfileComponent } from '../authentification/profile/profile.component';
import { HomePage } from './home.page';
import { ResourcePage } from '../formation/resource/resource.page';
import { AuthentificationGuard } from '../authentification/guards/authentification.guard';

const routes: Routes = [
    { path: '',
      component: HomePage,

    },
    {
        path: 'resource',
        loadChildren: () => import('../formation/resource/resource.module').then( m => m.ResourcePageModule),
     },
     {
             path: 'favoris',
             loadChildren: () => import('../formation/favoris/favoris.module').then( m => m.FavorisPageModule),
          },
     {
         path: 'questionnaire',
         loadChildren: () => import('../formation/questionnaire/questionnaire.module').then( m => m.QuestionnairePageModule),
      }
    /*
    { path: 'home',
        loadChildren: () => import('./home.module').then( m => m.HomePageModule),
        canLoad: [AuthentificationGuard]
    },
      {
            path: 'home/resource',
            component: ResourcePage
        },

    { path: '', redirectTo: 'home/resource', pathMatch: 'full' },
 */

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
