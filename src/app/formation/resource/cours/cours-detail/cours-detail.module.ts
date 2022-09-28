import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { CoursDetailPageRoutingModule } from './cours-detail-routing.module';

import { CoursDetailPage } from './cours-detail.page';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {PipeModule} from '@app/_helpers/pipe/pipe.module';
import {ShareModule} from '../../../share/share.module';
import {ShareComponent} from '../../../share/share.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CoursDetailPageRoutingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatExpansionModule,
        PipeModule,
        ShareModule
    ],
  declarations: [CoursDetailPage],
  entryComponents: [ShareComponent],
})
export class CoursDetailPageModule {}
