import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionnairePageRoutingModule } from './questionnaire-routing.module';

import { QuestionnairePage } from './questionnaire.page';
import {MatSliderModule} from '@angular/material/slider';
import {IonicRatingModule} from 'ionic4-rating';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionnairePageRoutingModule,
    ReactiveFormsModule,
    MatSliderModule,
    IonicRatingModule,

  ],
  declarations: [QuestionnairePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuestionnairePageModule {}
