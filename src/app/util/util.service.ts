import {Injectable} from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private readonly navCtrl: NavController,
                private readonly loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private router: Router,
                private readonly toastCtrl: ToastController) {
    }


    async successAlert(header: any, message: any) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
            buttons: [{
                text: 'OK',
                handler: (data: any) => {
                    this.router.navigateByUrl('/login', {replaceUrl: true});
                }
            }],
        });
        await alert.present();
    }

    async successAlertConnected(header: any, message: any) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
            buttons: [{
                text: 'OK',
                handler: (data: any) => {
                    this.router.navigateByUrl('/home', {replaceUrl: true});
                }
            }],
        });
        await alert.present();
    }

    async successAlertNoAction(header: any, message: any) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
            buttons: [{
                text: 'OK',
                handler: (data: any) => {

                }
            }],
        });
        await alert.present();
    }


    async errorAlert(header: any, message: any) {
        const alert = await this.alertCtrl.create({
            header: header,
            message: message,
            buttons: [{
                text: 'OK',
                handler: (data: any) => {
                    // this.router.navigateByUrl('/login', {replaceUrl: true});
                }
            }],
        });
        await alert.present();
    }


    delDuplicateRegion(liste: any, object: any) {
        let test = liste;
        let new_test = object;
        new_test[0].regNom = test[0].regNom;
        new_test[0].id = test[0].id;

        for (let i = 0; i <= test.length - 1; i++) {
            var duplicate = false;
            for (let j = new_test.length - 1; j >= 0; j--) {
                if (test[i].id == new_test[j].id) {
                    duplicate = true;
                }
            }
            if (!duplicate) {
                new_test.push(test[i]);
            }

        }
        return new_test;
    }

    delDuplicateSession(liste: any, object: any) {
        let test = liste;
        let new_test = object;
        new_test[0].sessNom = test[0].sessNom;
        new_test[0].id = test[0].id;
        new_test[0].sessStatus = test[0].sessStatus;
        new_test[0].sessYear = test[0].sessYear;
        new_test[0].sessStart = test[0].sessStart;
        new_test[0].sessMiddle = test[0].sessMiddle;
        new_test[0].sessEnd = test[0].sessEnd;

        for (let i = 0; i <= test.length - 1; i++) {
            var duplicate = false;
            for (let j = new_test.length - 1; j >= 0; j--) {
                if (test[i].id == new_test[j].id) {
                    duplicate = true;
                }
            }
            if (!duplicate) {
                new_test.push(test[i]);
            }

        }
        return new_test;
    }


    showHideSession(liste: any) {
        let sessions = liste;
        let new_more = [];
        for (let i = 0; i <= sessions.length - 1; i++) {
            let more = {'id': i, 'value': false};
            new_more.push(more);
        }
        return new_more;
    }

    delDuplicateRessource(liste: any, object: any) {
        let test = liste;
        let new_test = object;
        //new_test[0].regNom=test[0].regNom;
        new_test[0] = test[0];
        for (let i = 0; i <= test.length - 1; i++) {
            var duplicate = false;
            for (let j = new_test.length - 1; j >= 0; j--) {
                if (test[i].id == new_test[j].id) {
                    duplicate = true;
                }
            }
            if (!duplicate) {
                new_test.push(test[i]);
            }

        }
        return new_test;
    }

    bold(text: any) {
        if (text.includes('#')) {
            let textSplit: any = [];
            textSplit = text.split('#');
            let size = textSplit.length;
            //console.log(textSplit);
            if (size == 3) {
               /* textSplit[1]=textSplit[1].cssText("max-width: var(--text-max-width); \n" +
                    "  margin: 0;\n" +
                    "  font-size: var(--font-size);\n" +
                    "  line-height: var(--line-height);\n" +
                    "  word-break: break-word;\n" +
                    "  background-image: linear-gradient(transparent calc((var(--line-height)) - 4px), #000000 100%);\n" +
                    "  background-size: 100% var(--line-height);\n" +
                    "  background-repeat: repeat-y;");*/
            }
            return textSplit.join(' ');
        } else {
            return text;
        }


    }


    fromJsonToString(json: any) {
        //console.log(JSON.parse(text));
        if(json!==null)
        {
            return JSON.stringify(json);
        }
        else {
            return null;
        }

    }

    fromStringToJson(text: any) {
        //console.log(JSON.parse(text));
        if(text!==null)
        {
            return JSON.parse(text);
        }
        else {
            return null;
        }

    }

    fromStringToNumber(text: any) {
        if(text!==null)
        {
            return Number(text);
        }
        else {
            return null;
        }
        //console.log(JSON.parse(text));

    }

    ObjectExist(items: any, object: any) {
       // console.log(items)
        let result: any = false;
        if(items!==undefined)
        {
            items = JSON.parse(items);
            items.forEach(value => {
                if ((value.id == object.id) && (value.value == object.value)) {
                    result = true;
                }

            });
        }


        return result;
    }


    forceLower(strInput)
    {
        strInput.value = strInput.value.toLowerCase();
    }

    forceUpper(strInput)
    {
        strInput.value = strInput.value.toUpperCase();
    }

}
