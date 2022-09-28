import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavorisPageRoutingModule } from './favoris-routing.module';
//import { SharingPageModule } from '../sharing/sharing.module';
import { FavorisPage } from './favoris.page';
import { CategoryDetailPageModule } from '../resource/category/category-detail/category-detail.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FavorisDetailPageModule } from './favoris-detail/favoris-detail.module';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
//import { SocialSharing } from '@ionic-native/social-sharing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavorisPageRoutingModule,
    CategoryDetailPageModule,
    ScrollingModule,
    DragDropModule,
    FavorisDetailPageModule,
    //SharingPageModule

  ],

  declarations: [FavorisPage]
})
export class FavorisPageModule {}
