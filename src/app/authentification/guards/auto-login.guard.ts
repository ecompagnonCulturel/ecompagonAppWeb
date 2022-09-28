import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticService } from '../authentic.service';
import { filter, map, take } from 'rxjs/operators';
import { SessionService } from '../../formation/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthenticService,
              private router: Router) { }
  canLoad(): Observable<boolean> {

    return this.authService.isAuthenticated.pipe(
        filter(val => val !== null), // Filter out initial Behaviour subject value
        take(1), // Otherwise the Observable doesn't complete!
        map(isAuthenticated => {
          if (isAuthenticated) {
            this.router.navigateByUrl('home', { replaceUrl: true });
          } else {
            return true;
          }
        })
    );
  }

  /* getConnectedUser() {

  return this.authService.currentUser.pipe(
          filter(val => val !== null), // Filter out initial Behaviour subject value
          take(1), // Otherwise the Observable doesn't complete!
          map(user => {console.log(user)}))
    // return this.currentUser.getValue();
   } */


}
