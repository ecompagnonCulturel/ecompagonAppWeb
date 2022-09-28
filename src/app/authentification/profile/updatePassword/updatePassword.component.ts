import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticService} from '../../authentic.service';
import {UserService} from '../../User.service';
import {Validator} from '../../../_helpers/validator';
import {AlertController, LoadingController} from '@ionic/angular';
import {UtilService} from '../../../util/util.service';

@Component({
    selector: 'app-initpassword',
    templateUrl: './updatePassword.component.html',
    styleUrls: ['./updatePassword.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
    updatePassword: FormGroup;
    message: any = null;
    currentUser: any;
    now: any;
    oldPasswordType = 'password';
    oldPassswordIsShown = false;
    passwordType = 'password';
    passswordIsShown = false;
    cpasswordType = 'password';
    cpassswordIsShown = false;

    constructor(private validator: Validator,
                private authenticService: AuthenticService,
                private fb: FormBuilder,
                private authentificationService: UserService,
                private readonly loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private utilService: UtilService) {
    }

    get oldPasswordAUsers() {
        return this.updatePassword.get('oldPasswordAUsers');
    }

    get passwordAUsers() {
        return this.updatePassword.get('passwordAUsers');
    }

    get confirmpasswordAUsers() {
        return this.updatePassword.get('confirmpasswordAUsers');
    }

    ngOnInit() {
        this.getCurrentUser();

        this.updatePassword = this.fb.group({
            oldPasswordAUsers: ['', [Validators.required, Validators.minLength(6)]],
            passwordAUsers: ['', [Validators.required, Validators.minLength(6)]],
            confirmpasswordAUsers: ['',  Validators.compose(
                [Validators.required, Validators.minLength(6), this.validator.validatePassword])],

        },
            {validator: Validator.mustMatch('passwordAUsers', 'confirmpasswordAUsers')}
        );

    }

    async update() {
        let sendUser: any;
        const loading = await this.loadingCtrl.create();
        await loading.present();
        sendUser = {
            mailUsers: this.currentUser.mailUsers,
            passwordUsers: this.updatePassword.get('passwordAUsers').value,
            oldPasswordAUsers: this.updatePassword.get('oldPasswordAUsers').value,

        };

        this.sendUpadate(sendUser);
        this.authenticService.loadToken();
        this.getCurrentUser();
        loading.dismiss();
        //  }


        //  }


    }

    updateCurrentUser() {
        this.authenticService.logout2();

    }

    sendUpadate(user) {
        this.authentificationService.updateUserPwd(user)
            .subscribe(userRep => {

                this.updateCurrentUser();
                this.utilService.successAlert('Modifier Mot de passe', 'Opération effectuée avec succès');

                },
                err => {
                   this.utilService.errorAlert('Modifier votre mot de passe', err.error);

                });


    }

    getCurrentUser() {
        const User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
            this.currentUser = user;
            // console.log(this.currentUser);
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

    oldPasswordVisible() {
        if (this.oldPassswordIsShown) {
            this.oldPassswordIsShown = false;
            this.oldPasswordType = 'password';
        } else {
            this.oldPassswordIsShown = true;
            this.oldPasswordType = 'text';

        }

    }
}
