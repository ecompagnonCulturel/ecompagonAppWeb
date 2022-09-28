import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { IonicModule } from '@ionic/angular';

import { CoursePageRoutingModule } from './course-routing.module';

import { CoursePage } from './course.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule,
    DragDropModule,
    CoursePageRoutingModule
  ],
  declarations: [CoursePage]
})
export class CoursePageModule {}
