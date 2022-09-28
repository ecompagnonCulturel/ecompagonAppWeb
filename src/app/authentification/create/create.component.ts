import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController, ToastController} from '@ionic/angular';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {UserService} from '../User.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../../formation/session/session.service';
import {AuthenticService} from '../authentic.service';
import {SecurityService} from '../security/security.service';
import {UtilService} from '../../util/util.service';
import {Validator} from '../../_helpers/validator';
import {Router} from '@angular/router';
import * as moment from 'moment';
import 'moment-timezone';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';


@Component({
    selector: 'app-Create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
    public fcmToken: any ;
    account: FormGroup;
    passwordType = 'password';
    passswordIsShown = false;
    cpasswordType = 'password';
    cpassswordIsShown = false;
    exist = false;
    message: any = null;
    now: any;
    mailConfirm: any;
    passwordConfirm;
    any;

    constructor(private readonly navCtrl: NavController,
                private readonly loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private router: Router,
                private fb: FormBuilder,
                private  authentificationService: UserService,
                private authenticService: AuthenticService,
                private sessionService: SessionService,
                private readonly toastCtrl: ToastController,
                private validator: Validator,
                private securityService: SecurityService,
                private emailComposer: EmailComposer,
                private utilService: UtilService,
                private firebaseX: FirebaseX,
                private menuCtrl: MenuController) {
        this.menuCtrl.enable(false);

    }

    ngOnInit() {

        this.account = this.fb.group({
                idUsers: [''],
                nameUsers: ['', [Validators.required]],
                firstname: ['', [Validators.required]],
                mailUsers: ['', Validators.compose([Validators.required, Validators.email, this.validator.validateMail])],
                CPUsers: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
                passwordAUsers: ['', [Validators.required, Validators.minLength(6)]],
                confirmpasswordAUsers: ['', [Validators.required, Validators.minLength(6)]]
            },
            {validator: Validator.mustMatch('passwordAUsers', 'confirmpasswordAUsers')}
        );
        this.initialiseExist();

       /* this.firebaseX.getToken()
            .then(token => {
                console.log(`The token is ${token}`);
                this.fcmToken = token;

            })// save the token server-side and use it to push notifications to this device
            .catch(error => console.error('Error getting token', error));*/

      /*  this.firebaseX.onTokenRefresh()
            .subscribe((token: string) => console.log(`Got a new token ${token}`));*/

    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }


    async create() {
        this.now = moment().format();
        let sendUser: any;
        const loading = await this.loadingCtrl.create();
        await loading.present();
        sendUser = {

            firstname: this.account.get('firstname').value,
            lastname: this.account.get('nameUsers').value,
            mailUsers: this.account.get('mailUsers').value,
            CPUsers: this.account.get('CPUsers').value,
            passwordUsers: this.account.get('passwordAUsers').value,
            fcmToken: this.fcmToken
        };
        this.sendCreate(sendUser);
        loading.dismiss();
    }

    async sendCreate(sendUser) {
        const loading = await this.loadingCtrl.create();
        await loading.present();
        if (sendUser != null) {
            this.mailConfirm = sendUser.mailUsers;
            this.passwordConfirm = sendUser.passwordAUsers;
            await this.securityService.register(sendUser)
                .subscribe(async rep => {
                        this.utilService.successAlert('Création de Compte', 'Un courriel de confirmation vous a été envoyé. Veuillez confirmer votre compte');
                        loading.dismiss();
                    },
                    async err => {
                        this.utilService.errorAlert('Création de Compte', err.error.message);
                        //  console.log(err);
                        loading.dismiss();
                    });
        }
    }

    initialiseExist() {
        this.exist = false;

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

    sendMail() {
        this.emailComposer.isAvailable().then((available: boolean) => {
            if (available) {
                console.log(available);
            } else {
                console.log(!available);
            }
        });
    }

    // Easy access for form fields
    get nameUsers() {
        return this.account.get('nameUsers');
    }

    get mailUsers() {
        return this.account.get('mailUsers');
    }

    get CPUsers() {
        return this.account.get('CPUsers');
    }

    get passwordAUsers() {
        return this.account.get('passwordAUsers');
    }

    get confirmpasswordAUsers() {
        return this.account.get('confirmpasswordAUsers');
    }

    get firstname() {
        return this.account.get('firstname');
    }

}
