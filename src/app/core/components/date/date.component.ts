import { Component,            } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR,    } from '@angular/forms';

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
  ],
})
export class DateComponent implements ControlValueAccessor {
  private dateValue: number;
  private onChange : (value: any) => void;
  private onTouched: () => void;

  private disabledValue: boolean;
  private touchedValue : boolean;

  public constructor() {
    this.dateValue = 0;
    this.onChange  = () => {};
    this.onTouched = () => {};

    this.disabledValue = false;
    this.touchedValue  = false;
  }

  public get value(): number {
    return this.dateValue;
  }

  public set value(value: number) {
    if (!this.disabled) {
      this.dateValue = value;

      this.setTouchedState();
      this.onChange(value);
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
}
