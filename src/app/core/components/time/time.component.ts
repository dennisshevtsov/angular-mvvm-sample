import { Component, Input,     } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR     } from '@angular/forms';

import { HOURS_IN_DAY, MILLISECONDS_IN_HOUR, Timer,     } from 'src/app/core/date';
import { Formatter, } from 'src/app/core/formatting';

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
  private minutesStepValue: number;
  private value           : number;

  private disabledValue: boolean;
  private touchedValue : boolean;

  private onChange : (value: any) => void;
  private onTouched: () => void;

  public constructor(
    private readonly timer    : Timer,
    private readonly formatter: Formatter,
  ) {
    this.hourStepValue = 1;
    this.minutesStepValue = DEFAULT_MENUTES_STEP;
    this.value = 0;

    this.disabledValue = false;
    this.touchedValue = false;

    this.onChange = (value: any) => {};
    this.onTouched = () => {};
  }

  @Input()
  public set menutesStep(value: number) {
    this.minutesStepValue = value;
  }

  public get day(): string {
    return this.formatter.toLocalDate(this.value);
  }

  public set day(day: string) {
    let value = this.value;

    value %= HOURS_IN_DAY * MILLISECONDS_IN_HOUR;
    value += this.formatter.fromLocalDate(day);

    this.value = value;
  }

  public get hours(): number {
    return this.formatter.toLocalHours(this.value);
  }

  public get minutes(): number {
    return this.formatter.toLocalMinutes(this.value);
  }

  public get disabled(): boolean {
    return this.disabledValue;
  }

  public increaseHours() {
    if (!this.disabled)
    {
      this.value = this.timer.increaseHours(this.value, this.hourStepValue);

      this.onChange(this.value);
      this.setTouchedState();
    }
  }

  public decreaseHours() {
    if (!this.disabled) {
      this.value = this.timer.decreaseHours(this.value, this.hourStepValue);

      this.onChange(this.value);
      this.setTouchedState();
    }
  }

  public increaseMinutes() {
    if (!this.disabled) {
      this.value = this.timer.increaseMinutes(this.value, this.minutesStepValue);

      this.onChange(this.value);
      this.setTouchedState();
    }
  }

  public decreaseMinutes() {
    if (!this.disabled) {
      this.value = this.timer.decreaseMinutes(this.value, this.minutesStepValue);

      this.onChange(this.value);
      this.setTouchedState();
    }
  }

  public writeValue(value: number): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState(disabled: boolean): void {
    this.disabledValue = disabled;
  }

  public setTouchedState(): void {
    if (!this.touchedValue) {
      this.touchedValue = true;
      this.onTouched();
    }
  }
}
