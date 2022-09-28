import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSelect, LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceAPIService} from '../resource-api.service';
import {SessionService} from '../../session/session.service';
import {Resources} from '../../models/resource';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {AuthenticService} from '../../../authentification/authentic.service';
import { UtilService } from '../../../util/util.service';

@Component({
    selector: 'app-cours',
    templateUrl: './cours.page.html',
    styleUrls: ['./cours.page.scss'],
})
export class CoursPage implements OnInit {
    resource: Resources[] = [];
    cours: any = [];
    resourceCours: any = [];
    selectedValues: string;
    selectAll: boolean = false;
    lieu: Resources[] = [];
    artiste: Resources[] = [];
    contenu: Resources[] = [];
    autre: Resources[] = [];
    currentUser: any;
    currentSession: any;
    @ViewChild('selectCours', {static: false}) selectRef: IonSelect;

    constructor(public api: ResourceAPIService,
                public loadingController: LoadingController,
                public alertController: AlertController,
                public router: Router,
                public route: ActivatedRoute,
                private authenticService: AuthenticService,
                private sessionService: SessionService,
                private utilService:UtilService) {
    }

    ngOnInit() {
        this.getCurrentUser();
        this.getCurrentSession();
        this.getAllResourceCours();
        this.getAllCours();

        //console.log(this.currentSession.sessNom);

    }


    async getAllResourceCours() {
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();
       // console.log(this.api.CpEtudiant);
      //  console.log(this.api.CpEtudiant);
        await this.api.getAllResourceCours()
            //await this.api.getAllResourceCours(this.currentSession.sessNom)
            .subscribe(res => {
               // console.log(res);
                // réinitialisation des tableaux
                this.lieu = [];
                this.artiste = [];
                this.contenu = [];
                this.autre = [];
                this.resourceCours = [];
                this.resourceCours = res;
               // console.log(res);
                res=res.sort(function(a, b) {
                    return (a.ressDesc < b.ressDesc) ? -1 : (a.ressDesc > b.ressDesc) ? 1 : 0;
                });
                res.forEach((value) => {
                    let type: any = value.ressType;
                    if (type.trdesc === 'Lieux') {
                        this.lieu.push(value);
                       // console.log(type.trdesc);

                    }
                    if (type.trdesc === 'Artistes et écrivains') {
                        this.artiste.push(value);
                    }
                    if (type.trdesc === 'Contenus culturels numériques') {
                        this.contenu.push(value);
                    }

                    if (type.trdesc === 'Autres ressources culturelles') {
                        this.autre.push(value);
                    }
                });
                this.resourceCours = [...this.lieu, ...this.artiste, ...this.contenu, ...this.autre];

                loading.dismiss();
            }, err => {
                console.log(err);
                loading.dismiss();
            });
    }

    async getAllCours() {
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();
        await this.api.getAllCours()
            //await this.api.getAllCours(this.currentSession.sessNom)
            .subscribe(res => {
                this.cours = res;
                this.cours=this.cours.sort(function(a, b) {
                    return (a.coursDes < b.coursDes) ? -1 : (a.coursDes > b.coursDes) ? 1 : 0;
                });
              //  console.log(this.cours);
                loading.dismiss();
            }, err => {
                console.log(err);
                loading.dismiss();
            });
    }

    async getResourceByCours() {
        if (this.selectedValues != 'Tous') {
            let lieuc: Resources[] = [];
            let artistec: Resources[] = [];
            let contenuc: Resources[] = [];
            let autrec: Resources[] = [];
            this.resourceCours=[];
            const loading = await this.loadingController.create({
                message: 'Loading...'
            });
            await loading.present();
            await this.api.getResourceByCours(this.selectedValues)
                .subscribe(res => {
                    this.resourceCours = res;
                    res=res.sort(function(a, b) {
                        return (a.ressDesc < b.ressDesc) ? -1 : (a.ressDesc > b.ressDesc) ? 1 : 0;
                    });
                    //console.log(this.resourceCours);
                    res.forEach((value) => {
                        let type: any = value.ressType;
                        if (type.trdesc == 'Lieux') {
                            lieuc.push(value);
                           // console.log(type.cateDesc);

                        }
                        if (type.trdesc == 'Artistes et écrivains') {
                            artistec.push(value);
                        }
                        if (type.trdesc == 'Contenus culturels numériques') {
                            contenuc.push(value);
                        }

                        if (type.trdesc == 'Autres ressources culturelles') {
                            autrec.push(value);
                        }
                    });
                    this.resourceCours = [...lieuc, ...artistec, ...contenuc, ...autrec];
                                    loading.dismiss();
                }, err => {
                    console.log(err);
                    loading.dismiss();
                });
        } else {
            this.getAllResourceCours();
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.resourceCours, event.previousIndex, event.currentIndex);
    }

    detail(idResource: any) {
       // console.log(this.selectedValues);
        if ((this.selectedValues === undefined) || (this.selectedValues === 'Tous')) {
            // this.presentAlertConfirm("Veuillez choisir un cours");
            this.selectRef.open();
        } else {
          //  console.log(this.route.snapshot);
            this.router.navigateByUrl('home/resource/cours/cours-detail/' + idResource + '/' + this.selectedValues);
        }
    }

    async presentAlertConfirm(msg: string) {
        const alert = await this.alertController.create({
            header: 'Important!',
            message: msg,
            buttons: [
                {
                    text: 'Ok',
                    handler: () => {
                        this.router.navigate(['home/resource/cours']);
                    }
                }
            ]
        });

        await alert.present();
    }

    getCurrentUser() {
        let User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
            if (user != null) {
                this.currentUser = user;
                this.api.CpEtudiant = this.currentUser.CPUsers;
            }
        });
    }


   /* getCurrentSession() {

        let Session = (this.sessionService.Currentsession).asObservable();
        //console.log(Session);
        Session.subscribe(session => {
            // console.log(session[0].sessNom);
            if (session) {
                this.currentSession = session[0];
                console.log(this.currentSession);
            }


        });

    }
*/
    async getCurrentSession() {

        this.sessionService.getActiveSession().subscribe(session => {
            if (session) {
                this.currentSession = session;

            }


        });

    }


    /* customActionSheetOptions: any = {
        header: 'Colors',
        subHeader: 'Select your favorite color',

    };*/

}
