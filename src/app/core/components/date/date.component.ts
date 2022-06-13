import { Component,            } from '@angular/core';
import { AbstractControl,
         ControlValueAccessor,
         NG_VALIDATORS,
         NG_VALUE_ACCESSOR,
         ValidationErrors,
         Validator,            } from '@angular/forms';

import { Formatter, } from 'src/app/core/formatting';

@Component({
  selector: 'date',
  templateUrl: './date.component.html',
  styleUrls: [
    './date.component.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DateComponent,
    },
  ],
})
export class DateComponent implements ControlValueAccessor, Validator {
  private dateValue: number;
  private onChange : (value: any) => void;
  private onTouched: () => void;

  private disabledValue: boolean;
  private touchedValue : boolean;

  public constructor(
    private readonly formatter: Formatter,
  ) {
    this.dateValue = 0;
    this.onChange  = () => {};
    this.onTouched = () => {};

    this.disabledValue = false;
    this.touchedValue  = false;
  }

  public get value(): string {
    return this.formatter.toLocalDate(this.dateValue);
  }

  public set value(value: string) {
    if (!this.disabled && value) {
      this.dateValue = this.formatter.fromLocalDate(value);

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

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
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

  public validate(control: AbstractControl)
  : ValidationErrors | null {
    const errors: ValidationErrors = {};

    return errors;
  }
}
