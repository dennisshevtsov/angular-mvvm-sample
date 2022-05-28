import { Component, OnDestroy,
         OnInit, ViewChild,        } from '@angular/core';
import { ActivatedRoute, ParamMap, } from '@angular/router';

import { Subscription, } from 'rxjs';

import { AppClock, MILLISECONDS_IN_HOUR,
         MILLISECONDS_IN_MENUTE,
         ToastsComponent,
         TodoListTaskLinks,
         TodoListTaskNavigator,
         TODO_LIST_ROUTE_ID_PARAMETER,   } from 'src/app/core';
import { TodoListTaskComponent,          } from 'src/app/todo-list-task/components/todo-list-task';
import { TodoListTaskDateDto,            } from '../../api';
import { AddTodoListTaskViewModel,       } from './add-todo-list-task.view-model';

@Component({
  templateUrl: './add-todo-list-task.component.html',
  styleUrls: [
    './add-todo-list-task.component.scss',
  ],
  providers: [
    AddTodoListTaskViewModel,
  ],
})
export class AddTodoListTaskComponent implements OnInit, OnDestroy {
  @ViewChild('task')
  private task!: TodoListTaskComponent;

  @ViewChild('toasts')
  private toasts!: ToastsComponent;

  private subsription: Subscription;

  public constructor(
    public readonly vm: AddTodoListTaskViewModel,

    private readonly route    : ActivatedRoute,
    private readonly clock    : AppClock,
    private readonly links    : TodoListTaskLinks,
    private readonly navigator: TodoListTaskNavigator,
  ) {
    this.subsription = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public ngOnInit(): void {
    const observer = {
      next: (params: ParamMap) => {
        const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

        if (todoListId) {
          this.vm.todoListId = todoListId;
          this.vm.task.date = this.buildDefaultTimePeriod();
        }
      },
      error: () => this.toasts.error('An error occured.'),
    };

    this.subsription.add(
      this.route.paramMap.subscribe(observer));
  }

  public ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  public onOkPressed(): void {
    this.task.validateForm();

    if (this.task.form.valid) {
      const observer = {
        complete: () => this.navigator.navigateToUpdateTodoListTask(
          this.vm.todoListId, this.vm.todoListTaskId),
        error   : () => this.toasts.error('An error occured.'),
      };

      this.subsription.add(this.vm.add().subscribe(observer));
    }
  }

  private buildDefaultTimePeriod(): TodoListTaskDateDto {
    const now = this.clock.now();
    const step = 15 * MILLISECONDS_IN_MENUTE;
    const start = now - (now % step) + step;
    const end = start + MILLISECONDS_IN_HOUR;

    return new TodoListTaskDateDto(now, false, start, end);
  }
}
