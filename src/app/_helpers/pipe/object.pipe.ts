import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regObject'
})
export class ObjectPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => {
     // console.log(item);
      if(item.ressRegion.id!==filter.id)
      {
        return false;
      }
      return true;
    });
  }

}
