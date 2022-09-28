import {Injectable } from '@angular/core';
import { Favoris } from '../models/favoris';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ResourceAPIService } from '../resource/resource-api.service';
import { UserService } from '../../authentification/User.service';
import {Resources} from '@app/formation/models/resource';

const httpOptions =  new HttpHeaders({ 'Content-Type': 'json'});
const apiUrlFavoris = '/api/Favoris';


@Injectable({
  providedIn: 'root'
})
export class FavorisService {
constructor(private readonly httpClient: HttpClient) { }
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); // log to console instead
        return of(result as T);
      };
    }

  addFavoris(favoris: any): Observable<any> {
      return this.httpClient.post(`${environment.serverURL}` + apiUrlFavoris + '/addFavoris', favoris, { ...httpOptions, responseType: 'text' }).pipe(
        tap(),
        catchError(this.handleError<Favoris>('addFavoris'))
      );
    }

    getFavorisByUserAndResources(idResource, iduser): Observable<any> {
    const params = {
                      FavResource: idResource,
                      FavUser: iduser
                    };
    return this.httpClient.get(`${environment.serverURL}` + apiUrlFavoris + '/getFavorisByUserAndResources', { ...httpOptions, responseType: 'json', params }).pipe(
            tap(),
            catchError(this.handleError<any>('getFavorisResourceById'))
          );
        }

    getFavorisByUser(idUser: any): Observable<any> {
       // let userFav=this.authentificationService.userData;
       // console.log(userFav);
         const params = {FavUser: idUser};
         return this.httpClient.get(`${environment.serverURL}`
             + apiUrlFavoris + '/getFavorisByUser', { ...httpOptions, responseType: 'json', params }).pipe(
                    tap(),
                    catchError(this.handleError<any>('getAllFavoris'))
                  );
                }

deleteFavoris(idFavoris: any): Observable<any> {
    const params = {idFavoris};

    return this.httpClient.delete(`${environment.serverURL}` +
        apiUrlFavoris + '/delFavorise', { ...httpOptions, responseType: 'text', params }).pipe(
      tap(),
      catchError(this.handleError('deleteFavoris'))
    );
  }



}
