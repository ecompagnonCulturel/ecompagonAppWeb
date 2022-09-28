import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonRouterOutlet, LoadingController, MenuController, NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthenticService} from './authentification/authentic.service';
import {Router} from '@angular/router';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';


// tslint:disable-next-line:import-spacing
//import { FCMPluginOnIonic}  from 'cordova-plugin-fcm-with-dependecy-updated/ionic';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{


    @ViewChild(IonRouterOutlet, {static: true}) routerOutlet: IonRouterOutlet;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private menu: MenuController,
        private authenticService: AuthenticService,
        private readonly navCtrl: NavController,
        private router: Router,
        private alertCtrl: AlertController,
        private readonly loadingCtrl: LoadingController,
        private deeplinks: Deeplinks,
        private zone: NgZone,
        private firebaseX: FirebaseX
    ) {
        this.initializeApp();

    }

    initializeApp() {
        const w: any = window;
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.setUpDeepLinks();
          //  this.fcmReceivMessage();
            if (this.platform.is('ios')) {

            /*    this.firebaseX.grantPermission().then(hasPermission => {
                    if (hasPermission) {
                        //alert("has permission")
                    } else {
                        // alert("not has permission")
                    }
                });*/
            }


        });


    }

    ngOnInit(): void {
        this.routerOutlet.swipeGesture = false;

       /* this.firebaseX.onMessageReceived()
            .subscribe(data => {
                if (data.containsKey('notification_foreground')) {
                    data.foreground = true;
                }
            });*/
    }


    async logout() {
        const loading = await this.loadingCtrl.create();
        await loading.present();
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
            header: 'Voulez-vous vraiment vous déconnecter?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: (data: any) => {
                        // console.log('Canceled', data);
                    }
                },
                {
                    text: 'OK',
                    handler: async (data: any) => {

                        this.authenticService.logout2();
                        // this.router.navigateByUrl('login', { replaceUrl: true });
                        // this.router.navigate(['login']);
                        this.router.navigateByUrl('login', {replaceUrl: true});
                        //console.log('moi2');
                    }
                }],
        });
        await alert.present();

    }

    setUpDeepLinks() {
        this.deeplinks.route({
            '/questionnaire': 'questionnaire'
        }).subscribe(match => {
            console.log('bien entrée');
            const internationalPath = `/${match.$route}`;
            this.zone.run(() => {
                this.router.navigateByUrl(internationalPath);
                this.zone.run(() => {
                    this.router.navigateByUrl(internationalPath);
                });
            });
        });

    }

    async showAlert(title, msg, task) {
        const alert = await this.alertCtrl.create({
            header: title,
            subHeader: msg,
            buttons: [
                {
                    text: `Action: ${task}`,
                    handler: () => {
                        // E.g: Navigate to a specific screen
                    }
                }
            ]
        });
        alert.present();
    }

    fcmReceivMessage() {
        this.firebaseX.onMessageReceived()
            .subscribe(data => {
                if (data.containsKey('notification_foreground')) {
                    data.foreground = true;
                }

                console.log(`User opened a notification ${data}`);
                //this.firebaseX.setBadgeNumber(1);


            });
    }


}
