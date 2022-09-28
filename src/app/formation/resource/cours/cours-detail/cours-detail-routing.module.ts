import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursDetailPage } from './cours-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CoursDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursDetailPageRoutingModule {}
