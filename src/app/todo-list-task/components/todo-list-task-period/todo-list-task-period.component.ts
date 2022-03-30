import { Component,                } from '@angular/core';
import { AbstractControlOptions,
         ControlValueAccessor,
         FormBuilder, FormGroup,
         NG_VALUE_ACCESSOR,
         Validators,               } from '@angular/forms';

import { Subscription, } from 'rxjs';

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
export class TodoListTaskPeriodComponent implements ControlValueAccessor {
  private readonly subscription: Subscription;

  private onTouched: () => void;

  private formValue: undefined | FormGroup;

  public constructor(
    private readonly fb: FormBuilder,
  ) {
    this.subscription = new Subscription();

    this.onTouched = () => {};
  }

  public get form(): FormGroup {
    return this.formValue ?? (this.formValue = this.buildForm());
  }

  public writeValue(obj: any): void {
    if (obj) {
      this.form.setValue(obj);
    }
  }

  public registerOnChange(fn: any): void {
    if (fn) {
      this.subscription.add(this.form.valueChanges.subscribe(fn));
    }
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
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
