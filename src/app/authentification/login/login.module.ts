import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [LoginComponent],
  imports: [
  CommonModule,
   LoginRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      IonicModule,
      MatFormFieldModule,
      MatInputModule,
      MatToolbarModule,
      MatProgressSpinnerModule,
      MatCardModule,
      MatIconModule,
      RouterModule,


  ],
   exports: [LoginComponent]
})
export class LoginModule { }
