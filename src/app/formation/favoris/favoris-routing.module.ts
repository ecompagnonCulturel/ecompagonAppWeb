import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavorisPage } from './favoris.page';

const routes: Routes = [
  {
    path: '',
    component: FavorisPage
  },
  {
    path: 'favoris-detail/:idResource',
    loadChildren: () => import('./favoris-detail/favoris-detail.module').then( m => m.FavorisDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavorisPageRoutingModule {}
