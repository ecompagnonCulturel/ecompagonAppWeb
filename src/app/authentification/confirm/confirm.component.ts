import { Component, OnInit } from '@angular/core';
import {UserService} from '../User.service';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {FormBuilder} from '@angular/forms';
import {Validator} from '../../_helpers/validator';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthenticService } from '../authentic.service';
import { SessionService } from '../../formation/session/session.service';
import {UtilService} from '../../util/util.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

  constructor(private readonly navCtrl: NavController,
              private readonly loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private router: Router,
              private fb: FormBuilder,
              private  authentificationService: UserService,
              private validator: Validator,
              private readonly toastCtrl: ToastController,
              public route: ActivatedRoute,
              private authenticService: AuthenticService,
              private sessionService: SessionService,
              private utilService: UtilService) { }

  ngOnInit() {
    this.confirm();
  }



  async confirm()
  {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    this.authentificationService.confirmAccount(this.route.snapshot.paramMap.get('token')).subscribe(
        async (token) => {
          this.utilService.successAlert('Confirmation de courriel', 'Courriel confirmé avec succès.Veullez vous connecter avec vos identifiants');
          loading.dismiss();
        },
         (err) => {
          this.utilService.errorAlert('Confirmation de courriel', err.error);
          loading.dismiss();
        }
    );

  }

}
