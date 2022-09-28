import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {Favoris} from '@app/formation/models/favoris';
import {Note} from '@app/formation/models/note';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrlComment = '/api/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private readonly httpClient: HttpClient) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }


  addComment(comment: any): Observable<any> {
    return this.httpClient.post(`${environment.serverURL}`
        + apiUrlComment + '/addComment', comment, { ...httpOptions, responseType: 'text'}).pipe(
        tap(),
        catchError(this.handleError<Favoris>('addComment'))
    );
  }

 updateComment(comment: any): Observable<any> {
    console.log(comment);
    return this.httpClient.post(`${environment.serverURL}` + apiUrlComment + '/updateComment', comment, { ...httpOptions, responseType: 'text'}).pipe(
        tap((comm: any) => console.log(`added comment w/ id=${comm.id}`)),
        catchError(this.handleError<Comment>('addComment'))
    );
  }

  getCommentByUser(idUser: any): Observable<any> {
   // let userFav=this.authentificationService.userData;
    // console.log(userFav);
    const params = {
      commentStatut: '1',
      commentUser: idUser

    };
    return this.httpClient.get(`${environment.serverURL}` + apiUrlComment, { ...httpOptions, responseType: 'json', params }).pipe(
        tap(),
        catchError(this.handleError<any>('getCommentByUser'))
    );
  }
  getCommentsByResource(idRessource): Observable<any> {
    // let userFav=this.authentificationService.userData;
    // console.log(userFav);
    const params = {
      resource: idRessource
    };
    return this.httpClient.get(`${environment.serverURL}` + apiUrlComment + '/getCommentsByResource',
        { ...httpOptions, responseType: 'json', params}).pipe(
        tap(/*(data: any) => data.sort((a, b) => a.commentDate <= b.commentDate ? -1 : 1)*/),
        catchError(this.handleError<any>('getAllComment'))
    );
  }

  deleteComment(idComment: any): Observable<any> {
    const params = {
      id: idComment
    };
    return this.httpClient.delete(`${environment.serverURL}`
        + apiUrlComment + '/delComment', { ...httpOptions, responseType: 'text', params} ).pipe(
        tap(_ => console.log(`deleted comment id=${idComment}`)),
        catchError(this.handleError('deleteComment'))
    );
  }


  /*updateComment(comment: any, id: any): Observable<any> {
    const endPoints = apiUrlComment + '/' + id;
    return this.httpClient.put(`${environment.serverURL}` + endPoints, comment,{ ...httpOptions, responseType: 'json'}).pipe(
        tap((comm: any) => console.log(`update comment w/ id=${comm.id}`)),
        catchError(this.handleError<any>('updateNote'))
    );
  }*/
}
