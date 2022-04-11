import { Component,              } from '@angular/core';
import { FormBuilder, FormGroup,
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
export class TodoListTaskComponent extends FormComponentBase {
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
