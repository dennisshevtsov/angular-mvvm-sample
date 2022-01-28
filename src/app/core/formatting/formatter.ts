import { formatDate, } from '@angular/common';
import { Injectable, } from '@angular/core';

import { MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MENUTE, } from '../date';

export const DATE_FORMAT: string = 'yyyy-MM-dd';
export const DATE_LOCALE: string = 'en-US';

export const TIME_FORMAT: string = 'HH:mm';
export const TIME_LOCALE: string = DATE_LOCALE;

@Injectable({
  providedIn: 'root',
})
export class Formatter {
  public toLocalDate(date: number): string {
    return formatDate(date, DATE_FORMAT, DATE_LOCALE);
  }

  public fromLocalDate(date: string): number {
    return Date.parse(date);
  }

  public toLocalTime(date: number): string {
    return formatDate(date, TIME_FORMAT, TIME_LOCALE);
  }

  public fromLocalTime(date: string): number {
    const dateParts = date.split(':');

    const hours = parseInt(dateParts[0]);
    const minutes = parseInt(dateParts[1]);

    const time = new Date();

    time.setHours(hours);
    time.setMinutes(minutes);

    const utc = time.getUTCHours() * MILLISECONDS_IN_HOUR +
                time.getUTCMinutes() * MILLISECONDS_IN_MENUTE;

    return utc;
  }
}
