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
  private hourStepValue   : number;
  private menutesStepValue: number;
  private value           : number;

  public constructor() {
    this.hourStepValue = 1;
    this.menutesStepValue = DEFAULT_MENUTES_STEP;
    this.value = 0;
  }

  @Input()
  public set menutesStep(value: number) {
    this.menutesStepValue = value;
  }

  public get hours(): number {
    return (this.value / MILLISECONDS_IN_HOUR) >> 0;
  }

  public get minutes(): number {
    return (this.value % MILLISECONDS_IN_HOUR / MILLISECONDS_IN_MENUTE) >> 0;
  }

  public increaseHours() {
    let value = this.value;

    value = value + MILLISECONDS_IN_HOUR * this.hourStepValue;
    value = value % HOURS_IN_DAY;

    this.value = value;
  }

  public decreaseHours() {
    let value = this.value;

    value = value - this.hourStepValue;

    if (value < 0) {
      value = value + HOURS_IN_DAY;
    }

    this.value = value;
  }

  public increaseMenutes() {
    let value = this.value;

    value = value + MILLISECONDS_IN_MENUTE * this.menutesStepValue;
    value = value % MILLISECONDS_IN_HOUR;

    this.value = value;
  }

  public decreaseMenutes() {
    let value = this.value;

    value = value - MILLISECONDS_IN_MENUTE * this.menutesStepValue;

    if (value < 0) {
      value = value + MILLISECONDS_IN_HOUR;
    }

    this.value = value;
  }
}
