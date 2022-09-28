import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryPageModule } from './category/category.module';
import { CoursPageModule } from './cours/cours.module';
import { ResourcePageRoutingModule } from './resource-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ResourcePage } from './resource.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
      ReactiveFormsModule,
    IonicModule,
   ResourcePageRoutingModule,
    CategoryPageModule,
   // CategoryDetailPageModule,
    CoursPageModule,
    ScrollingModule,
    DragDropModule
   // ShareModule

  ],
  declarations: [ResourcePage],
//  entryComponents: [ShareComponent]
})
export class ResourcePageModule {}
