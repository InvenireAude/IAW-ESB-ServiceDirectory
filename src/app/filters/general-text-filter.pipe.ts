import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalTextFilter'
})
export class GeneralTextFilterPipe implements PipeTransform {

    transform(items: any[], filter: any): any[] {
      if (!items || !filter) {
        return items;
      }
      return items.filter((item: any) => this.applyFilter(item, filter));
    }

    applyFilter(item: any, filter: any): boolean {

      for (const field in item) {
        if (item[field]) {
          if (typeof item[field] === 'string') {
            if (item[field].toLowerCase().indexOf(filter.toLowerCase()) === -1) {
              return false;
            }
          } else if (typeof item[field] === 'number') {
            if (item[field] !== filter) {
              return false;
            }
          }
        }
      }
      return true;
    }
  }
