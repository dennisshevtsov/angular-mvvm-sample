import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  } from '@angular/forms';

import { Subscription, } from 'rxjs';

import { FormComponentBase,           } from 'src/app/core';
import { TodoListTaskPeriodViewModel, } from '../todo-list-task-period/todo-list-task-period.view-model';
import { TodoListTaskViewModel,       } from './todo-list-task.view-model';

@Component({
  selector: 'todo-list-task',
  templateUrl: './todo-list-task.component.html',
  styleUrls: [
    './todo-list-task.component.scss',
  ],
  providers: [
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class TodoListTaskComponent
  extends FormComponentBase
  implements OnInit, OnDestroy {
  @Input()
  public task!: TodoListTaskViewModel;

  public constructor(
    private readonly subscription: Subscription,
    private readonly fb : FormBuilder,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form.setValue({
      'title'      : this.task.title,
      'description': this.task.description,
      'period'     : this.task.period,
    });

    this.subscription.add(
      this.form.valueChanges.subscribe(value => {
        this.task.title       = value.title;
        this.task.description = value.description;
        this.task.period      = value.period;
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title'      : this.fb.control('', Validators.required),
      'description': '',
      'period'     : new TodoListTaskPeriodViewModel(),
    });
  }
}
