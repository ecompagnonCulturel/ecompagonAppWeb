import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSlides, LoadingController, ModalController} from '@ionic/angular';
import {ResourceAPIService} from '../../resource-api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FavorisService} from '../../../favoris/favoris.service';
import {UserService} from '../../../../authentification/User.service';
import {Favoris} from '../../../models/favoris';
import {AuthenticService} from '../../../../authentification/authentic.service';
import {SessionService} from '../../../session/session.service';
import {NoteService} from '../../../note/note.service';
import {UtileService} from '../../../../_helpers/utile/utile.service';
import {UtilService} from '../../../../util/util.service';
import {CommentService} from '../../../comment/comment.service';
import * as moment from 'moment';
import {ShareComponent} from '../../../share/share.component';
import {MatDialog} from '@angular/material/dialog';
import {NoteComponent} from '@app/formation/note/note.component';
import {CommentPage} from '@app/formation/comment/comment.page';



@Component({
    selector: 'app-category-detail',
    templateUrl: './category-detail.page.html',
    styleUrls: ['./category-detail.page.scss'],
})

export class CategoryDetailPage implements OnInit {
    cours: any = [];
    courslength: any;
    resource: any = {};
    isLoadingResults = false;
    pictureResourceUrl: any;
    typeRes: any;
    mailUser = 'elcarinacours@uqtr.ca';
    session = [];
    favoris: Favoris;
    dejaFavoris = false;
    currentUser: any;
    currentSession: any;
    notes: any;
    noteLength: any;
    comments: any;
    commentlength: any;
    commentAndUsers: any = [];
    now: any;
    resAvatar: any;
    showMore = false;
    showMoreArray: any = [];
    @ViewChild('slideWithNav2', {static: false}) slideWithNav2: IonSlides;

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
                private favorisService: FavorisService,
                private authentificationService: UserService,
                private authenticService: AuthenticService,
                private sessionService: SessionService,
                private noteService: NoteService,
                private utileService: UtileService,
                private utilService: UtilService,
                private commentService: CommentService,
                public modalCtrl: ModalController,
                private dialog: MatDialog) {

        // Item object for Nature
        this.sliderTwo =
            {
                isBeginningSlide: true,
                isEndSlide: false,
            };

    }

    ngOnInit() {

        //  console.log(this.now);
        this.getCurrentSession();
        this.getResourceById();
        this.getCurrentUser();
        this.getCommentsByResource();
    }

    async getResourceById() {
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        if (this.route.snapshot.paramMap.get('id') === 'null') {
            this.presentAlertConfirm('You are not choosing an item from the list');
        } else {

            this.isLoadingResults = true;
            await this.api.getResourceById(this.route.snapshot.paramMap.get('id'))
                .subscribe(res => {
                    this.resource = res;
                    this.typeRes = res.ressType.trdesc;
                    this.resAvatar = res.ressType.travatar;
                    this.getRessourceCours(this.route.snapshot.paramMap.get('id'));
                    this.favorisService.getFavorisByUserAndResources(this.route.snapshot.paramMap.get('id'), this.currentUser.idUsers)
                        .subscribe(fav => {
                                // console.log(fav.length);
                                if (fav.length >= 1) {
                                    this.dejaFavoris = true;
                                } else {
                                    this.dejaFavoris = false;
                                }

                            }
                            , err => {
                                // console.log(err);
                                this.isLoadingResults = false;
                            });


                    // console.log(this.cours);
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

    getRessourceCours(id) {
        this.api.getRessourceCours(id)
            .subscribe(cours => {
                this.cours = cours;
                this.cours = this.cours.sort((a, b) => {
                    return (a.coursResCours.coursDes < b.coursResCours.coursDes) ? -1 :
                        (a.coursResCours.coursDes > b.coursResCours.coursDes) ? 1 : 0;
                });
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
                    this.showMoreArray = this.utilService.showHideSession(this.session);

                }
                this.courslength = cours.length;
                this.isLoadingResults = false;
            }, err => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }


    async saveFavoris(idResource) {
        this.now = (moment().locale('ru')).format();
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        /*  this.authentificationService.getUserByMail(this.mailUser)
        .subscribe(user=> { */
        await this.api.getResourceById(idResource)
            .subscribe(res => {
                this.favorisService.getFavorisByUser(this.currentUser.idUsers)
                    .subscribe(AllFav => {
                            // console.log(AllFav);
                            // console.log( Math.max.apply(Math, AllFav.map(function(o) { return o.id; })));
                            // Génération de l'id automatique
                            const idFav = (Math.max.apply(Math, AllFav.map(o => {
                                return o.id;
                            }))) + 1;
                            // console.log(idFav);

                            const favori = {
                                id: 0,
                                favUser: this.currentUser.idUsers,
                                favResource: res.id,
                                favDateModif: this.now,
                                favStatus: 1,
                                favSession: this.currentSession.id
                            };
                            this.favorisService.addFavoris(favori)
                                .subscribe(fav => {
                                        this.dejaFavoris = true;
                                        this.utilService.successAlertNoAction('Ajouter des Favoris', 'Ressource ajoutée aux favoris');
                                    },
                                    err => console.log(err));

                        },
                        err => {
                            // console.log(err);
                        });

            }, err => {
            });
        this.isLoadingResults = false;
        /*   }, err => {
            console.log(err);
          }); */
    }

    async getCurrentUser() {
        this.authenticService.loadToken();
        const User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
            // console.log(user);
            if (user != null) {
                this.currentUser = user;
                this.api.CpEtudiant = this.currentUser.CPUsers;
            }

        });
    }

    async getCurrentSession() {

        this.sessionService.getActiveSession().subscribe(session => {
            if (session) {
                this.currentSession = session;
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

    editNote(id: any) {
        const dialogRef = this.dialog.open(NoteComponent, {
            width: '60%',
            height: '60%',
            data: {note: id, titre: 'Ajouter  une note'}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }


    async delNote(idNote: any) {

        const alert = await this.alertController.create({
            message: 'êtes vous sûr de supprimer cette note?',
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
                        this.noteService.deleteNote(idNote)
                            .subscribe(not => {
                                    this.getAllNotes();

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

    async getAllNotes() {
        // console.log(this.currentSession);

        this.noteService.getNoteByUserAndResource(this.currentUser.idUsers, this.route.snapshot.paramMap.get('id'))
            .subscribe(note => {
                //  console.log(this.currentSession);
                if (note) {
                    this.notes = note.sort((a, b) => {
                        return (new Date(b.dateNote) as any) - (new Date(a.dateNote) as any);
                    });
                    // note.slice().sort((a, b) => b.dateNote - a.dateNote);
                    this.noteLength = note.length;
                    // console.log(note);
                }


            });

    }




    async getCommentsByResource() {
        const a: any = null;
        const bi: any = [];
        this.commentAndUsers = [];
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();
        this.commentService.getCommentsByResource(this.route.snapshot.paramMap.get('id'))
            .subscribe(comm => {
                this.comments = comm.sort((d, b) => {
                    return (new Date(b.commentDate) as any) - (new Date(d.commentDate) as any);
                });
                // Récupération des utilisateur à chaque commentaire
                this.comments.forEach(comment => {
                    const nowutc = new Date();
                    const diff = this.utileService.DiffDate(nowutc.valueOf() - new Date(comment.commentDate).valueOf());
                    const commentAndUserTemp = {comment, depuis: diff};
                    const c = {object: {comment, depuis: diff}};
                    bi.push(c);
                    this.commentAndUsers.push(commentAndUserTemp);
                });

                this.commentlength = comm.length;
                loading.dismiss();
            }, err => {

                loading.dismiss();
            });
    }

    async augmentCommentObject(comment: any) {
        // console.log(comment);
        this.authentificationService.getUserById(comment.commentUser)
            .subscribe(async user => {
                const diff = await this.utileService.DiffDate(moment(this.now).diff(moment(comment.commentDate)));
                // console.log({comment,user, depuis: diff});
                return {comment, user, depuis: diff};

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
                                    // console.log(comm.id);
                                    this.getCommentsByResource();

                                },
                                err => {
                                    // console.log(err);

                                });

                    }

                }
            ]
        });
        await alert.present();
    }

    MoreLessCour() {
        this.showMore = !this.showMore;
    }

    async showShareOptions() {
        const modal = await this.modalCtrl.create({
            component: ShareComponent,
            cssClass: 'backTransparent',
            backdropDismiss: true,
            componentProps: {url: this.resource.ressUrl, nom: this.resource.ressDesc}
        });
        return modal.present();
    }

}
