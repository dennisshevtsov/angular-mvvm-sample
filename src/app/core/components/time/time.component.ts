import { Component, Input, } from '@angular/core';

import { HOURS_IN_DAY,
         MILLISECONDS_IN_HOUR,
         MILLISECONDS_IN_MENUTE, } from '../../date';

export const DEFAULT_MENUTES_STEP = 15;

@Component({
  selector: 'time',
  templateUrl: './time.component.html',
  styleUrls: [
    './time.component.scss',
  ],
})
export class TimeComponent {
  private menutesStep: number;
  private time       : number;

  public constructor() {
    this.menutesStep = DEFAULT_MENUTES_STEP;
    this.time = 0;
  }

  @Input()
  public set step(value: number) {
    this.menutesStep = value;
  }

  @Input()
  public set value(value: number) {
    this.time = value;
  }

  public get hours(): number {
    return this.time / MILLISECONDS_IN_HOUR >> 0;
  }

  public get minutes(): number {
    return this.time % MILLISECONDS_IN_HOUR / MILLISECONDS_IN_MENUTE >> 0;
  }

  public increaseHours() {
    let value = this.time;

    value = value + 1;
    value = value % HOURS_IN_DAY;

    this.time = value;
  }

  public decreaseHours() {
    let value = this.time;

    value = value - 1;

    if (value < 0) {
      value = value + HOURS_IN_DAY;
    }

    this.time = value;
  }

  public increaseMenutes() {
    let value = this.time;

    value = value + MILLISECONDS_IN_MENUTE * this.menutesStep;
    value = value % MILLISECONDS_IN_HOUR;

    this.time = value;
  }

  public decreaseMenutes() {
    let value = this.time;

    value = value - MILLISECONDS_IN_MENUTE * this.menutesStep;

    if (value < 0) {
      value = value + MILLISECONDS_IN_HOUR;
    }

    this.time = value;
  }
}
