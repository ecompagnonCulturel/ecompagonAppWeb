import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonSlides, LoadingController, ModalController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {FavorisService} from '../../favoris/favoris.service';
import {NoteService} from '../../note/note.service';
import {UserService} from '../../../authentification/User.service';
import {ResourceAPIService} from '../../resource/resource-api.service';
import {AuthenticService} from '../../../authentification/authentic.service';
import {SessionService} from '../../session/session.service';
import {CommentService} from '../../comment/comment.service';
import {UtileService} from '../../../_helpers/utile/utile.service';
import {UtilService} from '../../../util/util.service';
import * as moment from 'moment';
import {ShareComponent} from '../../share/share.component';
import {NoteComponent} from '@app/formation/note/note.component';
import {MatDialog} from '@angular/material/dialog';
import {CommentPage} from '@app/formation/comment/comment.page';


@Component({
    selector: 'app-favoris-detail',
    templateUrl: './favoris-detail.page.html',
    styleUrls: ['./favoris-detail.page.scss']
})
export class FavorisDetailPage implements OnInit {
    resourceId: any;
    cours: any = [];
    courslength: any;
    // tslint:disable-next-line:max-line-length
    resource: any = {};
    isLoadingResults = false;
    pictureResourceUrl: any;
    typeRes: any;
    mailUser = 'elcarinacours@uqtr.ca';
    idUser = 1;
    session: any = [];
    currentUser: any;
    currentSession: any;
    shareReturned: any;
    notes: any;
    noteLength: any;
    // Transmis au modal par favoris
    idResource;
    comments: any;
    commentlength: any;
    commentAndUsers: any = [];
    now: any;
    resAvatar: any;
    showMore = false;
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

    constructor(private modalController: ModalController,
                public api: ResourceAPIService,
                public alertController: AlertController,
                public loadingController: LoadingController,
                public route: ActivatedRoute,
                public router: Router,
                private favorisService: FavorisService,
                private authentificationService: UserService,
                private authenticService: AuthenticService,
                private sessionService: SessionService,
                private noteService: NoteService,
                private commentService: CommentService,
                private utileService: UtileService,
                private utilService: UtilService,
                private dialog: MatDialog
    ) {

        this.sliderTwo = {
            isBeginningSlide: true,
            isEndSlide: false,
        };

    }

    ngOnInit() {
        this.idResource = this.route.snapshot.paramMap.get('idResource');
        this.getResourceById();
        this.getCurrentUser();
        this.getCurrentSession();
        this.getCommentsByResource();

    }

    async closeModal() {
        const onClosedData = 'Wrapped Up!';
        await this.modalController.dismiss(onClosedData);
    }


    async getResourceById() {
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        if (this.route.snapshot.paramMap.get('id') === 'null') {
            this.presentAlertConfirm('You are not choosing an item from the list');
        } else {

            this.isLoadingResults = true;
            await this.api.getResourceById(this.idResource)
                .subscribe(res => {
                    // console.log(res);
                    this.resource = res;
                    // this.pictureResourceUrl = this.resource.ressPicture[1].pictureUrl;
                    this.typeRes = res.ressType.trdesc;
                    this.resAvatar = res.ressType.travatar;
                    // console.log(this.resource.ResPicture[1].pictureUrl);
                    this.getRessourceCours(this.idResource);
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

    async getRessourceCours(id) {
        this.api.getRessourceCours(id)
            .subscribe(cours => {
                this.cours = cours;
                this.cours = this.cours.sort((a, b) => {
                    return (a.coursResCours.coursDes < b.coursResCours.coursDes) ? -1 :
                        (a.coursResCours.coursDes > b.coursResCours.coursDes) ? 1 : 0;
                });
                // console.log(this.cours);
                cours.forEach((value) => {
                    this.session.push(value.coursResSession);
                });
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
                console.log(err);
                this.isLoadingResults = false;
            });
    }

    async deleteFavoris(idRessource: any) {
        this.now = (moment().locale('ru')).format();
        const alert = await this.alertController.create({
            header: 'Confirmation',
            // subHeader: 'Enlever cette ressource des favoris?',
            message: 'Enlever cette ressource des favoris?',
            buttons: [
                {
                    text: 'Annuler',
                    handler: (data: any) => {
                        console.log('Canceled', data);
                    }
                },
                {
                    text: 'OK',
                    handler: (data: any) => {
                        this.favorisService.getFavorisByUserAndResources(idRessource, this.currentUser.idUsers)
                            .subscribe(fav => {
                                    console.log(fav[0].id);

                                    this.favorisService.deleteFavoris(fav[0].id)
                                        .subscribe(ress => {
                                                this.router.navigateByUrl('home/favoris');
                                            },
                                            err => {
                                                console.log(err);

                                            });

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

    async getCurrentUser() {
        const User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
            this.currentUser = user;
            // this.api.CpEtudiant=this.currentUser.CPUsers;
        });
    }

    async getCurrentSession() {

        this.sessionService.getActiveSession().subscribe(session => {
            // console.log(session);
            if (session) {
                this.currentSession = session;
                // console.log(this.currentSession);
                this.getAllNotes();
            }


        });

    }

    addNote(id: any) {
        const dialogRef = this.dialog.open(NoteComponent, {
            width: '60%',
            height: '60%',
            data: {ressource: id, titre: 'Ajouter/modifier  une note'}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    addComment(id: any) {
        const dialogRef = this.dialog.open(CommentPage, {
            width: '60%',
            height: '60%',
            data: {ressource: id, titre: 'Ajouter/modifier  une note'}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });
    }

    editNote(note: any) {
        const dialogRef = this.dialog.open(NoteComponent, {
            width: '60%',
            height: '60%',
            data: {note, titre: 'Ajouter/modifier une note'}
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
                                    // console.log(err);

                                });


                    }
                }
            ]
        });
        await alert.present();
    }

    async getAllNotes() {
        // console.log(this.currentSession);

        this.noteService.getNoteByUserAndResource(this.currentUser.idUsers, this.idResource)
            .subscribe(note => {
                // console.log(this.currentSession);
                if (note) {
                    this.notes = note.sort((a, b) => {
                        return (new Date(b.dateNote) as any) - (new Date(a.dateNote) as any);
                    });
                    this.noteLength = note.length;
                    //   console.log(note);
                }


            });

    }

    async getCommentsByResource() {

        // this.now = new Date().;
        this.commentAndUsers = [];
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();
        this.commentService.getCommentsByResource(this.idResource)
            .subscribe(comm => {
                //  console.log(comm);
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
                // console.log(this.commentAndUsers);
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


    utcToLocal(utcdateTime, tz) {
        const zone = moment.tz(tz).format('Z');
        const zoneValue = zone.replace(/[^0-9: ]/g, ''); // Zone value without + - chars
        const operator = zone && zone.split('') && zone.split('')[0] === '-' ? '-' : '+'; // operator for addition subtraction
        let localDateTime = null;
        const hours = zoneValue.split(':')[0];
        const minutes = zoneValue.split(':')[1];
        if (operator === '-') {
            localDateTime = moment(utcdateTime).subtract(hours, 'hours').subtract(minutes, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        } else if (operator) {
            localDateTime = moment(utcdateTime).add(hours, 'hours').add(minutes, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        } else {
            localDateTime = 'Invalid Timezone Operator';
        }
        return localDateTime;
    }

    async showShareOptions() {
        const modal = await this.modalController.create({
            component: ShareComponent,
            cssClass: 'backTransparent',
            backdropDismiss: true,
            componentProps: {url: this.resource.ressUrl, nom: this.resource.ressDesc}
        });
        return modal.present();
    }


}
