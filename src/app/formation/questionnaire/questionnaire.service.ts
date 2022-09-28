import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrlQuestionnaire = '/api/Questionnaire';
const apiUrlReponse = '/api/Reponse';
const apiUrlEtudGroup = '/api/EtudiantGroupe';
const apiUrlComplement = '/api/Complement';

@Injectable({
    providedIn: 'root'
})
export class QuestionnaireService {

    constructor(private readonly httpClient: HttpClient
    ) {
    }

    getGeneralQuest(type: any, status: any, id: any): Observable<any> {
        // let userFav=this.authentificationService.userData;
        // console.log(userFav);
        const params = {
            type: type,
            status: status,
            id: id

        };
        return this.httpClient.get(`${environment.serverURL}` + apiUrlQuestionnaire + '/getGeneralQuest', {
            ...httpOptions,
            responseType: 'json',
            params: params
        }).pipe(
            tap()
        );
    }

    getGeneralQuestT0(type: any, status: any): Observable<any> {
        const params = {
            type: type,
            status: status

        };
        return this.httpClient.get(`${environment.serverURL}` + apiUrlQuestionnaire + '/getGeneralQuestT0', {
            ...httpOptions,
            responseType: 'json',
            params: params
        }).pipe(
            tap()
        );
    }

    addReponse(questionRep: any, CP: any, questionnaire: any, type: any, repQ1T0: any): Observable<any> {
        let body = {
            CP,
            questionnaire,
            type,
            questionRep,
            repQ1T0
        };
        return this.httpClient.post(`${environment.serverURL}` + apiUrlReponse + '/add', body, {...httpOptions, responseType: 'text'}).pipe(
            tap(),
        );
    }

    getAllQuestDate(DateDebut: any, DateFin: any, session: any): Observable<any> {
        const params = {
            StartD: DateDebut,
            EndD: DateFin,
            session: session

        };
        return this.httpClient.get(`${environment.serverURL}` + apiUrlQuestionnaire + '/getAllQuestDate', {
            ...httpOptions,
            responseType: 'json',
            params: params
        }).pipe(
            tap(),
        );
    }

    getByEtudiantGroupeSession(CP: any, Groupe: any, session: any): Observable<any> {
        const params = {
            CP: CP,
            Groupe: Groupe,
            Session: session

        };
        return this.httpClient.get(`${environment.serverURL}` + apiUrlEtudGroup + '/getByEtudiantGroupeSession', {
            ...httpOptions,
            responseType: 'json',
            params: params
        }).pipe(
            tap(),
        );
    }

    getByGroupeEtudiantBySessionEtudiant(session: any, CP: any,): Observable<any> {
        const params = {
            session: session,
            cp: CP
        };
        return this.httpClient.get(`${environment.serverURL}` + apiUrlEtudGroup + '/getBySessionAndEtudiant', {
            ...httpOptions,
            responseType: 'json',
            params: params
        }).pipe(
            tap(),
        );
    }

    getQuestionnnaireByDateSessionEtudiant(DateDebut: any, DateFin: any, session: any, cp: any): Observable<any> {
        const params = {
            StartD: DateDebut,
            EndD: DateFin,
            session: session,
            cp: cp

        };
        return this.httpClient.get(`${environment.serverURL}` + apiUrlQuestionnaire + '/getAllQuestByDateSessionGroupe', {
            ...httpOptions,
            responseType: 'json',
            params: params
        }).pipe(
            tap(),
            // catchError(this.handleError<any>('getQuestionnnaireByDateSessionGroupEtudiant'))
        );
    }

    getByQuestionnaireTypeAndDate(type: any, DateDebut: any, DateFin: any): Observable<any> {
        const params = {
            type: type,
            StartD: DateDebut,
            EndD: DateFin
        };
        return this.httpClient.get(`${environment.serverURL}` + apiUrlQuestionnaire + '/getByQuestionnaireTypeAndDate', {
            ...httpOptions,
            responseType: 'json',
            params: params
        }).pipe(
            tap(),
            // catchError(this.handleError<any>('getQuestionnnaireByDateSessionGroupEtudiant'))
        );
    }

    getComplementByQuestionnaire(questionnaire: any): Observable<any> {
        const params = {questionnaire: questionnaire};
        return this.httpClient.get(`${environment.serverURL}` + apiUrlComplement + '/getByQuestionnaire', {
            ...httpOptions,
            responseType: 'json',
            params: params
        }).pipe(
            tap(),
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error); // log to console instead
            return of(result as T);
        };
    }
}
