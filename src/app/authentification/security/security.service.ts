import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {now} from 'moment';

const AUTH_API = '/users';
const accountURL = '/api/registration';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),

};


@Injectable({
    providedIn: 'root'
})
export class SecurityService {

    constructor(private http: HttpClient) {
    }


    login(credentials): Observable<any> {
        return this.http.post(`${environment.serverURL}` + AUTH_API, credentials, { ...httpOptions, responseType: 'text' });
    }

    register(user): Observable<any> {
        return this.http.post(`${environment.serverURL}` + accountURL+"/add", user, { ...httpOptions, responseType: 'json' });
    }
}
