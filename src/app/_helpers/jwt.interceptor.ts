/*
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from '../authentification/authentification.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authentificationService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentAccount = this.authentificationService.currentAccountValue;
        if (currentAccount && currentAccount.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentAccount.token}`
                }
            });
        }

        return next.handle(request);
    }
}
 */
