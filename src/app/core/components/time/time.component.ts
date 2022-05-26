import { Component, Input,     } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR     } from '@angular/forms';

import { HOURS_IN_DAY,
         MILLISECONDS_IN_HOUR,
         MILLISECONDS_IN_MENUTE, } from 'src/app/core/date';
import { Formatter,              } from 'src/app/core/formatting';

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

  private disabledValue: boolean;
  private touchedValue: boolean;

  private onChange: (value: any) => void;
  private onTouched: () => void;

  public constructor(
    private readonly formatter: Formatter,
  ) {
    this.hourStepValue = 1;
    this.menutesStepValue = DEFAULT_MENUTES_STEP;
    this.value = 0;

    this.disabledValue = false;
    this.touchedValue = false;

    this.onChange = (value: any) => {};
    this.onTouched = () => {};
  }

  @Input()
  public set menutesStep(value: number) {
    this.menutesStepValue = value;
  }

  public get hours(): number {
    return this.formatter.toHours(this.value);
  }

  public get minutes(): number {
    return this.formatter.toMinutes(this.value);
  }

  public get disabled(): boolean {
    return this.disabledValue;
  }

  public increaseHours() {
    if (!this.disabled)
    {
      let value = this.value;

      value = value + MILLISECONDS_IN_HOUR * this.hourStepValue;
      value = value % (HOURS_IN_DAY * MILLISECONDS_IN_HOUR);

      this.value = value;

      this.onChange(this.value);
      this.setTouchedState();
    }
  }

  public decreaseHours() {
    if (!this.disabled) {
      let value = this.value;

      value = value - MILLISECONDS_IN_HOUR * this.hourStepValue;
  
      if (value < 0) {
        value = value + HOURS_IN_DAY * MILLISECONDS_IN_HOUR;
      }

      this.value = value;

      this.onChange(this.value);
      this.setTouchedState();
    }
  }

  public increaseMenutes() {
    if (!this.disabled) {
      let menutes = this.value;

      menutes = menutes + MILLISECONDS_IN_MENUTE * this.menutesStepValue;
      menutes = menutes % MILLISECONDS_IN_HOUR;

      let hours = this.value;

      hours = (hours / MILLISECONDS_IN_HOUR) >> 0;
      hours = hours * MILLISECONDS_IN_HOUR;

      this.value = hours + menutes;

      this.onChange(this.value);
      this.setTouchedState();
    }
  }

  public decreaseMenutes() {
    if (!this.disabled) {
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
