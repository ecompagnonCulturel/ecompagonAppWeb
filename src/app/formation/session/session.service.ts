import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, from, Observable, of, throwError} from 'rxjs';
import {Plugins} from '@capacitor/core';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap, catchError} from 'rxjs/operators';
import {Resources} from '@app/formation/models/resource';

const {Storage} = Plugins;
const session = '';
const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const headers = new HttpHeaders({ 'Content-Type': 'json'});

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    Currentsession: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private httpClient: HttpClient,
                public route: ActivatedRoute) {

      //  this.loadSession();


    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            return of(result as T);
        };
    }


    async loadSession() {
        this.getActiveSession();
        //Récupération de l'utilisateur stocké
        let sessions = await Storage.get({key: session});
       // console.log('set session: ', session);
        if (sessions && sessions.value) {
            // console.log('set session: ', session);
            this.Currentsession.next(JSON.parse(sessions.value));
        } else {

            this.Currentsession.next(null);
        }
    }

 /*   getActiveSession(statutSession): Observable<any> {
        console.log('sess');
        const params = {
            'sesstatut': statutSession
        };
        return this.httpClient.get(`${environment.serverURL}`+"/api/Session/getActiveSession",{ responseType: 'json', headers })
            .pipe(
                tap(sess => {}
                ),
                catchError(this.handleError('getActiveSession', []))
            );
    }*/

    getActiveSession(): Observable<any> {

        return this.httpClient.get(`${environment.serverURL}` +'/api/Session/getActiveSession',{responseType: 'json', headers})
            .pipe(
                tap(),
                catchError(this.handleError('getActiveSession', []))
            );
    }

}
