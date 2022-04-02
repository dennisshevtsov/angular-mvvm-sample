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
import { FormComponentBase } from 'src/app/core';

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
    }
  ],
})
export class TodoListTaskPeriodComponent
  extends FormComponentBase
  implements OnDestroy, ControlValueAccessor, Validator {
  private readonly subscription: Subscription;

  public constructor(
    private readonly fb: FormBuilder,
  ) {
    super();

    this.subscription = new Subscription();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
