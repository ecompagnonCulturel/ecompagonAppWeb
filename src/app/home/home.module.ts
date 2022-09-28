import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { UserModule } from '../authentification/user.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {NoteModule} from '@app/formation/note/note.module';
import {CommentPageModule} from '@app/formation/comment/comment.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
   // MatExpansionModule,
   // ResourcePageModule,
   // FavorisPageModule,
    UserModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    FlexLayoutModule,
    MatGridListModule,
    NoteModule,
    CommentPageModule

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
