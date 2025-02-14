import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(value: string | number): string {
    let val = value.toString().replace(/\D/g, '');

    if (val.length === 11) {
      return `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(7, 11)}`;
    } else if (val.length === 10) {
      return `(${val.substring(0, 2)}) ${val.substring(2, 6)}-${val.substring(6, 10)}`;
    } else {
      return value.toString();
    }
  }
}