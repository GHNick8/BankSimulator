import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'money', standalone: true })
export class MoneyPipe implements PipeTransform {
  transform(value: number, currency = 'EUR'): string {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value);
  }
}
