import { Injectable } from '@angular/core';
import { CanLoad, Router,Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticService } from '../authentic.service';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationGuard implements CanLoad {
  constructor(private authService: AuthenticService, private router: Router) { }
  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
        filter(val => val !== null), // Filter out initial Behaviour subject value
        take(1), // Otherwise the Observable doesn't complete!
        map(isAuthenticated => {
          if (isAuthenticated) {
          //console.log(1);
            return true;
          } else {
           // console.log(2);
            this.router.navigateByUrl('login',{ replaceUrl: true });
            // console.log(3);
            return false;
          }
        })
    );
  }
}
