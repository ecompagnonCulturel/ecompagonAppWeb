import {Component, OnInit} from '@angular/core';
import {UserService} from '../User.service';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Validator} from '../../_helpers/validator';
import {Md5} from 'ts-md5/dist/md5';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {UtilService} from '../../util/util.service';

@Component({
    selector: 'app-forget',
    templateUrl: './forget.component.html',
    styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {
    forget: FormGroup;
    passwordType = 'password';
    passswordIsShown = false;
    exist = false;
    message = null;
    now: any;
    account = false;

    constructor(private readonly navCtrl: NavController,
                private readonly loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private router: Router,
                private fb: FormBuilder,
                private  authentificationService: UserService,
                private validator: Validator,
                private readonly toastCtrl: ToastController,
                private utilService: UtilService) {
    }

    ngOnInit() {
        this.forget = this.fb.group({
            mailUsers: ['', Validators.compose([Validators.required, Validators.email, this.validator.validateMail])],
        });
    }

    async handleError(error: any): Promise<void> {
        const message = 'Unexpected error occurred: ' + error;

        const toast = await this.toastCtrl.create({
            message,
            duration: 5000,
            position: 'bottom'
        });

        toast.present();
    }

    async init() {
        this.now = moment().format();
        const sendUser: any = null;
        const loading = await this.loadingCtrl.create();
        await loading.present();
        await this.confirmInit();
        loading.dismiss();

    }

    async confirmInit() {
        const loading = await this.loadingCtrl.create();
        await loading.present();
        this.account = true;
        const sendUser = {
            email: this.forget.get('mailUsers').value
        };
        this.authentificationService.forgetUserPwd(sendUser)
            .subscribe(user => {
                    // this.authenticService.loadToken();
                    this.utilService.successAlert('Initialiser  Mot de passe', 'Un courriel de réinitialisation vous a été envoyé ');

                },
                err => {
                    this.utilService.errorAlert('Initialiser votre mot de passe', err.error);

                });


        loading.dismiss();

    }

    callInitPage() {
        this.router.navigateByUrl('init/' + this.forget.get('CPUsers').value + '/' + this.forget.get('mailUsers').value);
    }

    get mailUsers() {
        return this.forget.get('mailUsers');
    }

    get CPUsers() {
        return this.forget.get('CPUsers');
    }

}
