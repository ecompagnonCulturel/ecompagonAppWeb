import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: "filter"
   })
export class ArrayFilterPipe implements PipeTransform {

 transform(items: Array<any>, conditions: {[field: string]: any}): Array<any> {
         return items.filter(item => {
             for (let field in conditions) {
                 if (item[field] !== conditions[field]) {
                     return false;
                 }
             }
             return true;
         });
     }
/*  transform(value: any, args?: any): any {

    return (value || '').toUpperCase();
  } */

}
