import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keysNoType'})
export class KeysNoTypePipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
     if(key != '_dmType')   
        keys.push(key);
    }
    return keys;
  }
}
