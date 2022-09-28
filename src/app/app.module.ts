import { NgModule } from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule} from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor} from './authentification/security/interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './_helpers/material/material.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { HomePageModule } from './home/home.module';
import { ResendmailComponent } from './authentification/resendmail/resendmail.component';
import { CreateComponent } from './authentification/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import {MatLineModule} from '@angular/material/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import {ForgetComponent } from './authentification/forget/forget.component';
import {InitComponent } from './authentification/init/init.component';
import {ConfirmComponent } from './authentification/confirm/confirm.component';
import { PipeModule } from './_helpers/pipe/pipe.module';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { DatePipe } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import {MatCardModule} from '@angular/material/card';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';




export  function tokenGetter(): string|null{
  return localStorage.getItem('jwt_token');
}
@NgModule({
  declarations: [AppComponent, CreateComponent, ForgetComponent, InitComponent, ConfirmComponent,
      ResendmailComponent],
  entryComponents: [],
    imports: [BrowserModule,
        AppRoutingModule,
        // UserModule,
        IonicModule.forRoot({
            backButtonText: '' // Set an empty string to have no text next to the back icon
        }),
        HttpClientModule,
        JwtModule.forRoot({
                config: {
                    tokenGetter/* ,
        allowedDomains:environment.allowedDomains */
                }
            }
        ),
        IonicStorageModule.forRoot(),
        BrowserAnimationsModule,
        DragDropModule,
        MaterialModule,
        ScrollingModule,
        HomePageModule,
        FormsModule,
        ReactiveFormsModule,
        MatLineModule,
        PipeModule,
        HammerModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        MatCardModule,
       // NoteModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativeStorage,
    SocialSharing,
    File,
    EmailComposer,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
      },
      Deeplinks,
      AppVersion,
      FirebaseX,
      DatePipe,
      {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
