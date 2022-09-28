import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import {Platform} from '@ionic/angular';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { environment } from '../../../../environments/environment';
import packageJson from '../../../../../package.json';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.scss'],
})
export class AproposComponent implements OnInit {
  versionNumber: any;
  date: any;
  public version: string = packageJson.version;
  constructor( private modal: ModalController,
               private socialSharing: SocialSharing,
               private appVersion: AppVersion,
               private platform: Platform,) {
    if (this.platform.is('cordova')) {
     this.appVersion.getVersionNumber().then(
          (v) => { this.versionNumber = v;}
      );
    }else{
      this.versionNumber = '???';
    }
  }

  ngOnInit() {
    this.date = moment(`${environment.date}`).locale('fr').format('DD MMMM YYYY');
    // this.date = `${environment.serverURL}`;
  }

  closeModal() {
    this.modal.dismiss();
  }

}
