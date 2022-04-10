import { Component, OnDestroy,   } from '@angular/core';
import { ControlValueAccessor,
         FormBuilder, FormGroup,
         Validators,             } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { AppClock, FormComponentBase,
         MILLISECONDS_IN_HOUR,        } from 'src/app/core';
import { TodoListTaskDateDto,         } from 'src/app/todo-list-task/api';

@Component({
  selector: 'todo-list-task',
  templateUrl: './todo-list-task.component.html',
  styleUrls: [
    './todo-list-task.component.scss',
  ],
})
export class TodoListTaskComponent
  extends FormComponentBase
  implements OnDestroy, ControlValueAccessor {
  private readonly subscription: Subscription;

  public constructor(
    private readonly fb   : FormBuilder,
    private readonly clock: AppClock,
  ) {
    super();

    this.subscription = new Subscription();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public writeValue(task: any): void {
    if (task) {
      this.form.setValue({
        'title'      : task.title,
        'description': task.description,
        'date'       : task.date,
      });
    }
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.subscription.add(this.form.valueChanges.subscribe(fn));
  }

  public registerOnTouched(fn: any): void {
    if (fn) {
      const subscription = this.form.valueChanges.subscribe(value => {
        if (this.form.touched) {
          fn();

          Object.keys(this.form.controls)
                .forEach(controlName => {
                  const control = this.form.controls[controlName];

                  control.markAsTouched({
                    onlySelf: true,
                  });
                  control.updateValueAndValidity();
                });

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

  protected buildForm(): FormGroup {
    const now = this.clock.now();

    return this.fb.group({
      'title'      : this.fb.control('', Validators.required),
      'description': '',
      'date'       : this.buildDefaultTimePeriod(now),
    });
  }

  private buildDefaultTimePeriod(now: number): TodoListTaskDateDto {
    const start = now;
    const end = start + MILLISECONDS_IN_HOUR;

    return new TodoListTaskDateDto(now, false, start, end);
  }
}
