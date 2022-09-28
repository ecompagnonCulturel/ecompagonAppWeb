import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})

export class GlobalVariables {
     public  userId: number ;
    public  userMail: string ;
    public  userCP: string ;
    public  session:'hiver 2021';

    constructor(private storage: Storage) {

        }
}