import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {environment} from '@environments/environment';
import {map, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Plugins} from '@capacitor/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from './User.service';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {FormField} from '@app/formation/models/fomField';


const {Storage} = Plugins;

const TOKEN_KEY = 'my-token';
const USER_KEY = 'currentUser';
const loginURL = '/api/login/etudiant';
const reSendURL = '/api/registration/resendMail';
const connectedURL = '/api/Connected';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),

};


@Injectable({
    providedIn: 'root'
})
export class AuthenticService {
    // Init with null to filter out the first value in a guard!
    isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    token = '';
    currentUser = new BehaviorSubject<any>({
        idUsers: 0,
        nameUsers: '',
        mailUsers: '',
        CPUsers: '',
        firstname: '',
        lastname: '',
        formField: '',
        TokenNotific: ''
    });

    constructor(private httpClient: HttpClient,
                public route: ActivatedRoute,
                private authentificationService: UserService,
                private firebaseX: FirebaseX) {
        this.loadToken();
    }


    async loadToken() {
        const token = await localStorage.getItem(TOKEN_KEY);
        /*Récupération de l'utilisateur stocké*/
        const util = await localStorage.getItem(USER_KEY);
        if (token && token) {
            // console.log('set token: ', token);
            this.token = token;
            this.isAuthenticated.next(true);
            this.currentUser.next(JSON.parse(util));

        } else {
            this.isAuthenticated.next(false);
        }
    }

    login(credentials: any): Observable<any> {

        return this.httpClient.post(`${environment.serverURL}` + loginURL, credentials, {...httpOptions, responseType: 'json'}).pipe(
            map((data: any) => {
                if (data != null) {
                   // console.log(data);
                    const userLog = {
                        nameUsers: data.nameUsers + ' ' + data.firstname,
                        mailUsers: data.mailUsers,
                        CPUsers: data.cpusers,
                        idUsers: data.idUsers,
                        firstname: data.firstname,
                        lastname: data.nameUsers,
                        formField: data.formField,
                        fcmToken: data.fcmToken
                    };
                    // Stockage de l'utilisateur connecté
                    localStorage.removeItem(USER_KEY);
                    localStorage.removeItem(TOKEN_KEY);
                    localStorage.setItem( USER_KEY, JSON.stringify(userLog));
                    localStorage.setItem(TOKEN_KEY, JSON.stringify(data.token));
                    this.getFcmToken(data.idUsers);
                    return data.token;
                }

            }),
            tap(_ => {
                this.isAuthenticated.next(true);
            })
        );
    }

    logout2(): void {
        this.isAuthenticated.next(false);
        this.currentUser.next(null);
        return localStorage.removeItem(TOKEN_KEY);
    }

    reSendMail(mail: any) {

        return this.httpClient.post(`${environment.serverURL}` + reSendURL, mail, {...httpOptions, responseType: 'json'});

    }


    async getToken(): Promise<any> {
        const item = await localStorage.getItem(TOKEN_KEY);
        return JSON.parse(item);
    }

    public saveUser(userToSave: any): void {
        localStorage.removeItem(USER_KEY);
        localStorage.setItem(USER_KEY, JSON.stringify(userToSave));
        this.isAuthenticated.next(true);
    }


    getFcmToken(userId: any) {

        this.firebaseX.getToken()
            .then(token => {
                const updateToken: FormField = {id: userId, value: token};
                this.authentificationService.updateFcmToken(updateToken).subscribe(userTokenRec => {
                    },
                    err => {
                    });
            })
            .catch(error => console.error('Error getting token', error));


    }


}
