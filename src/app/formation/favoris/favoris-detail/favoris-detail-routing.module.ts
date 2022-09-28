import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavorisDetailPage } from './favoris-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FavorisDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavorisDetailPageRoutingModule {}
