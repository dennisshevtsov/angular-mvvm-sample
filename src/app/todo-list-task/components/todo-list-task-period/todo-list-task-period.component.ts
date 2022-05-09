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
import { timePeriodValidator,         } from 'src/app/todo-list-task/validators';

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
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TodoListTaskPeriodComponent,
    }
  ],
})
export class TodoListTaskPeriodComponent
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
      this.form.setValue({
        'day': this.formatter.toLocalDate(period.day),
        'fullDay': period.fullDay,
        'start': this.formatter.toLocalTime(period.start),
        'end': this.formatter.toLocalTime(period.end),
      });
    }
  }

  public registerOnChange(fn: (value: any) => void): void {
    const onChange = (value: any) => {
      const period = new TodoListTaskDateDto(
        this.formatter.fromLocalDate(value.day),
        value.fullDay,
        this.formatter.fromLocalTime(value.start),
        this.formatter.fromLocalTime(value.end));

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
          })

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
        timePeriodValidator,
      ],
    };

    return this.fb.group(controlConfig, options);
  }
}
