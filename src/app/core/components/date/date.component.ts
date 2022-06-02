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

  public constructor() {
    this.dateValue = 0;
    this.onChange = () => {};
  }

  public get value(): number {
    return this.dateValue;
  }

  public set value(value: number) {
    this.dateValue = value;
  }

  public writeValue(value: number): void {
    this.dateValue = value;
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
  }

  public setDisabledState(disabled: boolean): void {
  }
}
