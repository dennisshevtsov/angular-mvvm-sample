import { Component, Input, } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TimeComponent,
    },
  ],
})
export class TimeComponent implements ControlValueAccessor {
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
    value = value % (HOURS_IN_DAY * MILLISECONDS_IN_HOUR);

    this.value = value;
  }

  public decreaseHours() {
    let value = this.value;

    value = value - MILLISECONDS_IN_HOUR * this.hourStepValue;

    if (value < 0) {
      value = value + HOURS_IN_DAY * MILLISECONDS_IN_HOUR;
    }

    this.value = value;
  }

  public increaseMenutes() {
    let menutes = this.value;

    menutes = menutes + MILLISECONDS_IN_MENUTE * this.menutesStepValue;
    menutes = menutes % MILLISECONDS_IN_HOUR;

    let hours = this.value;

    hours = (hours / MILLISECONDS_IN_HOUR) >> 0;
    hours = hours * MILLISECONDS_IN_HOUR;

    this.value = hours + menutes;
  }

  public decreaseMenutes() {
    let menutes = this.value;

    menutes = menutes % MILLISECONDS_IN_HOUR;
    menutes = menutes - MILLISECONDS_IN_MENUTE * this.menutesStepValue;

    if (menutes < 0) {
      menutes = menutes + MILLISECONDS_IN_HOUR;
    }

    let hours = this.value;

    hours = (hours / MILLISECONDS_IN_HOUR) >> 0;
    hours = hours * MILLISECONDS_IN_HOUR;

    this.value = hours + menutes;
  }

  public writeValue(value: number): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: any) => void): void {
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState(isDisabled: boolean): void {
  }
}
