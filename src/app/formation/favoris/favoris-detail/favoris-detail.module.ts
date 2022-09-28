import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavorisDetailPageRoutingModule } from './favoris-detail-routing.module';
import { FavorisDetailPage } from './favoris-detail.page';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {PipeModule} from '@app/_helpers/pipe/pipe.module';
import {ShareModule} from '../../share/share.module';
import {ShareComponent} from '../../share/share.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FavorisDetailPageRoutingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        PipeModule,
        ShareModule
    ],
  declarations: [FavorisDetailPage],
  entryComponents: [ShareComponent],
})
export class FavorisDetailPageModule {}
