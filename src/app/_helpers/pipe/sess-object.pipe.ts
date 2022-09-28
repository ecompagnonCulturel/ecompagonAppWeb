import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sessObject'
})
export class SessObjectPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => {
      //console.log(item.ressRegion);
      if(item.coursResSession.id!==filter.id)
      {
        return false;
      }
      return true;
    });
  }

}
