import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatDividerModule} from '@angular/material/divider';
import { IonicModule  } from '@ionic/angular';
import { PipeModule } from '../../../_helpers/pipe/pipe.module';
import { CategoryPage } from './category.page';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ScrollingModule,
        DragDropModule,
        IonicModule,
        MatDividerModule,
        PipeModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        //  FavorisPageModule


    ],
  declarations: [CategoryPage],
    entryComponents: []
})

export class CategoryPageModule {}

