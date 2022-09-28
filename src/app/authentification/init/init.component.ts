import {Component, OnInit} from '@angular/core';
import {UserService} from '../User.service';
import {AlertController, LoadingController, MenuController, NavController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Validator} from '../../_helpers/validator';
import {Md5} from 'ts-md5/dist/md5';
import {Router, ActivatedRoute} from '@angular/router';
import * as moment from 'moment';
import {UtilService} from '../../util/util.service';
import {AppComponent} from '@app/app.component';

@Component({
    selector: 'app-init',
    templateUrl: './init.component.html',
    styleUrls: ['./init.component.scss'],
})
export class InitComponent implements OnInit {
    init: FormGroup;
    passwordType = 'password';
    passswordIsShown = false;
    cpasswordType = 'password';
    cpassswordIsShown = false;
    exist = false;
    message: any = null;
    now: any;

    constructor(private readonly navCtrl: NavController,
                private readonly loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private router: Router,
                private fb: FormBuilder,
                private  authentificationService: UserService,
                private validator: Validator,
                private readonly toastCtrl: ToastController,
                public route: ActivatedRoute,
                private utilService: UtilService,
                private menuCtrl: MenuController) {
        this.menuCtrl.enable(false);
    }

    ngOnInit() {
        this.init = this.fb.group({
            mailUsers: ['', Validators.compose([Validators.required, Validators.email, this.validator.validateMail])],
            passwordAUsers: ['', [Validators.required, Validators.minLength(6)]],
            confirmpasswordAUsers: ['', [Validators.required, Validators.minLength(6)]]
        },
            {validator: Validator.mustMatch('passwordAUsers', 'confirmpasswordAUsers')}
        );

    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
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

    async initPassword() {
        let sendUser: any;
        this.now = moment().format();
        const loading = await this.loadingCtrl.create();
        await loading.present();
        sendUser = {
            email: this.init.get('mailUsers').value,
            password: this.init.get('passwordAUsers').value,
        };
        this.sendUpadate(sendUser);
        loading.dismiss();

    }

    async sendUpadate( user) {
        const loading = await this.loadingCtrl.create();
        await loading.present();
        this.authentificationService.initUserPwd( user)
            .subscribe(s => {
                    this.utilService.successAlert('Réinitialisation', 'Opération effectuée avec succès. Cliquez sur le courriel reçu ' +
                        'pour activer votre nouveau mot de passe');
                    loading.dismiss();
                },
                err => {
                    // console.log(err);
                    this.utilService.errorAlert('Initialiser votre mot de passe', err.error);
                    loading.dismiss();
                });


    }

    PasswordVisible() {
        if (this.passswordIsShown) {
            this.passswordIsShown = false;
            this.passwordType = 'password';
        } else {
            this.passswordIsShown = true;
            this.passwordType = 'text';

        }

    }

    cPasswordVisible() {
        if (this.cpassswordIsShown) {
            this.cpassswordIsShown = false;
            this.cpasswordType = 'password';
        } else {
            this.cpassswordIsShown = true;
            this.cpasswordType = 'text';

        }

    }


    get passwordAUsers() {
        return this.init.get('passwordAUsers');
    }

    get confirmpasswordAUsers() {
        return this.init.get('confirmpasswordAUsers');
    }

    get mailUsers() {
        return this.init.get('mailUsers');
    }
}
