import {Component, ElementRef, OnInit, ViewChild, LOCALE_ID, Inject} from '@angular/core';
import {AlertController, Config, LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilService} from '../../util/util.service';
import {QuestionnaireService} from '../questionnaire/questionnaire.service';
import {AuthenticService} from '../../authentification/authentic.service';
import {UserService} from '../../authentification/User.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../../formation/session/session.service';
import * as moment from 'moment';
import {Gesture, GestureController} from '@ionic/angular';
import {formatDate, DatePipe} from '@angular/common';




@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.page.html',
    styleUrls: ['./questionnaire.page.scss'],
})
export class QuestionnairePage implements OnInit {
    questionnaire: any = [];
    questionnaireForm: FormGroup;
    taille: any;
    introduction: any;
    conclusion: any = 'Merci';
    length: any = 0;
    currentUser: any;
    formField: any;
    checkArray: any = [];
    questionPrecedent: any = null;
    currentSession: any;
    today: any;
    // today = new Date();

    disabled = false;
    invert = false;
    thumbLabel = false;
    value = 0;
    vertical = false;
    min = 0;
    max = 100;
    step = 1;
    activiteDesc: any = null;
    compteur: any = [];
    public mode: string;
    typeQ: any;


    constructor(private loadingController: LoadingController,
                private router: Router,
                private alertController: AlertController,
                private route: ActivatedRoute,
                private utilService: UtilService,
                private questionnaireService: QuestionnaireService,
                private authenticService: AuthenticService,
                private sessionService: SessionService,
                private authentificationService: UserService,
                private config: Config,
                private gestureCtrl: GestureController,
                private pipe: DatePipe,
                @Inject(LOCALE_ID) public locale: string
    ) {
        this.questionnaireForm = new FormGroup({});
    }

    ngOnInit() {
        this.getCurrentUser();
        this.getCurrentSession();
        this.mode = this.config.get('mode');

    }

    ionViewCanEnter() {

    }

    async T2() {
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();
        this.questionnaireService.getByQuestionnaireTypeAndDate('T2', this.today, this.today)
            .subscribe(questT2 => {
                    //  console.log(questT2);
                    if (questT2 != null && questT2.length > 0) {
                        // Si il y a un questionnaire en cours
                        const currentQuestionnaire = {
                            id: questT2[0].questionnaire.id,
                            value: questT2[0].questionnaire.type
                        };
                        //   vérification des questionnaires déjà remplis par l'étudiant
                        if (this.utilService.ObjectExist(this.formField, currentQuestionnaire) === false) {
                            this.affichageQuestionnaire('T2', questT2[0].questionnaire.id, questT2);
                            loading.dismiss();
                        } else {
                            this.taille = 0;
                            loading.dismiss();
                        }


                    } else {
                        this.taille = 0;
                        loading.dismiss();
                    }
                },
                err => {
                    this.taille = 0;
                    loading.dismiss();
                });
    }


    async getQuestionaire() {
        // this.today=moment().format("YYYY-MM-DD HH:MM:SS");
        this.today = moment().format();
        // console.log(this.today);
        let group: any;
        let typeQ: any = null;
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();

        if ((this.formField === null)) {
            typeQ = 'T0';
        } else {
           // console.log('moi');
            await this.questionnaireService.getQuestionnnaireByDateSessionEtudiant(this.today, this.today,
                this.currentSession.id, this.currentUser.CPUsers)
                .subscribe(questAll => {
                        // Si il y a un questionnaire en cours
                        if (questAll.length > 0) {
                            // console.log(questAll);
                            this.typeQ = questAll[0].questionnaire.type;
                            const currentQuestionnaire = {
                                id: questAll[0].questionnaire.id,
                                value: questAll[0].questionnaire.type
                            };
                            //   vérification des questionnaires déjà remplis par l'étudiant
                            if (this.utilService.ObjectExist(this.formField, currentQuestionnaire) === false)
                            {
                                typeQ = questAll[0].questionnaire.type;
                                // console.log(questAll[0].questionnaire.type);
                                // Récupération de  la description de l'activité pour T12
                                if (questAll[0].questionnaire.type === 'T12') {
                                    this.getActivityDesc(questAll);
                                    loading.dismiss();
                                } else {
                                    if (questAll[0].questionnaire.type === 'T3') {
                                        this.affichageQuestionnaireT3(typeQ, questAll[0].questionnaire.id, questAll);
                                        loading.dismiss();
                                    }
                                    else
                                    {
                                        this.affichageQuestionnaire(typeQ, questAll[0].questionnaire.id, questAll);
                                        loading.dismiss();
                                    }


                                }

                            } else {
                                this.T2();
                                loading.dismiss();
                            }
                            loading.dismiss();
                        } else {
                            this.T2();
                            loading.dismiss();
                        }
                    },
                    err => {
                        typeQ = null;
                        group = null;
                        this.taille = 0;
                        loading.dismiss();
                    });

        }
        if (typeQ === 'T0') {
            this.affichageQuestionnaireTO(typeQ);
            loading.dismiss();
        }


    }


    async sendResponse() {
        const responseArray: any = [];
        let response: any;
        let sousRep: any;
        let questionnaire: any;
        this.today = moment().format();
        let repQ1T0: any = null;
        const loading = await this.loadingController.create({
            message: 'Loading...'
        });
        await loading.present();
        if (this.questionnaireForm.valid === false) {

            this.utilService.errorAlert('Questionnaire', 'Merci de bien vouloir repondre à toutes les questions avant de valider');
            // this.color="red";
            loading.dismiss();
        } else {
            for (let i = 0; i < this.questionnaire.length; i++) {
                const checkvaluesJson: any = [];
                let checkvaluesString: any = [];
                const checkFillevaluesJson: any = [];
                let checkFillevaluesString: any = [];
                let modaliteRep: any = null;
                let reponsText: any = 0;
                let reponsEntier: any = 0;
                const questFilleType: any = null;
                let responsFilleModalite: any = null;
                const reponsFilleType: any = null;
                let reponsFilleText: any = null;
                const reponsEntierFille: any = null;
// Question mère SLide
                if ((this.questionnaire[i].question.questType === 'slider10')
                    || (this.questionnaire[i].question.questType === 'slider10CS')
                    || (this.questionnaire[i].question.questType === 'slider10CE')) {

                    reponsEntier = this.questionnaireForm.controls[this.questionnaire[i].question.id].value;
                    reponsText = this.questionnaireForm.controls[this.questionnaire[i].question.id].value;

                    if (reponsEntier === '' || reponsText === '')
                    {
                        reponsEntier = 0;
                        reponsText = 0;

                    }

                   }
            else{
                    // Question mère QCM
                    if (this.questionnaire[i].question.questType === 'QCM') {
                        for (const modalite of this.questionnaire[i].question.questModalite) {

                            if ((this.questionnaireForm.controls[this.questionnaire[i].question.id + '.' + modalite.id].value) === true) {
                                const modaliteRepo = {id: modalite.id, value: modalite.value};
                                checkvaluesJson.push(modaliteRepo);
                                checkvaluesString.push(modalite.value);
                            }

                        }
                        checkvaluesString = checkvaluesString.join(',');
                        modaliteRep = this.utilService.fromJsonToString(checkvaluesJson);
                        reponsText = checkvaluesString;

                    } else {// Question mère non QCM
                        modaliteRep = null;
                        reponsText = this.questionnaireForm.controls[this.questionnaire[i].question.id].value;

                    }
                }

                // Question fille existe
                if (this.questionnaire[i].question.questFilleDesc !== null) {
                    // console.log(i);
                    sousRep = this.questionnaire[i].question.id + '.1';
                    // Si la question mère est de type radio et reponse=Oui
                    // tslint:disable-next-line:max-line-length
                    if ((this.questionnaire[i].question.questType === 'radio') && (this.questionnaireForm.controls[this.questionnaire[i].question.id].value === 'Oui')) {
                        // Question fille QCM
                        if (this.questionnaire[i].question.questFilleType === 'QCM') {

                            for (const modalite of this.questionnaire[i].question.questFilleModalite) {

                                if ((this.questionnaireForm.controls[sousRep + '.' + modalite.id].value) === true) {
                                    const modaliteRepo = {id: modalite.id, value: modalite.value};
                                    checkFillevaluesJson.push(modaliteRepo);
                                    checkFillevaluesString.push(modalite.value);
                                }
                            }
                            checkFillevaluesString = checkFillevaluesString.join(',');
                            responsFilleModalite = this.utilService.fromJsonToString(checkFillevaluesJson);
                            reponsFilleText = checkFillevaluesString;
                            //  console.log(this.checkboxCheckedJson(this.checkArray));

                        } else {// Question fille non QCM
                            responsFilleModalite = null;
                            reponsFilleText = this.questionnaireForm.controls[sousRep].value;
                        }
                    } else {
                        responsFilleModalite = null;
                        reponsFilleText = this.questionnaireForm.controls[sousRep].value;
                    }

                }
                // Affectation des valeurs aux nouveaux objets question à envoyer
                const questionSend = {
                    id: this.questionnaire[i].question.id,
                    questType: this.questionnaire[i].question.questType,
                    questCate: this.questionnaire[i].question.questCate,
                    questTypeRepons: this.questionnaire[i].question.questTypeRepons,
                    questDesc: this.questionnaire[i].question.questDesc,
                    questFilleType: this.questionnaire[i].question.questFilleType,
                    QuestTypeReponsFille: this.questionnaire[i].question.QuestTypeReponsFille,
                    questFilleDesc: this.questionnaire[i].question.questFilleDesc,
                    questStatus: this.questionnaire[i].question.questStatus,
                    questOrdre: this.questionnaire[i].question.questOrdre,
                    questModalite: this.utilService.fromJsonToString(this.questionnaire[i].question.questModalite),
                    questFilleModalite: this.utilService.fromJsonToString(this.questionnaire[i].question.questFilleModalite),
                };

                if (questionSend.id === 1)
                {
                    // console.log(questionSend.id );
                    //  console.log('yes');
                    repQ1T0 = Number(reponsText) + 3;
                }

                response = {
                    id: 0,
                    question: questionSend,
                    questionnaire: this.questionnaire[i].questionnaire,
                    session: this.currentSession,
                    cp: this.currentUser,
                    questType: this.questionnaire[i].question.questType,
                    reponsModalite: modaliteRep,
                    reponsType: this.questionnaire[i].question.questTypeRepons,
                    reponsText,
                    reponsEntier,
                    questFilleType: this.questionnaire[i].question.questFilleType,
                    responsFilleModalite,
                    reponsFilleType: this.questionnaire[i].question.questTypeReponsFille,
                    reponsFilleText,
                    reponsEntierFille,
                    reponsDate: moment().format('yyyy-MM-DDTHH:mm:ss')
                };
                questionnaire = this.questionnaire[i].questionnaire;
                responseArray.push(response);
            }
            //  console.log(responseArray);

            await this.questionnaireService.addReponse(responseArray, this.currentUser.CPUsers, questionnaire.id, questionnaire.type, repQ1T0)
                .subscribe(appuser => {
                        this.taille = 0;
                        //  console.log(appuser);
                        // this.authenticService.setStorage('user',(JSON.stringify(appuser)))
                        this.getUserByCP(this.currentUser.CPUsers);
                        this.utilService.successAlertConnected('Questionnaire', 'Questionnaire enregistré avec succès');

                        loading.dismiss();
                    },
                    err => {
                        //  console.log(err);
                        this.utilService.errorAlert('Questionnaire', 'Questionnaire non enregistré');

                        loading.dismiss();
                    });
        }

    }

     getCurrentUser() {
       // this.authenticService.loadToken();
        const User = (this.authenticService.currentUser).asObservable();
        User.subscribe(user => {
           // console.log(user)
            this.getUserByCP(user.CPUsers);
        });

    }


    getCurrentSession() {
        this.sessionService.getActiveSession().subscribe(session => {
            if (session) {
                this.currentSession = session;
                this.getQuestionaire();
            }
        });

    }

    async getUserByCP(CP: any) {
        await this.authentificationService.getUserByCP(CP)
            .subscribe(user => {

                if (user) {
                    this.formField = user.formField;
                    //console.log(user);
                    const userLog = {
                        nameUsers: user.nameUsers + ' ' + user.firstname,
                        mailUsers: user.mailUsers,
                        CPUsers: user.cpusers,
                        idUsers: user.idUsers,
                        firstname: user.firstname,
                        lastname: user.nameUsers,
                        formField: user.formField,
                        fcmToken: user.fcmToken
                    };
                    this.currentUser = userLog;
                    // Mise à jour des données stockées connecté
                    //this.authenticService.setStorage(user, JSON.stringify(userLog));
                }
            });

    }

    async affichageQuestionnaire(typeQ: any, id: any, questionQuestionnaires: any) {

        if (typeQ != null) {

            /* await this.questionnaireService.getGeneralQuest(typeQ, 1, id)
                 .subscribe(quest => {*/
           // console.log(id);
            this.length = 0;
            questionQuestionnaires.forEach(value => {
                // Première question de T0
                if ((typeQ === 'T0') && (value.question.questOrdre === 1)) {
                    const contenurray: any = [];
                    const sessionYear = this.utilService.fromStringToNumber(this.currentSession.sessYear);
                    contenurray.push({id: 1, value: (sessionYear - 2)});
                    contenurray.push({id: 2, value: (sessionYear - 1)});
                    contenurray.push({id: 3, value: sessionYear});
                    value.question.questModalite = contenurray;
                } else {

                    value.question.questModalite = this.utilService.fromStringToJson(value.question.questModalite);

                }
                // L'ajout du libellé de l'activité à la decription de la question pour T12
                if (value.question.questType === 'slider10CS') {
                    value.question.questDesc = this.activiteDesc + ' ' + value.question.questDesc;
                } else if (value.question.questType === 'slider10CE') {
                    value.question.questDesc = value.question.questDesc + ' ' +
                        (this.activiteDesc.substr(0, 1)).toLowerCase() +
                        this.activiteDesc.substr(1) + '.';
                }

                value.question.questFilleModalite = this.utilService.fromStringToJson(value.question.questFilleModalite);
                // value.question.questModalite = this.utilService.fromStringToJson(value.question.questModalite);
                value.question.questDesc = this.utilService.bold(value.question.questDesc);
                // création des forms controls dynamique

                if (value.question.questDesc !== '') {

                    this.length = this.length + 1;
                    // Question mère non QCM
                    if (value.question.questType !== 'QCM') {

                        if ((value.question.questType === 'slider10CS') || (value.question.questType === 'slider10CE')
                            || (value.question.questType === 'slider10')) {
                            this.questionnaireForm.addControl(value.question.id, new FormControl('', Validators.required));
                            // this.questionnaireForm.controls[value.question.id].setValue(50);
                            // this.questionnaireForm.addControl(value.question.id, new FormControl('', Validators.min(0)),);

                        } else {
                            this.questionnaireForm.addControl(value.question.id, new FormControl('', Validators.required));
                        }


                    } else {// Question mère  QCM
                        for (const modalite of value.question.questModalite) {
                            this.questionnaireForm.addControl(value.question.id + '.' + modalite.id, new FormControl(''));

                        }

                    }
                    // Question fille existe
                    if (value.question.questFilleDesc !== null) {
                        // this.questionnaireForm.addControl(value.question.id + '.1', new FormControl(''));
                        // Question fille non QCM
                        if (value.question.questFilleType !== 'QCM') {

                            if ((value.question.questType === 'slider10') || (value.question.questType === 'slider10CS') ||
                            (value.question.questType === 'slider10CE')) {

                                this.questionnaireForm.addControl(value.question.id + '.1', new FormControl('', Validators.required));
                            }
                            else  {

                                this.questionnaireForm.addControl(value.question.id + '.1', new FormControl(''));
                            }

                        } else {// Question fille  QCM
                            for (const modalite of value.question.questFilleModalite) {
                                this.compteur[value.question.id + '.1'] = 0; // initialisation des compteurs des checkbox
                                this.questionnaireForm.addControl(value.question.id + '.1.' + modalite.id, new FormControl(''));

                            }

                        }

                    }
                } else {
                    this.questionnaireForm.addControl(value.question.id, new FormControl('', Validators.required));

                    // group[value.question.id] =new FormControl('');
                }

            });
            // console.log(quest);
            this.questionnaire = questionQuestionnaires.sort((a, b) => {
                return (a.question.id < b.question.id) ? -1 : (a.question.id > b.question.id) ? 1 : 0;
            });
            // console.log(this.questionnaireForm);
            this.taille = questionQuestionnaires.length;
            // console.log(this.length);
            this.introduction = 'Veuillez SVP répondre aux ' + this.length + ' questions suivantes';

            /* }, err => {
                 this.taille = 0;
             });*/

        } else {
            this.taille = 0;
            // loading.dismiss();
        }

    }

    async affichageQuestionnaireTO(typeQ: any) {

        if (typeQ != null) {

            await this.questionnaireService.getGeneralQuestT0(typeQ, 1)
                .subscribe(quest => {
                    //  console.log(quest);
                    this.length = 0;

                    quest.forEach(value => {
                        // Première question de T0
                        if ((typeQ === 'T0') && (value.question.questOrdre === 1)) {
                            const contenurray: any = [];
                            const sessionYear = this.utilService.fromStringToNumber(this.currentSession.sessYear);
                            const currenDateMonth = new Date().getUTCMonth() + 1;
                            if (currenDateMonth >= 9)
                            {
                                contenurray.push({id: 1, value: (sessionYear - 2)});
                                contenurray.push({id: 2, value: (sessionYear - 1)});
                                contenurray.push({id: 3, value: sessionYear});
                            }
                            else {
                                contenurray.push({id: 1, value: (sessionYear - 3)});
                                contenurray.push({id: 2, value: (sessionYear - 2)});
                                contenurray.push({id: 3, value: (sessionYear - 1)});
                            }

                            value.question.questModalite = contenurray;
                        } else {

                            value.question.questModalite = this.utilService.fromStringToJson(value.question.questModalite);

                        }
                        // L'ajout du libellé de l'activité à la decription de la question pour T12
                        if (value.question.questType === 'slider10CS') {
                            value.question.questDesc = this.activiteDesc + ' ' + value.question.questDesc;
                        } else if (value.question.questType === 'slider10CE') {
                            value.question.questDesc = value.question.questDesc + ' ' + this.activiteDesc;
                        }

                        value.question.questFilleModalite = this.utilService.fromStringToJson(value.question.questFilleModalite);
                        // value.question.questModalite = this.utilService.fromStringToJson(value.question.questModalite);
                        value.question.questDesc = this.utilService.bold(value.question.questDesc);
                        // création des forms controls dynamique

                        if (value.question.questDesc !== '') {

                            this.length = this.length + 1;
                            // Question mère non QCM
                            if (value.question.questType !== 'QCM') {
                                this.questionnaireForm.addControl(value.question.id, new FormControl('', Validators.required));

                            } else {// Question mère  QCM
                                for (const modalite of value.question.questModalite) {
                                    this.questionnaireForm.addControl(value.question.id + '.' + modalite.id, new FormControl(''));

                                }

                            }
                            // Question fille existe
                            if (value.question.questFilleDesc !== null) {
                                this.questionnaireForm.addControl(value.question.id + '.1', new FormControl(''));
                                // Question fille non QCM
                                if (value.question.questFilleType !== 'QCM') {
                                    this.questionnaireForm.addControl(value.question.id + '.1', new FormControl(''));

                                } else {// Question fille  QCM
                                    for (const modalite of value.question.questFilleModalite) {
                                        this.compteur[value.question.id + '.1'] = 0; // initialisation des compteurs des checkbox
                                        this.questionnaireForm.addControl(value.question.id + '.1.' + modalite.id, new FormControl(''));

                                    }

                                }

                            }
                        } else {
                            this.questionnaireForm.addControl(value.question.id, new FormControl('', Validators.required));

                            // group[value.question.id] =new FormControl('');
                        }

                    });
                    // console.log(quest);
                    this.questionnaire = quest.sort((a, b) => {
                        return (a.question.id < b.question.id) ? -1 : (a.question.id > b.question.id) ? 1 : 0;
                    });
                    // console.log(this.questionnaireForm);
                    this.taille = quest.length;
                    // console.log(this.length);
                    this.introduction = 'Veuillez SVP répondre aux ' + this.length + ' questions suivantes ';

                }, err => {
                    this.taille = 0;
                });

        } else {
            this.taille = 0;
            // loading.dismiss();
        }

    }


    async affichageQuestionnaireT3(typeQ, guestid, quest) {

        if (typeQ != null) {

          /*  await this.questionnaireService.getGeneralQuestT0(typeQ, 1)
                .subscribe(quest => {
                    console.log(quest);*/
                    this.length = 0;

                    quest.forEach(value => {
                        // Première question de T0
                        if ((typeQ === 'T0') && (value.question.questOrdre === 1)) {
                            const contenurray: any = [];
                            const sessionYear = this.utilService.fromStringToNumber(this.currentSession.sessYear);
                            contenurray.push({id: 1, value: (sessionYear - 2)});
                            contenurray.push({id: 2, value: (sessionYear - 1)});
                            contenurray.push({id: 3, value: sessionYear});
                            value.question.questModalite = contenurray;
                        } else {

                            value.question.questModalite = this.utilService.fromStringToJson(value.question.questModalite);

                        }
                        // L'ajout du libellé de l'activité à la decription de la question pour T12
                        if (value.question.questType === 'slider10CS') {
                            value.question.questDesc = this.activiteDesc + ' ' + value.question.questDesc;
                        } else if (value.question.questType === 'slider10CE') {
                            value.question.questDesc = value.question.questDesc + ' ' + this.activiteDesc;
                        }

                        value.question.questFilleModalite = this.utilService.fromStringToJson(value.question.questFilleModalite);
                        // value.question.questModalite = this.utilService.fromStringToJson(value.question.questModalite);
                        value.question.questDesc = this.utilService.bold(value.question.questDesc);
                        // création des forms controls dynamique

                        if (value.question.questDesc !== '') {

                            this.length = this.length + 1;
                            // Question mère non QCM
                            if (value.question.questType !== 'QCM') {
                                this.questionnaireForm.addControl(value.question.id, new FormControl('', Validators.required));

                            } else {// Question mère  QCM
                                for (const modalite of value.question.questModalite) {
                                    this.questionnaireForm.addControl(value.question.id + '.' + modalite.id, new FormControl(''));

                                }

                            }
                            // Question fille existe
                            if (value.question.questFilleDesc !== null) {
                                this.questionnaireForm.addControl(value.question.id + '.1', new FormControl(''));
                                // Question fille non QCM
                                if (value.question.questFilleType !== 'QCM') {
                                    this.questionnaireForm.addControl(value.question.id + '.1', new FormControl(''));

                                } else {// Question fille  QCM
                                    for (const modalite of value.question.questFilleModalite) {
                                        this.compteur[value.question.id + '.1'] = 0; // initialisation des compteurs des checkbox
                                        this.questionnaireForm.addControl(value.question.id + '.1.' + modalite.id, new FormControl(''));

                                    }

                                }

                            }
                        } else {
                            this.questionnaireForm.addControl(value.question.id, new FormControl('', Validators.required));

                            // group[value.question.id] =new FormControl('');
                        }

                    });
                    // console.log(quest);
                    this.questionnaire = quest.sort((a, b) => {
                        return (a.question.id < b.question.id) ? -1 : (a.question.id > b.question.id) ? 1 : 0;
                    });
                    // console.log(this.questionnaireForm);
                    this.taille = quest.length;
                    // console.log(this.length);
                    this.introduction = 'Veuillez SVP répondre aux ' + this.length + ' questions suivantes ';

               /* }, err => {
                    this.taille = 0;
                });*/

        } else {
            this.taille = 0;
            // loading.dismiss();
        }

    }

    radioChange(question: any, event: any) {
        if (question.questFilleDesc !== null) {
            if (this.questionnaireForm.controls[question.id].value === 'Oui') {
                // this.checkArray=[];
                // this.compteur[question.id + '.1']=0;
                this.questionnaireForm.controls[question.id + '.1'].setValidators(null);
                this.questionnaireForm.controls[question.id + '.1'].setValidators(Validators.required);
                // Valeur par défaut pour les question fille de type QCM pour validation même
                // si aucune valeur n'est cochée'
                if (question.questFilleType === 'QCM') {
                    this.questionnaireForm.controls[question.id + '.1'].setValidators(Validators.required);
                    // (this.questionnaireForm.controls[question.id + '.1']).patchValue(1);
                }

            } else {

                this.questionnaireForm.controls[question.id + '.1'].setValidators(null);

            }
            this.questionnaireForm.controls[question.id + '.1'].updateValueAndValidity();


        }
    }

    async getActivityDesc(quest: any) {
        // console.log(quest[0].questionnaire.id);

        await this.questionnaireService.getComplementByQuestionnaire(quest[0].questionnaire.id)
            .subscribe(complement => {

                    if (complement != null) {
                        this.activiteDesc = complement.activite.actDesc;
                        this.affichageQuestionnaire('T12', quest[0].questionnaire.id, quest);
                    }
                },
                err => {
                });
    }

    checked(event: any, checkgroup: any, checkbox: any) {
        if (event.target.checked) {
            this.compteur[checkgroup] = this.compteur[checkgroup] + 1;
        } else {

            this.compteur[checkgroup] = this.compteur[checkgroup] - 1;

        }
        // console.log(this.compteur)
        if (this.compteur[checkgroup] > 0) {
            (this.questionnaireForm.controls[checkgroup]).patchValue(1);
        } else {
            (this.questionnaireForm.controls[checkgroup]).patchValue(null);
        }
        // console.log(this.compteur);
        this.questionnaireForm.controls[checkgroup].updateValueAndValidity();

    }

    changeSlider(event: any, question: any) {
        // console.log(question.id);
        // console.log( this.questionnaireForm.controls);
        // désactivation du control on swipUpp
        this.questionnaireForm.controls[question.id].setValidators(null);
        this.questionnaireForm.controls[question.id].updateValueAndValidity();
         // console.log(this.questionnaireForm.controls[question.id].value);
        if (question.questFilleDesc !== null) {
            this.questionnaireForm.controls[question.id + '.1'].setValidators(Validators.required);
            this.questionnaireForm.controls[question.id + '.1'].updateValueAndValidity();
        }


    }

    changeLikert(question: any, event: any) {
        if (question.questFilleDesc !== null) {
            // if (this.questionnaireForm.controls[question.id].value !== 'Pas du tout') {

            this.questionnaireForm.controls[question.id + '.1'].setValidators(Validators.required);
            this.questionnaireForm.controls[question.id + '.1'].updateValueAndValidity();


            /* } else {
                 this.questionnaireForm.controls[question.id + '.1'].setValidators(null);
                 this.questionnaireForm.controls[question.id + '.1'].updateValueAndValidity();
             }*/
        }

    }

}

