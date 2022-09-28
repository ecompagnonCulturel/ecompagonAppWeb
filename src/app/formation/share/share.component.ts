import { Component, OnInit } from '@angular/core';
import {socialNetworks} from './socialNetwork';
import {ModalController} from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {
 public sharingList = socialNetworks.socialShareOption;
  loader: any = null;
  sharingText = ''; //'You can download our app from playstore or use this link to download the app. And you can share awesome coupons with your loved once, Thank you';
  emailSubject = 'eCompagnon culturel:Ressource';
  recipent = [];
  sharingImage = ''; //['https://store.enappd.com/wp-content/uploads/2019/03/700x700_2-1-280x280.jpg'];
  sharingUrl = 'https://store.enappd.com';
  constructor(
      private modal: ModalController,
      private socialSharing: SocialSharing,
      private navParams: NavParams
  ) { }

    ngOnInit() {
      this.sharingUrl = this.navParams.data.url;
      this.sharingText = 'eCompagnon culturel-' + this.navParams.get('nom');
    }
    closeModal() {
      this.modal.dismiss();
    }
   /* async shareVia(shareData) {
      if (shareData.shareType === 'viaEmail') {
        this.shareViaEmail();
      } else {
        this.socialSharing[`${shareData.shareType}`](this.sharingText, this.sharingImage, this.sharingUrl)
            .then((res) => {
              this.modal.dismiss();
            })
            .catch((e) => {
              console.log('error', e);
              this.modal.dismiss();
            });
      }
    }

    shareViaEmail() {
      this.socialSharing.canShareViaEmail().then((res) => {
        this.socialSharing.shareViaEmail(this.sharingUrl, this.emailSubject, this.recipent, null, null, null).then(() => {
          this.modal.dismiss();
        });
      }).catch((e) => {
        // Error!
      });
    }*/

}
