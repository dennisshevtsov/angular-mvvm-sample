import { Component,            } from '@angular/core';
import { ControlValueAccessor,
         NG_VALUE_ACCESSOR,    } from '@angular/forms';

import { TodoListTaskDateDto, } from 'src/app/todo-list-task/api';

@Component({
  selector: 'todo-list-task-period',
  templateUrl: './todo-list-task-period.component.html',
  styleUrls: [
    './todo-list-task-period.component.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TodoListTaskPeriodComponent,
    }
  ],
})
export class TodoListTaskPeriodComponent implements ControlValueAccessor {
  private period   : undefined | TodoListTaskDateDto;
  private onChange : any;
  private onTouched: any;
  private disabled : boolean = false;

  public writeValue(obj: any): void {
    this.period = obj;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
