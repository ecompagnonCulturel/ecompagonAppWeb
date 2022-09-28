import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ShareRoutingModule } from './share-routing.module';
import { ShareComponent } from './share.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';




@NgModule({
 declarations: [ShareComponent],
 exports: [ShareComponent],
  imports: [
    CommonModule,
    ShareRoutingModule,
    FormsModule,
    IonicModule,
    ShareButtonsModule,
    ShareIconsModule

  ],

})
export class ShareModule { }
