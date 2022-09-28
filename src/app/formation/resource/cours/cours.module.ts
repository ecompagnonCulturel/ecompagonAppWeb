import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { CoursPageRoutingModule } from './cours-routing.module';

import { CoursPage } from './cours.page';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursPageRoutingModule,
    ScrollingModule,
    DragDropModule
  ],
  declarations: [CoursPage]
})
export class CoursPageModule {}
