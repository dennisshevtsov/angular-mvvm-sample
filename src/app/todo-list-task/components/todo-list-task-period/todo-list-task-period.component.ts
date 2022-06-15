import { Component, OnDestroy,
         OnInit,                 } from '@angular/core';
import { AbstractControl,
         AbstractControlOptions,
         ControlValueAccessor,
         FormBuilder, FormGroup,
         NG_VALIDATORS,
         NG_VALUE_ACCESSOR,
         ValidationErrors,
         Validator, Validators,  } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { FormComponentBase,   } from 'src/app/core';
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
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: TodoListTaskPeriodComponent,
    },
  ],
})
export class TodoListTaskPeriodComponent
  extends FormComponentBase
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  private readonly subscription: Subscription;

  public constructor(
    private readonly fb : FormBuilder,
  ) {
    super();

    this.subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.fullDayControl.valueChanges.subscribe(
        value => this.changeValidation(value)));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public writeValue(period: TodoListTaskDateDto): void {
    if (period) {
      this.form.setValue({
        'day'    : period.day,
        'fullDay': period.fullDay,
        'start'  : period.start,
        'end'    : period.end,
      });
    }
  }

  public registerOnChange(fn: (value: any) => void): void {
    const onChange = (value: any) => {
      const period = new TodoListTaskDateDto(
        value.day,
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
      'day'    : '',
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

  private dayControlValue: undefined | AbstractControl;
  private get dayControl(): AbstractControl {
    return this.dayControlValue ?? (this.dayControlValue = this.form.get('day')!);
  }

  private startControlValue: undefined | AbstractControl;
  private get startControl(): AbstractControl {
    return this.startControlValue ?? (this.startControlValue = this.form.get('start')!);
  }

  private endControlValue: undefined | AbstractControl;
  private get endControl(): AbstractControl {
    return this.endControlValue ?? (this.endControlValue = this.form.get('end')!);
  }

  private fullDayControlValue: undefined | AbstractControl;
  private get fullDayControl(): AbstractControl {
    return this.fullDayControlValue ?? (this.fullDayControlValue = this.form.get('fullDay')!);
  }

  private changeValidation(fullDay: boolean): void {
    if (fullDay) {
      this.form.clearValidators();

      this.dayControl.setValidators(Validators.required);
    }
    else {
      this.dayControl.clearValidators();

      this.form.setValidators(timePeriodValidator);
    }

    this.dayControl.updateValueAndValidity();
    this.startControl.updateValueAndValidity();
    this.endControl.updateValueAndValidity();
  }
}
