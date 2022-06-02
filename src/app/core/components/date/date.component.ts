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
  private value   : number;
  private onChange: (value: any) => void;

  public constructor() {
    this.value = 0;
    this.onChange = () => {};
  }

  public get date(): number {
    return this.value;
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
  }
}
