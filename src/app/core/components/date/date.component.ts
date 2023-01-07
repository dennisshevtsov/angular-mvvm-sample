import { Component } from '@angular/core';

import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR    } from '@angular/forms';

import { Formatter } from 'src/app/core/formatting';

@Component({
  selector: 'date',
  templateUrl: './date.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateComponent,
    },
  ],
})
export class DateComponent implements ControlValueAccessor {
  private dateValue: undefined | number;
  private onChange : (value: undefined | number | string) => void;
  private onTouched: () => void;

  private disabledValue: boolean;
  private touchedValue : boolean;

  public constructor(
    private readonly formatter: Formatter,
  ) {
    this.dateValue = undefined;
    this.onChange  = () => {};
    this.onTouched = () => {};

    this.disabledValue = false;
    this.touchedValue  = false;
  }

  public get value(): string {
    return this.dateValue ? this.formatter.toLocalDate(this.dateValue) : '';
  }

  public set value(value: string) {
    if (!this.disabled) {
      this.dateValue = this.convertToDate(value);

      this.setTouchedState();
      this.onChange(this.dateValue);
    }
  }

  public get disabled(): boolean {
    return this.disabledValue;
  }

  public writeValue(value: number): void {
    this.dateValue = value;
  }

  public registerOnChange(
    fn: (value: undefined | number | string) => void): void {
    this.onChange = (value) => fn(this.convertToDate(value));
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
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

  private convertToDate(value: undefined | number | string): undefined | number {
    let date = undefined;

    if (value) {
      if (typeof value === 'string') {
        date = this.formatter.fromLocalDate(value);
      } else if (typeof value === 'number') {
        date = value;
      }
    }

    return date;
  }
}
