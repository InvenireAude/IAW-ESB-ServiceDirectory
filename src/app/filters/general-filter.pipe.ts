import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalfilter',
  pure: false
})

export class GeneralFilterPipe implements PipeTransform {
  transform(items: any[], filter: any, pagination: any): any[] {
    if (!items || !filter) {
      return items;
    }

    const r = items.filter((item: any) => this.applyFilter(item, filter));
    if (pagination) {
      pagination.length = r.length;
    }

    return r;

  }

  applyFilter(item: any, filter: any): boolean {

    for (const field in filter) {
      if (filter[field] && item[field]) {

        const value = this.getValue(item[field]);

        if (typeof filter[field] === 'string') {
          if (value.toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (value !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  private getValue(item) {
    if (item instanceof Array) {
      let value = '';
      item.forEach(i => { value += i; });
      return value;
    } else {
      return item;
    }
  }
}
