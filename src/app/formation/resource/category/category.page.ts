import {Component, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceAPIService} from '../resource-api.service';
import {Resources} from '../../models/resource';
import {UtilService} from '../../../util/util.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {CategoryDetailPage} from '@app/formation/resource/category/category-detail/category-detail.page';

@Component({
    selector: 'app-category',
    templateUrl: './category.page.html',
    styleUrls: ['./category.page.scss'],

})

export class CategoryPage implements OnInit {
    resource: any = [];
    category: any = [];
    selectedValues: string;
    selectAll = false;
    dataReturned: any;
    lieu: Resources[] = [];
    artiste: Resources[] = [];
    contenu: Resources[] = [];
    autre: Resources[] = [];
    region: any = [];
    all = true;

    constructor(private api: ResourceAPIService,
                private loadingController: LoadingController,
                private router: Router,
                private alertController: AlertController,
                private route: ActivatedRoute,
                private modalController: ModalController,
                private utilService: UtilService
    ) {
    }

    ngOnInit() {
        this.getAllResources();
        this.getAllCategories();
        this.resource = [];
    }


    async getAllResources() {
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();
        await this.api.getAllResources()
            .subscribe(res => {
                // réinitialisation des tableaux
                this.lieu = [];
                this.artiste = [];
                this.contenu = [];
                this.autre = [];
                this.resource = [];
//ordonner par ordre alphabétique
                res = res.sort(function(a, b) {
                    return (a.ressDesc < b.ressDesc) ? -1 : (a.ressDesc > b.ressDesc) ? 1 : 0;
                });
                // Répartition des ressources selon leur catégorie
                // console.log(res);

                res.forEach((value) => {
                    // console.log(value.ressType.trdesc);
                    const type: any = value.ressType;
                    if (type.trdesc === 'Lieux') {
                        this.lieu.push(value);
                        // console.log(1);

                    }
                    if (type.trdesc === 'Artistes et écrivains') {
                        this.artiste.push(value);
                        // console.log(2);
                    }
                    if (type.trdesc === 'Contenus culturels numériques') {
                        this.contenu.push(value);
                        // console.log(3);
                    }

                    if (type.trdesc === 'Autres ressources culturelles') {
                        this.autre.push(value);
                        //console.log(4);
                    }
                });
                // Combinaison des tableau
                this.resource = [...this.lieu, ...this.artiste, ...this.contenu, ...this.autre];

                // console.log(this.resource);
                /*  console.log(this.lieu);
                 console.log(this.artiste); */
                loading.dismiss();
            }, err => {
                // console.log(err);
                loading.dismiss();
            });
    }

    async  getAllCategories() {
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();
        await this.api.getAllCategories()
            .subscribe(res => {
                this.category = res;
                this.category = this.category.sort(function(a, b) {
                    return (a.typeOrdre < b.typeOrdre) ? -1 : (a.typeOrdre > b.typeOrdre) ? 1 : 0;
                });
                //  console.log(res);
                loading.dismiss();
            }, err => {
                console.log(err);
                loading.dismiss();
            });
    }


    async getRessourceByCat() {

        // tslint:disable-next-line:triple-equals
        // console.log(this.selectedValues);
        this.resource = [];
        if (this.selectedValues !== 'Toutes') {
            const loading = await this.loadingController.create({
                        message: 'Loading...'
                      });
             await loading.present();
            await this.api.getRessourceByCat(this.selectedValues)
                .subscribe(res => {
                    this.resource = res;
                    // initialisation du tableau
                    this.region = [];
                    res = res.sort(function(a, b) {
                        return (a.ressDesc < b.ressDesc) ? -1 : (a.ressDesc > b.ressDesc) ? 1 : 0;
                    });
                    // Récupération de la liste des régions des valeurs retournées
                    res.forEach((value) => {
                        if (value.ressRegion !== null) {
                            this.region.push(value.ressRegion);
                        }
                    });
                    // console.log(this.region)
                    if (this.region.length > 0) {
                        this.region = this.utilService.delDuplicateRegion(this.region, [{'id': '', 'regNom': ''}]);

                    }

                    //  console.log(this.region)
                    loading.dismiss();
                }, err => {
                    console.log(err);
                    loading.dismiss();
                });
        } else {
            this.resource = [];
            this.getAllResources();

        }
    }

    editResource(id: any) {
        this.router.navigate(['/resource/resource-detail', id]);
    }


    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.resource, event.previousIndex, event.currentIndex);
    }

    selectAllCategories() {
        // tslint:disable-next-line:indent
        this.category.forEach(cate => {
            // tslint:disable-next-line:indent
            cate.favored = this.selectAll;
            // tslint:disable-next-line:indent
        });
    }

    detail(idResource: any) {
        // console.log(this.selectedValues);
        this.router.navigateByUrl('home/resource/category/category-detail/' + idResource);

    }


    async openDetailModal(idResource: any) {
        const modal = await this.modalController.create({
            component: CategoryDetailPage,
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
}
