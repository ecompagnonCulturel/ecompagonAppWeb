import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayFilterPipe } from './array-filter.pipe';
import { ObjectPipe } from './object.pipe';
import { SessObjectPipe } from './sess-object.pipe';



@NgModule({
  declarations: [ArrayFilterPipe, ObjectPipe, SessObjectPipe],
  imports: [
    CommonModule
  ],
    exports: [
        ArrayFilterPipe,
        ObjectPipe,
        SessObjectPipe
    ]

})
export class PipeModule { }
