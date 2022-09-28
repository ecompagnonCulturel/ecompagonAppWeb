import {Component, OnInit} from '@angular/core';
import {FavorisService} from './favoris.service';
import {HttpClient} from '@angular/common/http';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ResourceAPIService} from '../resource/resource-api.service';
import {FavorisDetailPage} from './favoris-detail/favoris-detail.page';
import * as _ from 'lodash';
// import { SocialSharing } from '@ionic-native/social-sharing';
import {AuthenticService} from '../../authentification/authentic.service';


@Component({
    selector: 'app-favoris',
    templateUrl: './favoris.page.html',
    styleUrls: ['./favoris.page.scss'],
})

export class FavorisPage implements OnInit {
    favoris: any[];
    mailUser = 'elcarinacours@uqtr.ca';
    dataReturned: any;
    shareReturned: any;
    lieu: any = [];
    artiste: any = [];
    contenu: any = [];
    autre: any = [];
    currentUser: any;
    favorisLenggth: any;

    constructor(private readonly httpClient: HttpClient,
                private favorisService: FavorisService,
                private loadingController: LoadingController,
                private alertController: AlertController,
                private router: Router,
                private route: ActivatedRoute,
                private resourceAPIService: ResourceAPIService,
                private modalController: ModalController,
                // private socialSharing:SocialSharing
                private authenticService: AuthenticService
    ) {
    }

    ngOnInit() {
        this.getCurrentUser();
        this.getAllFavoris();

    }


    async getAllFavoris() {
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present() ;
        await this.favorisService.getFavorisByUser(this.currentUser.idUsers)
            .subscribe(res => {

                // réinitialisation des tableaux
                this.lieu = [];
                this.artiste = [];
                this.contenu = [];
                this.autre = [];
                this.favoris = [];
                this.favorisLenggth = res.length;
                let ressource = res.favResource;
                if (res.length === 0) {

                } else {
                    // Récupération de l'id resource dans Favoris
                    const tabId: any = _.map(res, 'FavResource');
                    res = res.sort(function(a, b) {
                        return (a.favResource.ressDesc < b.favResource.ressDesc) ? -1 : (a.favResource.ressDesc > b.favResource.ressDesc) ? 1 : 0;
                    });
                    res.forEach((value) => {
                        const type: any = value.favResource.ressType;

                        if (type.trdesc == 'Lieux') {
                            this.lieu.push(value.favResource);
                            //  //console.log(type.cateDesc);

                        }
                        if (type.trdesc == 'Artistes et écrivains') {
                            this.artiste.push(value.favResource);
                        }
                        if (type.trdesc == 'Contenus culturels numériques') {
                            this.contenu.push(value.favResource);
                        }

                        if (type.trdesc == 'Autres ressources culturelles') {
                            this.autre.push(value.favResource);
                        }
                    });
                    // Combinaison des tableau
                    this.favoris = [...this.lieu, ...this.artiste, ...this.contenu, ...this.autre];
                    loading.dismiss();

                }
                // //console.log(this.favoris);
                loading.dismiss();
            }, err => {
                //console.log(err);
                loading.dismiss();
            });
    }

    detail(idResource: any) {
        this.router.navigateByUrl('home/favoris/favoris-detail/' + idResource);

    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.favoris, event.previousIndex, event.currentIndex);
    }

    async openDetailModal(idResource: any) {
        const modal = await this.modalController.create({
            component: FavorisDetailPage,
            componentProps: {
                idResource,
            }
        });

        modal.onDidDismiss().then((dataReturned) => {
            if (dataReturned !== null) {
                this.dataReturned = dataReturned.data;
                // alert('Modal Sent Data :'+ dataReturned);
            }
        });
        //console.log(idResource);
        return await modal.present();
    }


    /*async openShareModal(idResource: any) {
        const modal = await this.modalController.create({
            component: SharingPage,
            componentProps: {
                idResource,
            }
        });

        modal.onDidDismiss().then((shareReturned) => {
            if (shareReturned !== null) {
                this.shareReturned = shareReturned.data;
                // alert('Modal Sent Data :'+ dataReturned);
            }
        });
        //console.log(idResource);
        return await modal.present();
    }*/


    async ShareNetwork() {
        const alert = await this.alertController.create({
            header: 'Confirmation',
            buttons: [
                {
                    text: 'Annuler',
                    handler: (data: any) => {
                        //console.log('Canceled', data);
                    }
                },
                {
                    text: 'Annuler',
                    handler: (data: any) => {
                        //console.log('Canceled', data);
                    }
                },

                {
                    text: '<img src = "./assets/trash.svg" width="35px" height="35px">Annuler',
                    handler: (data: any) => {
                        //console.log('Canceled', data);
                    }
                },
                {
                    text: 'OK',
                    handler: (data: any) => {
                        /*   this.favorisService.getFavorisResourceById(idRessource,this.idUser)
                                               .subscribe(fav => {
                                               //console.log(fav[0].id);

                                               this.favorisService.deleteFavoris(fav[0].id)
                                               .subscribe(ress => { this.closeModal();},
                                                         err => {
                                                                //console.log(err);

                                                               }) ;

                                              },
                                              err => {
                                                     //console.log(err);

                                                    }) ; */
                    }
                }
            ]
        });
        await alert.present();
    }

    getCurrentUser() {
        const User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
            this.currentUser = user;
            // this.api.CpEtudiant=this.currentUser.CPUsers;
        });
    }
}
