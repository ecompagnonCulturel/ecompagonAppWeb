import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticService} from '../../authentic.service';
import {UserService} from '../../User.service';
import {Validator} from '../../../_helpers/validator';
import {Plugins} from '@capacitor/core';
import {UtilService} from '../../../util/util.service';

const {Storage} = Plugins;
import * as moment from 'moment';
import 'moment-timezone';
import {Md5} from 'ts-md5/dist/md5';
import {AlertController, LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
    updateAccount: FormGroup;
    message: any = null;
    currentUser: any;
    now: any;

    constructor(private validator: Validator,
                private authenticService: AuthenticService,
                private fb: FormBuilder,
                private authentificationService: UserService,
                private readonly loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private utilService: UtilService) {
    }

    ngOnInit() {
        this.now = moment().format();
        this.getCurrentUser();
        console.log(this.currentUser);
        this.updateAccount = this.fb.group({
            idUsers: [''],
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            mailUsers: ['', Validators.compose([Validators.required, Validators.email, this.validator.validateMail])],
            CPUsers: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
            passwordAUsers: [''],

        });
        this.updateAccount.patchValue({
            idUsers: this.currentUser.idUsers,
            firstname: this.currentUser.firstname,
            lastname: this.currentUser.lastname,
            mailUsers: this.currentUser.mailUsers,
            CPUsers: this.currentUser.CPUsers,
            passwordAUsers: this.currentUser.passwordAUsers
        });

    }


    getCurrentUser() {
        const User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
            this.currentUser = user;
            // console.log(this.currentUser);
        });
    }

    updateCurrentUser() {
        this.now = moment().format();
        this.authenticService.logout2();
         }

    async updateUser() {
        this.now = moment().format();
        let sendUser: any;
        const loading = await this.loadingCtrl.create();
        await loading.present();

        sendUser = {
            idUsers: this.updateAccount.get('idUsers').value,
            firstname: this.updateAccount.get('firstname').value,
            lastname: this.updateAccount.get('lastname').value,
            mailUsers: this.updateAccount.get('mailUsers').value,
            CPUsers: this.updateAccount.get('CPUsers').value,
            passwordUsers: this.updateAccount.get('passwordAUsers').value
        };
        this.sendUpadate(sendUser);
        this.authenticService.loadToken();
        this.getCurrentUser();
        loading.dismiss();


    }

    sendUpadate(user) {
        this.authentificationService.updateUser(user)
            .subscribe(userRep => {

                  this.updateCurrentUser();
                  this.utilService.successAlert('Modification de compte', 'Profil mofidié avec succès. Reconnectez vous pour la mise à jour de vos informations');


                },
                err => {
                    console.log(err);

                });


    }

    // Easy access for form fields
    get firstname() {
        return this.updateAccount.get('firstname');
    }

    // Easy access for form fields
    get lastname() {
        return this.updateAccount.get('lastname');
    }

    get mailUsers() {
        return this.updateAccount.get('mailUsers');
    }

    get CPUsers() {
        return this.updateAccount.get('CPUsers');
    }


}
