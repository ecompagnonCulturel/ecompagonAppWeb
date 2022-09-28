import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentPageRoutingModule } from './comment-routing.module';

import { CommentPage } from './comment.page';
import {MatIconModule} from '@angular/material/icon';
import {MaterialModule} from '@app/_helpers/material/material.module';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        CommentPageRoutingModule,
        MatIconModule,
        MaterialModule,
        MatCardModule
    ],
  declarations: [CommentPage]
})
export class CommentPageModule {}
