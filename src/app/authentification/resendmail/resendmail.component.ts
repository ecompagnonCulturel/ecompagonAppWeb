import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthenticService} from '@app/authentification/authentic.service';
import {UtilService} from '../../util/util.service';
import {Validator} from '../../_helpers/validator';

@Component({
  selector: 'app-resendmail',
  templateUrl: './resendmail.component.html',
  styleUrls: ['./resendmail.component.scss'],
})
export class ResendmailComponent implements OnInit {
  formResend: FormGroup;


  constructor(private readonly navCtrl: NavController,
              private readonly loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private router: Router,
              private fb: FormBuilder,
              private authenticService: AuthenticService,
              private UtilService: UtilService,
              private validator: Validator,) { }

  ngOnInit() {
    this.formResend = this.fb.group({
      email: ['',Validators.compose([Validators.required, Validators.email, this.validator.validateMail])],
    });
  }


  async reSendMail() {

    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.authenticService.reSendMail(this.formResend.value.email).subscribe(
        async (res) => {
          this.UtilService.successAlert('Renvoie de Courriel','Un courriel de confirmation vous a été envoyé. Veuillez confirmer votre compte');
          await loading.dismiss();
        },
        async (err) => {
         // console.log(err);
          this.UtilService.errorAlert('Renvoie de Courriel',err.error.message);
         // this.router.navigateByUrl('/resendmail', {replaceUrl: true});
          await loading.dismiss();
        })

  }


  // Easy access for form fields
  get email() {
    return this.formResend.get('email');
  }

}
