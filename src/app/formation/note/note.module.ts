import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import {NoteComponent} from '@app/formation/note/note.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '@app/_helpers/material/material.module';
import {IonicModule} from '@ionic/angular';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [NoteComponent],
  imports: [
    CommonModule,
    NoteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonicModule,
      MatCardModule
  ],
  exports: [NoteComponent],
  entryComponents: [NoteComponent],
})
export class NoteModule { }
