import { Component, OnInit } from '@angular/core';
import { ResourceAPIService } from './resource-api.service';
import { SessionService } from '../session/session.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LoadingController,AlertController,ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-resource',
    templateUrl: './resource.page.html',
    styleUrls: ['./resource.page.scss'],
})
export class ResourcePage implements OnInit {
    resource: any= [];
    lieu:any = [];
    artiste:any = [];
    contenu: any = [];
    autre:any = [];
    currentSession:any={};
    constructor(private api: ResourceAPIService,
                private loadingController: LoadingController,
                private router: Router,
                private alertController: AlertController,
                private route: ActivatedRoute,
                private sessionService:SessionService
    ) { }

    ngOnInit() {
        /* if (this.getCurrentSession())
        {

        } */
        this.getCurrentSession();
        this.getAllResources();
    }



    getAllResources() {
        /*    const loading = await this.loadingController.create({
              message: 'Loading...'
            });
            await loading.present();  await*/
        this.api.getAllResources()
            .subscribe(res => {
                // réinitialisation des tableaux
                this.lieu = [];
                this.artiste = [];
                this.contenu = [];
                this.autre = [];
                this.resource=[];
                //Répartition des ressources selon leur catégorie
                //console.log(res);
                res.forEach((value) => {
                    const type: any = value.ressType;
                    if (type.cateDesc === 'Lieux')
                    {
                        this.lieu.push(value);
                        // console.log(type.cateDesc);

                    }
                    if(type.cateDesc === 'Artistes et écrivains')
                    {
                        this.artiste.push(value);
                    }
                    if(type.cateDesc === 'Contenus culturels numériques')
                    {
                        this.contenu.push(value);
                    }

                    if(type.cateDesc === 'Autres ressources culturelles')
                    {
                        this.autre.push(value);
                    }
                });
                //Combinaison des tableau
                this.resource = [...this.lieu,...this.artiste,...this.contenu,...this.autre]
                /*  console.log(this.lieu);*/
                // console.log(this.resource);
               // loading.dismiss();
            }, err => {
                //console.log(err);
                //loading.dismiss();
            });
    }



    getCurrentSession()
    {

        const Session = (this.sessionService.Currentsession).asObservable();
        // console.log(Session);
        Session.subscribe(session => {
            //  console.log(session);
            if (session)
            {
                this.currentSession = session;
                // console.log(this.currentSession);
            }


        });

    }




}
