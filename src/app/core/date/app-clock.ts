import { Injectable, } from '@angular/core';

export const MILLISECONDS_IN_SECOND = 1 *  1000;
export const MILLISECONDS_IN_MENUTE = 1 * 60 * 1000;
export const MILLISECONDS_IN_HOUR   = 1 * 60 * MILLISECONDS_IN_MENUTE;

export const HOURS_IN_DAY = 24;

@Injectable({
  providedIn: 'root',
})
export class AppClock {
  public time(date: Date = new Date()): number {
    return date.getUTCHours() * MILLISECONDS_IN_HOUR +
           date.getUTCMinutes() * MILLISECONDS_IN_MENUTE;
  }

  public date(date: Date = new Date()): number {
    return Date.UTC(date.getUTCFullYear(),
                    date.getUTCMonth(),
                    date.getUTCDate());
  }

  public now(): number {
    const now: Date = new Date();

    return this.date(now) + this.time(now)
  }
}
