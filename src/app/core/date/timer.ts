import { Injectable, } from '@angular/core';

import { HOURS_IN_DAY,
         MILLISECONDS_IN_HOUR,
         MILLISECONDS_IN_MENUTE, } from './app-clock';

@Injectable({
  providedIn: 'root',
})
export class Timer {
  public increaseHours(value: number, step: number): number {
    value = value + MILLISECONDS_IN_HOUR * step;
    value = value % (HOURS_IN_DAY * MILLISECONDS_IN_HOUR);

    return value;
  }

  public decreaseHours(value: number, step: number): number {
    value = value - MILLISECONDS_IN_HOUR * step;

    if (value < 0) {
      value = value + HOURS_IN_DAY * MILLISECONDS_IN_HOUR;
    }

    return value;
  }

  public increaseMinutes(value: number, step: number): number {
    let menutes = value;

    menutes = menutes + MILLISECONDS_IN_MENUTE * step;
    menutes = menutes % MILLISECONDS_IN_HOUR;

    let hours = value;

    hours = (hours / MILLISECONDS_IN_HOUR) >> 0;
    hours = hours * MILLISECONDS_IN_HOUR;

    return hours + menutes;
  }

  public decreaseMinutes(value: number, step: number): number {
    let menutes = value;

    menutes = menutes % MILLISECONDS_IN_HOUR;
    menutes = menutes - MILLISECONDS_IN_MENUTE * step;

    if (menutes < 0) {
      menutes = menutes + MILLISECONDS_IN_HOUR;
    }

    let hours = value;

    hours = (hours / MILLISECONDS_IN_HOUR) >> 0;
    hours = hours * MILLISECONDS_IN_HOUR;

    return hours + menutes;
  }
}
