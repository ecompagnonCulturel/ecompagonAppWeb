import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
data:any;

  constructor(public http: HttpClient) { }

     getActivities() {
      fetch('${environment.serverURL}/activities').then(res => res.json())
         .then(json => {
           this.data = json;
           console.log(this.data);
         });

    }
}
