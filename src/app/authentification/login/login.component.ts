import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController, ToastController} from '@ionic/angular';
import {UserService} from '../User.service';
import {SessionService} from '../../formation/session/session.service';
import {AuthenticService} from '../authentic.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../../util/util.service';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    credentials: FormGroup;
    passwordType = 'password';
    passswordIsShown = false;

    constructor(private readonly navCtrl: NavController,
                private readonly loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private router: Router,
                private fb: FormBuilder,
                private authenticService: AuthenticService,
                private sessionService: SessionService,
                private readonly toastCtrl: ToastController,
                private menuCtrl: MenuController,
                private utilService: UtilService,
                private firebaseX: FirebaseX) {

    }

    // Easy access for form fields
    get email() {
        return this.credentials.get('email');
    }

    get password() {
        return this.credentials.get('password');
    }

    ngOnInit() {
        this.credentials = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
        this.fcmReceivMessage();

    }

    ionViewWillEnter() {
        this.menuCtrl.enable(false);
    }

    ionViewDidLeave() {
        this.router.events.subscribe(event => {
            if (this.router.url === '/init' || this.router.url === '/create') {
                this.menuCtrl.enable(false);
            }
            else {
                this.menuCtrl.enable(true);
            }
        });
    }



    async login() {
        const loading = await this.loadingCtrl.create();
        await loading.present();
        const connected = {
            mailUsers: this.credentials.value.email,
            passwordUsers: this.credentials.value.password
        };
        this.authenticService.login(connected).subscribe(
            async (res) => {
                this.authenticService.loadToken();
                this.sessionService.getActiveSession();
                await loading.dismiss();
                this.router.navigateByUrl('/home', {replaceUrl: true});
            },
            async (err) => {
                console.log(err);
                if (err.error.message === 'BAD_CREDENTIAL') {
                    this.utilService.errorAlert('Connexion', 'Courriel ou mot de passe incorrect');
                } else if (err.error.message === 'ACCOUNT_DISABLED') {
                    this.utilService.errorAlert('Connexion', 'Ce compte n\'est pas encore activé.Vous pouvez Renvoyer un nouveau courriel d\'activation');
                    this.router.navigateByUrl('/resendmail', {replaceUrl: true});
                } else /*if (err.error.message === 'Ce compte n\'existe pas') */
                {
                    this.utilService.errorAlert('Connexion', 'Ce compte n\'existe pas.');
                    // this.router.navigateByUrl('/resendmail', {replaceUrl: true});
                }
                await loading.dismiss();
            });

    }

    passwordVisible() {
        if (this.passswordIsShown) {
            this.passswordIsShown = false;
            this.passwordType = 'password';
        } else {
            this.passswordIsShown = true;
            this.passwordType = 'text';

        }

    }

    fcmReceivMessage()
    {
        this.firebaseX.onMessageReceived()
            .subscribe(data => {
                if (data.containsKey('notification_foreground')) {
                    data.foreground = true;
                }
            });
    }
}
