import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit    } from '@angular/core';

import { AbstractControl        } from '@angular/forms';
import { AbstractControlOptions } from '@angular/forms';
import { ControlValueAccessor   } from '@angular/forms';
import { FormBuilder            } from '@angular/forms';
import { FormGroup              } from '@angular/forms';
import { NG_VALIDATORS          } from '@angular/forms';
import { NG_VALUE_ACCESSOR      } from '@angular/forms';
import { ValidationErrors       } from '@angular/forms';
import { Validator              } from '@angular/forms';
import { Validators             } from '@angular/forms';

import { Subscription } from 'rxjs';

import { FormComponentBase } from 'src/app/core';
import { FormScheme        } from 'src/app/core';

import { timePeriodValidator         } from 'src/app/todo-list-task/validators';
import { TodoListTaskPeriodViewModel } from './todo-list-task-period.view-model';

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
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class TodoListTaskPeriodComponent
  extends FormComponentBase<TodoListTaskPeriodViewModel>
  implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  public constructor(
    private readonly subscription: Subscription,
    private readonly fb : FormBuilder,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.fullDayControl.valueChanges.subscribe(
        value => this.changeValidation(value)));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public writeValue(period: TodoListTaskPeriodViewModel): void {
    if (period) {
      this.form.setValue({
        day    : period.day,
        fullDay: period.fullDay,
        start  : period.start,
        end    : period.end,
      });
    }
  }

  public registerOnChange(fn: (value: any) => void): void {
    const onChange = (value: any) => {
      const period = new TodoListTaskPeriodViewModel(
        value.day,
        value.fullDay,
        value.start,
        value.end);

      fn(period);
    };

    this.subscription.add(
      this.form.valueChanges.subscribe(onChange));
  }

  public registerOnTouched(fn: any): void {
    if (fn) {
      const subscription = this.form.valueChanges.subscribe(value => {
        if (this.form.touched) {
          fn();

          subscription.unsubscribe();
        }
      });

      this.subscription.add(subscription);
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
            const control = this.form.controls[controlName as keyof FormScheme<TodoListTaskPeriodViewModel>];

            if (control.errors) {
              errors[controlName] = control.errors;
            }
          });

    return errors;
  }

  protected buildForm(): FormGroup<FormScheme<TodoListTaskPeriodViewModel>> {
    const controlConfig = {
      day    : this.fb.control(0),
      fullDay: this.fb.control(false),
      start  : this.fb.control(0),
      end    : this.fb.control(0),
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
