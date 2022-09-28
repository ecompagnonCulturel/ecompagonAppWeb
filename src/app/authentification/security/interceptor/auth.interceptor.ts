import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest,HttpResponse} from '@angular/common/http';
import {TokenService} from '../token.service';
import {AuthenticService} from '../../authentic.service';
import {EMPTY, Observable, throwError,from } from 'rxjs';
import {AlertController, LoadingController, MenuController, NavController, ToastController} from '@ionic/angular';
import {catchError, delay, finalize, map, retryWhen, tap,switchMap } from 'rxjs/operators';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private tok: any;

    constructor(private token: TokenService,
                private authenticService: AuthenticService,
                private loadingCtrl: LoadingController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
           return from(this.authenticService.getToken())
            .pipe(
                switchMap(token => {
                    if (token) {
                        req = req.clone({ headers: req.headers.set('Authorization',  token) });
                    }

                    if (!req.headers.has('Content-Type')) {
                        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
                    }

                    return next.handle(req).pipe(
                        map((event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                                // do nothing for now
                            }
                            return event;
                        }),
                        catchError((error: HttpErrorResponse) => {
                            const status =  error.status;
                            const reason = error && error.error.reason ? error.error.reason : '';
                            return throwError(error);
                        })
                    );
                })
            );


    }

}
