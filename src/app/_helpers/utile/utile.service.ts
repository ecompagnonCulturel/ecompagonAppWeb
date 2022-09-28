import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtileService {

  constructor() { }

 removeDuplicates(originalArray, prop) {
     // tslint:disable-next-line:prefer-const
      let newArray = [];
     // tslint:disable-next-line:prefer-const
      let lookupObject  = {};

     // tslint:disable-next-line:forin
      for(const i in originalArray) {
         lookupObject[originalArray[i][prop]] = originalArray[i];
      }

     /*// tslint:disable-next-line:forin
      for(i in lookupObject) {
          newArray.push(lookupObject[i]);
      }*/
      return newArray;
  }

  sortDataBydate(data, field) {
      return data.sort((a, b) => {
          return <any> new Date(b.field) - <any> new Date(a.field);
      });
  }

    DiffDate(s) {
       if( s < 0)
       {
           s = s * (-1);
       }
        let ms = s % 1000;      
         s= (s - ms) / 1000;//sec
        //console.log('ms ' + s);
        let secs = s % 60;
        s = (s - secs) / 60;//min
        //console.log('s ' + secs);
        let mins = s % 60;
       // console.log(mins);
        s = (s-mins) / 60;//hr
        //console.log('min ' + mins);
        let hrs = s % 24;
        s = (s - hrs) / 24;//j
       //console.log('h ' + hrs);
        let days = s % 30;
        s = (s - days) / 30;//mois
        //console.log('days'  + days);
        let months = s % 12;
        s = (s - months) / 12;//année
        //console.log('month ' + months);
        let years = s;
        //console.log('year ' + years);
        if (mins == 0 &&hrs == 0 &&  days == 0 && months == 0 && years == 0)
            return 'à l\'instant';
        else if (hrs == 0 &&  days == 0 && months == 0 && years == 0) {
            if (mins > 1)
                return mins + ' mins déjà';
            else
                return 'à l\'instant';
        }else if (hrs < 24 &&  days == 0 && months == 0 && years == 0) {
            if ((hrs > 1 && mins<30)||(hrs > 1 && mins==0))
                return hrs + ' heures déjà';
            else if (hrs > 1 && mins>=30)
                return hrs + ' heures et démie déjà';
            else if (hrs==1 && mins>=30)
                return hrs + ' heure et démie déjà';
            else if (hrs==1 && mins<30)
                return hrs + ' heure  déjà';
            else
                return mins + ' mins déjà';

        } else if (days < 30 && months == 0 && years == 0) {
            if ((days >=1 && hrs>=1)||(days ==1 && hrs>=1))//tant que le  nouveau jour a commencé, il incrémente de 1 le nombre de jour
                return (days +1) + ' jours déjà';
           else if (days>=1&& hrs==0)
                 return days + ' jours déjà';
            else
                return hrs + ' heures déjà';
        } else if (months < 12 && years == 0) {
            if ((months >=1 && days<15)||(months >=1 && days==0))
                return months + ' mois déjà';
            else if ((months >=1 && days>=15)||(months ==1 && days>=15))
                return months + ' mois et démi déjà';
            else
                return days + ' jours déjà';

        } else {

            if ((years > 1 && months<6)|| (years>1 && months==0))
                return years + ' années déjà';
            else if (years>1 && months>=6)
                return s + ' années et démie déjà';
            else if (years==1 && months>=6)
                return s + ' année et démie déjà';
            else if ((years==1 && months<6)|| (years==1 && months==0))
                return s + ' année déjà';
            else
                return months + ' mois déjà';
        }
    }

  sort(obj1:any, obj2:any) {
        if(obj2 > obj1) {
            return 1;
        } else {
            return -1;
        }
        return 0;
    };
}
