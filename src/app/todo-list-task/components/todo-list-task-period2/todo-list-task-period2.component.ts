import { Component, OnDestroy,   } from '@angular/core';
import { AbstractControl,
         AbstractControlOptions,
         ControlValueAccessor,
         FormBuilder, FormGroup,
         NG_VALIDATORS,
         NG_VALUE_ACCESSOR,
         ValidationErrors,
         Validator, Validators,  } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { Formatter, FormComponentBase } from 'src/app/core';
import { TodoListTaskDateDto,         } from 'src/app/todo-list-task/api';
import { timePeriodValidator2,        } from 'src/app/todo-list-task/validators';

@Component({
  selector: 'todo-list-task-period2',
  templateUrl: './todo-list-task-period2.component.html',
  styleUrls: [
    './todo-list-task-period2.component.scss',
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TodoListTaskPeriod2Component,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TodoListTaskPeriod2Component,
    }
  ],
})
export class TodoListTaskPeriod2Component
  extends FormComponentBase
  implements OnDestroy, ControlValueAccessor, Validator {
  private readonly subscription: Subscription;

  public constructor(
    private readonly fb       : FormBuilder,
    private readonly formatter: Formatter,
  ) {
    super();

    this.subscription = new Subscription();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public writeValue(period: TodoListTaskDateDto): void {
    if (period) {
      console.log(period);
      this.form.setValue({
        'day'    : this.formatter.toLocalDate(period.day),
        'fullDay': period.fullDay,
        'start'  : period.start,
        'end'    : period.end,
      });
    }
  }

  public registerOnChange(fn: (value: any) => void): void {
    const onChange = (value: any) => {
      const period = new TodoListTaskDateDto(
        this.formatter.fromLocalDate(value.day),
        value.fullDay,
        value.start,
        value.end);

      fn(period);
    };
    const subscription = this.form.valueChanges.subscribe(onChange);

    this.subscription.add(subscription);
  }

  public registerOnTouched(fn: any): void {
    if (fn) {
      const subscription = this.form.valueChanges.subscribe(value => {
        if (this.form.touched) {
          fn();

          subscription.unsubscribe();
        }
      });
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    }
    else {
      this.form.enable();
    }
  }

  public validate(control: AbstractControl)
  : ValidationErrors | null {
    const errors: ValidationErrors = {};

    Object.keys(this.form.controls)
          .forEach(controlName => {
            const control = this.form.controls[controlName];

            if (control.errors) {
              errors[controlName] = control.errors;
            }
          });

    return errors;
  }

  protected buildForm(): FormGroup {
    const controlConfig = {
      'day'    : this.fb.control('', Validators.required),
      'fullDay': false,
      'start'  : '',
      'end'    : '',
    };

    const options: AbstractControlOptions = {
      validators: [
        timePeriodValidator2,
      ],
    };

    return this.fb.group(controlConfig, options);
  }
}
