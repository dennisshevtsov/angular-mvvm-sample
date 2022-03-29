import { Component, Input, OnInit, } from '@angular/core';
import { AbstractControlOptions,
         ControlValueAccessor,
         FormBuilder, FormGroup,
         NG_VALUE_ACCESSOR,
         Validators,               } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { TodoListTaskDateDto, } from 'src/app/todo-list-task/api';
import { timePeriodValidator, } from 'src/app/todo-list-task/validators';

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
export class TodoListTaskPeriodComponent
  implements OnInit, ControlValueAccessor {
  @Input()
  private period!:TodoListTaskDateDto;

  private readonly subscription: Subscription;

  private onChange : (period: TodoListTaskDateDto) => void;
  private onTouched: () => void;
  private disabled : boolean;

  private formValue: undefined | FormGroup;

  public constructor(
    private readonly fb: FormBuilder,
  ) {
    this.subscription = new Subscription();

    this.onChange  = (period: TodoListTaskDateDto) => {};
    this.onTouched = () => {};
    this.disabled  = false;
  }

  public get form(): FormGroup {
    return this.formValue ?? (this.formValue = this.buildForm());
  }

  public ngOnInit(): void {
    this.form.valueChanges.subscribe();
  }

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

  private buildForm(): FormGroup {
    const controlConfig = {
      'day'    : this.fb.control('', Validators.required),
      'fullDay': false,
      'start'  : '',
      'end'    : '',
    };

    const options: AbstractControlOptions = {
      validators: [
        timePeriodValidator,
      ],
    };

    return this.fb.group(controlConfig, options);
  }
}
