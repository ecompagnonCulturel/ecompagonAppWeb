import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, LoadingController, IonSlides } from '@ionic/angular';
import { ResourceAPIService } from '../../resource-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Resources } from '../../../models/resource';
import { Favoris } from '../../../models/favoris';
import { Users } from '../../../../authentification/models/users';
import { catchError, tap, map, take } from 'rxjs/operators';
import { FavorisService } from '../../../favoris/favoris.service';
import { UserService } from '../../../../authentification/User.service';
import { AuthenticService  } from '../../../../authentification/authentic.service';
import { NoteService } from '../../../note/note.service';
import { SessionService } from '../../../session/session.service';
import { CommentService } from '../../../comment/comment.service';
import { UtileService } from '../../../../_helpers/utile/utile.service';
import {UtilService} from '../../../../util/util.service';
import * as moment from 'moment';
import {ShareComponent} from '../../../share/share.component';
import { ModalController } from '@ionic/angular';
import {NoteComponent} from '@app/formation/note/note.component';
import {MatDialog} from '@angular/material/dialog';
import {red} from '@material-ui/core/colors';
import {CommentPage} from '@app/formation/comment/comment.page';


@Component({
    selector: 'app-cours-detail',
    templateUrl: './cours-detail.page.html',
    styleUrls: ['./cours-detail.page.scss'],
})
export class CoursDetailPage implements OnInit {
    cours: any = [];
    courslength: any;
// tslint:disable-next-line:max-line-length
    resource: any = {} ;
   // idResource: any;
    isLoadingResults = false;
    pictureResourceUrl: any;
    coursResIntention: any;
    nomCours: any;
    mailUser = 'elcarinacours@uqtr.ca';
    session: any = [];
    favoris: Favoris;
    dejaFavoris = false;
    typeRes: any;
    currentUser: any;
    notes: any;
    noteLength: any;
    currentSession: any;
    comments: any;
    commentlength: any;
    commentAndUsers: any = [];
    now: any;
    resAvatar: any;
    showMore = false;

    @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;

    sliderTwo: any;

    // Configuration for each Slider
    slideOptsTwo = {
        initialSlide: 1,
        slidesPerView: 1,
        loop: true,
        centeredSlides: true,
        spaceBetween: 5
    };

    constructor(public api: ResourceAPIService,
                public alertController: AlertController,
                public loadingController: LoadingController,
                public route: ActivatedRoute,
                public router: Router,
                private  favorisService: FavorisService,
                private authentificationService: UserService,
                private authenticService: AuthenticService,
                private noteService: NoteService,
                private sessionService: SessionService,
                private commentService: CommentService,
                private utileService: UtileService,
                private utilService: UtilService,
                public modalCtrl: ModalController,
                private dialog: MatDialog)
    {
        // Item object for Nature
        this.sliderTwo  =
            {
                isBeginningSlide: true,
                isEndSlide: false,
            };

    }

    ngOnInit() {
       // this.idResource = this.route.snapshot.paramMap.get('idResource');
        this.getResourceCoursById();
        this.getCurrentUser();
        this.getCurrentSession();
        this.getCommentsByResource();
    }


    async getResourceCoursById() {
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });

        if (this.route.snapshot.paramMap.get('idCours') === 'null') {
            this.presentAlertConfirm('Vous n\'avez pas choisit de cours');
        } else {
            this.isLoadingResults = true;
            this.getRessourceCours(this.route.snapshot.paramMap.get('idResource'));
            await this.api.getResourceCoursById(this.route.snapshot.paramMap.get('idResource'), this.route.snapshot.paramMap.get('idCours'))
                .subscribe(res => {

                    this.resource = res[0].coursResResource;
                    this.typeRes = res[0].coursResResource.ressType.trDesc;
                    this.resAvatar = res[0].coursResResource.ressType.travatar;
                    this.favorisService.getFavorisByUserAndResources
                    (this.route.snapshot.paramMap.get('idResource'), this.currentUser.idUsers)
                        .subscribe(fav => {

                                if (fav.length >= 1)
                                {
                                    this.dejaFavoris = true;
                                }
                                else
                                {
                                    this.dejaFavoris = false;
                                }

                            }
                            , err => {
                                console.log(err);
                                this.isLoadingResults = false;
                            });


                    this.isLoadingResults = false;

                }, err => {
                    console.log(err);
                    this.isLoadingResults = false;
                });
        }
    }

    async presentAlertConfirm(msg: string) {
        const alert = await this.alertController.create({
            header: 'Warning!',
            message: msg,
            buttons: [
                {
                    text: 'Okay',
                    handler: () => {
                        this.router.navigate(['']);
                    }
                }
            ]
        });

        await alert.present();
    }



    async saveFavoris(idResource) {
        this.now = (moment().locale('ru')).format();
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        this.isLoadingResults = true;

        await this.api.getResourceById(idResource)
            .subscribe(res => {
                this.favorisService.getFavorisByUser(this.currentUser.idUsers)
                    .subscribe(AllFav => {

                            const favori = {
                                id: 0,
                                favUser: this.currentUser.idUsers,
                                favResource: res.id,
                                favDateModif: this.now,
                                favStatus: 1,
                                favSession: this.currentSession.id
                            };
                            //     console.log(favori);
                            this.favorisService.addFavoris(favori)
                                .subscribe(fav => {
                                        this.dejaFavoris = true;
                                        this.utilService.successAlertNoAction('Ajouter des Favoris',  'Ressource ajoutée aux favoris');

                                    },
                                    err => console.log(err));

                        },



                        err => {
                            console.log(err);
                        });

            }, err => {
                console.log(err);
            });


    }

    async getCurrentUser()
    {
        const User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
            if (user != null) {
                this.currentUser = user;
                this.api.CpEtudiant = this.currentUser.CPUsers;
            }
        });
    }

    async  getCurrentSession()
    {
        this.sessionService.getActiveSession().subscribe(session => {
            // console.log(session);
            if (session)
            {
                this.currentSession = session;
                //  console.log(session[0].sessNom);
                this.getAllNotes();

            }


        });

    }

    addNote(id: any) {
        const dialogRef = this.dialog.open(NoteComponent, {
            width: '60%',
            height: '60%',
            data: {ressource: id, titre: 'Ajouter  une note'}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    addComment(id: any) {
        const dialogRef = this.dialog.open(CommentPage, {
            width: '60%',
            height: '60%',
            data: {ressource: id, titre: 'Ajouter/modifier  une commentaire'}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    editNote(id: any) {
        const dialogRef = this.dialog.open(NoteComponent, {
            width: '60%',
            height: '60%',
            data: {note: id, titre: 'Ajouter/modifier  une note'}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }


    editComment(comment: any) {
        // console.log(comment);
        const dialogRef = this.dialog.open(CommentPage, {
            width: '60%',
            height: '60%',
            data: {comment, titre: 'Ajouter/modifier  un commentaire'}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }
    async delNote(idNote: any) {

        const alert = await this.alertController.create({
            // header: 'Notes personnelles',
            // subHeader: 'Enlever cette ressource des favoris?',
            message: 'êtes vous sûr de supprimer cette note?',
            buttons: [
                {
                    text: 'Annuler',
                    cssClass: 'dell',
                    handler: (data: any) => {
                        console.log('Canceled', data);
                    }
                },
                {
                    text: 'OK',
                    handler: (data: any) => {
                        this.noteService.deleteNote(idNote)
                            .subscribe(not => {
                                    this.getAllNotes();

                                },
                                err => {
                                    console.log(err);

                                }) ;


                    }
                }
            ]
        });
        await alert.present();
    }
    async getAllNotes()
    {
        // console.log(this.currentSession);

        this.noteService.getNoteByUserAndResource(this.currentUser.idUsers, this.route.snapshot.paramMap.get('idResource'))
            .subscribe(note => {
                //  console.log(this.currentSession);
                if (note)
                {
                    this.notes = note.sort((a, b) => {
                        return <any> new Date(b.dateNote) - <any> new Date(a.dateNote);
                    });
                    this.noteLength = note.length;
                    // console.log(note);
                }


            });

    }


    async getCommentsByResource()
    {
        this.commentAndUsers = [];
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();
        this.commentService.getCommentsByResource(this.route.snapshot.paramMap.get('idResource'))
            .subscribe(comm => {
                this.comments = comm.sort((a, b) => {
                    return (new Date(b.commentDate) as any) - (new Date(a.commentDate) as any);
                });
                // Récupération des utilisateur à chaque commentaire
                this.comments.forEach(comment => {
                    const nowutc = new Date();
                    const diff = this.utileService.DiffDate(nowutc.valueOf() - new Date(comment.commentDate).valueOf());
                    const commentAndUserTemp = {comment, depuis: diff};

                    // console.log(commentAndUserTemp);
                    this.commentAndUsers.push(commentAndUserTemp);

                });
                this.commentAndUsers = this.commentAndUsers.sort((a, b) => {
                    // console.log(b);
                    return (new Date(b.comment.commentDate) as any) - (new Date(a.comment.commentDate) as any);
                });
                //  console.log(this.commentAndUsers);
                this.commentlength = comm.length;
                loading.dismiss();
            }, err => {
                console.log(err);
                loading.dismiss();
            });
    }



    async deleteComment(commentid: any) {

        const alert = await this.alertController.create({
            header: 'Supprimer votre Commentaire',
            // subHeader: 'Enlever cette ressource des favoris?',
            message: 'Voulez vous supprimer ce commentaire?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: (data: any) => {
                        // console.log('Canceled', data);
                    }
                },
                {
                    text: 'OK',
                    handler: (data: any) => {

                        this.commentService.deleteComment(commentid)
                            .subscribe(comm => {
                                    this.getCommentsByResource();

                                },
                                err => {
                                    console.log(err);

                                });

                    }

                }
            ]
        });
        await alert.present();
    }

    getRessourceCours(id) {
        this.api.getRessourceCours(id)
            .subscribe(cours => {
                //   console.log(cours);
                // console.log(cours);
                this.cours = cours;
                this.cours = this.cours.sort((a, b) => {
                    return (a.coursResCours.coursDes < b.coursResCours.coursDes)
                        ? -1 : (a.coursResCours.coursDes > b.coursResCours.coursDes) ? 1 : 0;
                });
                // console.log(this.cours);
                cours.forEach((value) => {
                    this.session.push(value.coursResSession);
                });
                //   console.log(this.session);
                if (this.session.length > 0) {
                    this.session = this.utilService.delDuplicateSession(this.session, [{
                        id: '',
                        sessNom: '',
                        sessStatus: '',
                        sessYear: '',
                        sessStart: '',
                        sessMiddle: '',
                        sessEnd: ''
                    }]);
                    //  console.log(this.session);
                    this.session = this.session.sort((a, b) => {
                        return (a.sessStart < b.sessStart) ? 1 : -1;
                    });

                }
                this.courslength = cours.length;
                this.isLoadingResults = false;
            }, err => {
                // console.log(err);
                this.isLoadingResults = false;
            });
    }
    MoreLessCour() {
        this.showMore = !this.showMore;
    }

    async showShareOptions() {
        const modal = await this.modalCtrl.create({
            component: ShareComponent,
            cssClass: 'backTransparent',
            backdropDismiss: true,
            componentProps: { url: this.resource.ressUrl, nom: this.resource.ressDesc }
        });
        return modal.present();
    }


}
