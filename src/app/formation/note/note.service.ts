import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {Note} from '@app/formation/models/note';

const apiNote = '/api/Note';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private readonly httpClient: HttpClient) { }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getNoteByUserAndResource(idUser, idResource): Observable<any> {
    const params = {
      user: idUser,
      resource: idResource
    };
    return this.httpClient.get(`${environment.serverURL}` + apiNote + '/getNoteByUserAndResource',
        { ...httpOptions, responseType: 'json', params})
        .pipe(
            tap(),
            catchError(this.handleError('getAllnote', []))
        );
  }

  addNote(note: any): Observable<any> {
    return this.httpClient.post(`${environment.serverURL}` + apiNote + '/addNote', note, { ...httpOptions, responseType: 'text'}).pipe(
        tap(),
        catchError(this.handleError<Note>('addNote'))
    );
  }

  deleteNote(id: any): Observable<any>{
    const params = {
      id
    };
    return  this.httpClient.delete(`${environment.serverURL}` + apiNote + '/delNote', { ...httpOptions, responseType: 'text', params}).pipe(
        tap(),
        catchError(this.handleError<Note>('deleteNote'))
    );
  }
}
