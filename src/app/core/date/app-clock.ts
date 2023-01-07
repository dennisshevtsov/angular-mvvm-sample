import { Injectable } from '@angular/core';

export const HOURS_IN_DAY      = 24;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR   = 60;

export const MILLISECONDS_IN_SECOND = 1 * 1000;
export const MILLISECONDS_IN_MENUTE = 1 * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND;
export const MILLISECONDS_IN_HOUR   = 1 * MINUTES_IN_HOUR * MILLISECONDS_IN_MENUTE;
export const MILLISECONDS_IN_DAY    = 1 * HOURS_IN_DAY * MILLISECONDS_IN_HOUR;

@Injectable({
  providedIn: 'root',
})
export class AppClock {
  public time(date: Date = new Date()): number {
    return date.getUTCHours()   * MILLISECONDS_IN_HOUR +
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
