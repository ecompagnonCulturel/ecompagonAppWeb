import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/*
import {
} from '@angular/common/http';
*/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { UserRoutingModule } from './user-routing.module';
import {UpdateComponent } from './profile/update/update.component';
import {ProfileComponent } from './profile/profile.component';
import {UpdatePasswordComponent } from './profile/updatePassword/updatePassword.component';
import { IonicModule } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DetailComponent} from '@app/authentification/profile/detail/detail.component';
import {AproposComponent} from './profile/apropos/apropos.component';



@NgModule({
  declarations: [ProfileComponent, UpdateComponent, UpdatePasswordComponent, DetailComponent, AproposComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    RouterModule,

  ],
  entryComponents: [AproposComponent],
  exports: [RouterModule, ProfileComponent, UpdateComponent, UpdatePasswordComponent, DetailComponent, UserRoutingModule, AproposComponent]
})
export class UserModule { }
