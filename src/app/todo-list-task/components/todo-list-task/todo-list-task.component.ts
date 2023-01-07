import { Component } from '@angular/core';
import { Input     } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit    } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup   } from '@angular/forms';
import { Validators  } from '@angular/forms';

import { Subscription } from 'rxjs';

import { FormComponentBase           } from 'src/app/core';
import { TodoListTaskPeriodViewModel } from '../todo-list-task-period/todo-list-task-period.view-model';

import { TodoListTaskProps     } from './todo-list-task.view-model';
import { TodoListTaskViewModel } from './todo-list-task.view-model';

type TodoListTaskFormScheme = {
  [K in keyof TodoListTaskProps]: FormControl<TodoListTaskProps[K] | null>;
}

@Component({
  selector: 'todo-list-task',
  templateUrl: './todo-list-task.component.html',
  styleUrls: ['./todo-list-task.component.scss'],
  providers: [
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class TodoListTaskComponent
  extends FormComponentBase<TodoListTaskFormScheme>
  implements OnInit, OnDestroy {
  private taskValue: undefined | TodoListTaskViewModel;

  public constructor(
    private readonly subscription: Subscription,
    private readonly fb : FormBuilder,
  ) {
    super();
  }

  @Input()
  public set task(value: TodoListTaskViewModel) {
    this.taskValue = value;
    this.form.setValue({
      title      : this.task.title,
      description: this.task.description,
      period     : this.task.period,
    });
  }

  public get task(): TodoListTaskViewModel {
    return this.taskValue ?? new TodoListTaskViewModel();
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe(value => {
        this.task.title       = value.title ?? '';
        this.task.description = value.description ?? '';
        this.task.period      = value.period ??new TodoListTaskPeriodViewModel();
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected buildForm(): FormGroup<TodoListTaskFormScheme> {
    return this.fb.group({
      title      : this.fb.control('', Validators.required),
      description: this.fb.control(''),
      period     : this.fb.control(new TodoListTaskPeriodViewModel()),
    });
  }
}
