    import { Injectable } from '@angular/core';
    import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
    import { Observable, of } from 'rxjs';
    import { UserService } from '../authentification/User.service';
    import { take, map} from 'rxjs/operators';
    import { AlertController } from '@ionic/angular';


    @Injectable({
      providedIn: 'root'
    })
    export class AuthentificationGuard implements CanActivate {
      constructor(private router: Router,
                  private  authentificationService: UserService,
                  private alertCtrl: AlertController){

      }

      canActivate1(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
                    return this.authentificationService.user.pipe(
                    take(1),
                    map(user => {
                    if (!user) {

                    this.alertCtrl.create({
                      header: 'Non autorisé',
                      message: 'Vous n\'êtes pas autorisé à accéder à cette page.',
                      buttons: ['OK']
                    }).then(alert => alert.present());

                    this.router.navigateByUrl('/login');
                    return false;
                  } else {
                    return true;
                  }

                })
               );




             }

             canActivate2(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

                     const user = this.authentificationService.user;
                     if (!user) {

                             this.alertCtrl.create({
                               header: 'Non autorisé',
                               message: 'Vous n\'êtes pas autorisé à accéder à cette page.',
                               buttons: ['OK']
                             }).then(alert => alert.present());

                             this.router.navigateByUrl('/login');
                             return false;
                           } else {
                             return true;
                         }
                     }



canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return of(true);
    }


    }
