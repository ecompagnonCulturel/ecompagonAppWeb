import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CategoryDetailPageRoutingModule } from './category-detail-routing.module';
import { CategoryDetailPage } from './category-detail.page';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {PipeModule} from '@app/_helpers/pipe/pipe.module';
import {ShareModule} from '../../../share/share.module';
import {ShareComponent} from '../../../share/share.component';




@NgModule({
    entryComponents: [ShareComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        CategoryDetailPageRoutingModule,
        MatListModule,
        MatExpansionModule,
        PipeModule,
        ShareModule

        //  FavorisPageModule
    ],
  declarations: [CategoryDetailPage]
})
export class CategoryDetailPageModule {

}
