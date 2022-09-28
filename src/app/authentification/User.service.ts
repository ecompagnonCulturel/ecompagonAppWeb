import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, from, Observable, of, ReplaySubject} from 'rxjs';
import {Storage} from '@ionic/storage';
import {NavController, Platform} from '@ionic/angular';
import {Users} from './models/users';
// simport { waitForAsync } from '@angular/core/testing';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
// import * as accounts_data from '../../assets/server/accounts.json';
import {catchError, map, switchMap, tap} from 'rxjs/operators';

const helper = new JwtHelperService;
const TOKEN_KEY = 'jwt_token';
const userUrl = '/api/User';
const cpMailUrl = '/CPEmail';
const accountURL = '/api/registration';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user: Observable<any>;
    public userData = new BehaviorSubject<Users>({
        idUsers: 0,
        nameUsers: '',
        mailUsers: '',
        CPUsers: '',
        passwordAUsers: '',
        statusUsers: '',
    });
    public userEmail: any;
    public userPwd: any;
    public currentUser: any;
    private readonly jwtTokenName = 'jwt_token';
    private authentificationUser = new ReplaySubject<string | null>(1);
    public authentificationUserObersvable = this.authentificationUser.asObservable();

    constructor(private readonly httpClient: HttpClient,
                private readonly navCtrl: NavController,
                private readonly jwthelper: JwtHelperService,
                private storage: Storage,
                private plt: Platform,
                private router: Router
    ) {
        this.loadStoredToken();
    }

    updateUser(user: any): Observable<any> {
        return this.httpClient.post(`${environment.serverURL}` + accountURL + '/update', user, {...httpOptions, responseType: 'text'})
            .pipe(
                tap(_ => {
                }),
                catchError(this.handleError<any>('Update user'))
            );
    }

    updateFcmToken(userToken: any): Observable<any> {

        return this.httpClient.post(`${environment.serverURL}` + accountURL + '/updateFcmToken', userToken, {...httpOptions, responseType: 'json'})
            .pipe(
                tap(_ => {
                })
                // , catchError(this.handleError<any>('Update user'))
            );
    }

    updateUserPwd(user: any): Observable<any> {
        return this.httpClient.post(`${environment.serverURL}` + accountURL + '/updatePwd', user, {...httpOptions, responseType: 'text'})
            .pipe(
                tap(_ => {
                })
                // , catchError(this.handleError<any>('Update user'))
            );
    }

    initUserPwd(user: any): Observable<any> {
        return this.httpClient.post(`${environment.serverURL}` + accountURL + '/initPwdNoToken', user, {
            ...httpOptions,
            responseType: 'text'
        })
            .pipe(
                tap(_ => {
                })
                // , catchError(this.handleError<any>('Update user'))
            );
    }

    forgetUserPwd(user: any): Observable<any> {
        return this.httpClient.post(`${environment.serverURL}` + accountURL + '/forgetPwd', user, {...httpOptions, responseType: 'text'})
            .pipe(
                tap(_ => {
                })
                // , catchError(this.handleError<any>('Update user'))
            );
    }

    confirmAccount(token: any): Observable<any> {
        const params = {
          token
        };
        return this.httpClient.post(`${environment.serverURL}` + accountURL + '/confirm', {
            ...httpOptions,
            responseType: 'text',
             params
        })
            .pipe(
                tap(_ => {
                })
                // , catchError(this.handleError<any>('Update user'))
            );
    }

    loadStoredToken() {
        const platformObs = from(this.plt.ready());
        this.user = platformObs.pipe(
            switchMap(() => {
                return from(this.storage.get(TOKEN_KEY));
            }),
            map(token => {
                if (token) {
                    const decode = helper.decodeToken(token);
                    //  console.log('decode', decode);
                    // this.userData.next(decode);

                } else {
                    return null;
                }
                // console.log(this.user);
            })
        );

    }

    logout() {
        this.storage.remove(TOKEN_KEY).then(() => {
            this.router.navigateByUrl('/login');
            this.userData.next(null);

        });
    }

    getUserById(id: any): Observable<any> {

        const params = {
            id
        };
        return this.httpClient.get(`${environment.serverURL}` + userUrl + '/getUserById', {
            ...httpOptions,
            responseType: 'json',
             params
        })
            .pipe(
                tap(),
                catchError(this.handleError('getUserById'))
            );
    }

    getUserByCP(CP: any): Observable<any> {
        const params = {
            CP
        };
        return this.httpClient.get(`${environment.serverURL}` + userUrl + '/getUserByCP', {
            ...httpOptions,
            responseType: 'json',
            params
        })
            .pipe(
                tap(),
                catchError(this.handleError('getUserByCP'))
            );
    }

    verifyFinishUser(CP: any): Observable<any> {

        const params = {
            cpUser: CP
        };
        return this.httpClient.get(`${environment.serverURL}` + userUrl + '/verifyFinishUser', {
            ...httpOptions,
            responseType: 'json',
            params
        })
            .pipe(
                tap(),
                catchError(this.handleError('verifyFinishUser'))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          //  console.error(error); // log to console instead
            return of(result as T);
        };
    }

}
