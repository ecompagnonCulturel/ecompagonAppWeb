import { Component, OnInit } from '@angular/core';
import { UserService } from '../User.service';
import { AuthenticService } from '../authentic.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {AproposComponent} from './apropos/apropos.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

 /*  constructor(private router: Router) { } */
  constructor(private readonly authentificationService: UserService,
              private authenticService: AuthenticService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private readonly navCtrl: NavController,
              public modalCtrl: ModalController) {}

  ngOnInit() {}

   gotoUpdateAccountPage() {
    //  alert("moi");
    }
    logout1(): void {
          this.authentificationService.logout();
        }


    async logout() {
        await this.authenticService.logout2();
        this.navCtrl.navigateRoot(['login'], { replaceUrl: true });
    }

    async propos() {
        const modal = await this.modalCtrl.create({
            component: AproposComponent,
            cssClass: 'backTransparent',
            backdropDismiss: true
        });
        return modal.present();
    }
}
