import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from '../authentification/profile/update/update.component';
import { ResourcePage } from './resource/resource.page';


const routes: Routes = [

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class formationRoutingModule {}
