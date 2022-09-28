import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Resources } from '../models/resource';
import { environment } from '../../../environments/environment';
import { IonInfiniteScroll  } from '@ionic/angular';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const headers = new HttpHeaders({ 'Content-Type': 'json'});
const apiUrlResc = '/api/Resources';
const apiUrlRescCate = '/TypeRessource/getTypeRessource';
const apiUrlRescCours = '/api/CourseResource';
const apiUrlCours = '/cours';

@Injectable({
  providedIn: 'root'
})
export class ResourceAPIService {
  /* @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll; */
 totalCategories = 0;
  limit = 10;
  session = 'hiver 2021';
 public CpEtudiant = '';

  constructor(private readonly httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getAllResources(): Observable<Resources[]> {

    return this.httpClient.get<Resources[]>(`${environment.serverURL}` + apiUrlResc+ '/getAllResources',{responseType: 'json', headers})
      .pipe(
        tap(),
        catchError(this.handleError('getResources', []))
      );
  }


 getRessourceByCat(cate): Observable<any> {
     const params = {
         "tRDesc": cate
        }
          return this.httpClient.get(`${environment.serverURL}` + apiUrlResc+'/getResourceBytRDesc/'+cate,{ responseType: 'json', headers })
            .pipe(
              tap(category => console.log('fetched RessourceByCat')
                              ),
              catchError(this.handleError('getRessourceByCat',[]))
            );
        }

  getRessourceCours(id,): Observable<any> {
      const params = {
           'ressource': id,

         }
           return this.httpClient.get(`${environment.serverURL}` + apiUrlRescCours+"/getByCoursResResource",{ responseType: 'json', headers,params:params })
             .pipe(
               tap(),
               catchError(this.handleError('getRessourceCours',[]))
             );
         }



    getAllResourceCours(): Observable<any> {
       /*const params = {
            session:session
        }*/
        return this.httpClient.get(`${environment.serverURL}` + apiUrlRescCours+"/getRessourceBySession",{ responseType: 'json', headers})
            .pipe(
                tap(),
                catchError(this.handleError('getRessourceCours',[]))
            );
    }

    getResourceByCours(id): Observable<any> {
        const params = {
            cours: id,

        }
        return this.httpClient.get(`${environment.serverURL}` + apiUrlRescCours+"/getRessourceByCours",{ responseType: 'json', headers,params:params })
            .pipe(
                tap(),
                catchError(this.handleError('getRessourceCours',[]))
            );
    }

          getResourceByListId(id:[]): Observable<any> {
         /*  let params = new HttpParams();
          params = params.append('id', id.join(', ')); */
                    const params = {
                             'id': id,
                          };
                    return this.httpClient.get(`${environment.serverURL}` + apiUrlResc,{ params })
                        .pipe(
                          tap(),
                          catchError(this.handleError('getRessourceCours',[]))
                        );
                    }


  getResourceById(id: any): Observable<any> {
    const url = `${environment.serverURL}`+`${apiUrlResc+"/getResourceById"}/${id}`;
    return this.httpClient.get<Resources>(url).pipe(
      tap(),
      catchError(this.handleError<Resources>(`getResource id=${id}`))
    );
  }


  getResourceCoursById(idResource, idCours): Observable<any> {

      const params = {
                       ressource: idResource,
                       cours: idCours

      }
      return this.httpClient.get(`${environment.serverURL}` +apiUrlRescCours+"/getCourseResourseByResourceAndCours",{ responseType: 'json', headers,params:params } ).pipe(
        tap(),
        catchError(this.handleError<Resources>(`getResourceCoursById id=${idCours}`))
      );
    }

  //Add comment and like
  updateResource(id: any, resource: any): Observable<any> {
      const url = `${environment.serverURL}`+`${apiUrlResc}/${id}`;
      return this.httpClient.put(url, resource, httpOptions).pipe(
        tap(),
        catchError(this.handleError<any>('updateResource'))
      );
    }

 getAllCategories(): Observable<any> {
      return this.httpClient.get(`${environment.serverURL}`+apiUrlRescCate)
        .pipe(
          tap(),
          catchError(this.handleError('getCategories',[]))
        );
    }

    getAllCours(): Observable<any> {
   /* const params = {
                       courSession: sessNom,
                       'courStudGroup.groupEtudiant.etudCP': this.CpEtudiant
                     }*/
          return this.httpClient.get(`${environment.serverURL}`+ apiUrlRescCours+"/getCoursBySession",{ responseType: 'json', headers})
            .pipe(
              tap(),
              catchError(this.handleError('getCours',[]))
            );
        }

}
