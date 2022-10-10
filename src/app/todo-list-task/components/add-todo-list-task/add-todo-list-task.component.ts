import { AfterViewInit, Component,
         OnDestroy, OnInit,
         ViewChild,                } from '@angular/core';
import { ActivatedRoute, ParamMap, } from '@angular/router';

import { Subscription, } from 'rxjs';

import { AppClock,
         ToastsComponent,
         TodoListTaskLinks,
         TodoListTaskNavigator,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { TodoListTaskComponent,        } from 'src/app/todo-list-task/components/todo-list-task';
import { AddTodoListDayTaskRequestDto, } from '../../api';
import { AddTodoListTaskViewModel,     } from './add-todo-list-task.view-model';

@Component({
  templateUrl: './add-todo-list-task.component.html',
  styleUrls: [
    './add-todo-list-task.component.scss',
  ],
  providers: [
    AddTodoListTaskViewModel,
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    }
  ],
})
export class AddTodoListTaskComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('task')
  private task!: TodoListTaskComponent;

  @ViewChild('toasts')
  private toasts!: ToastsComponent;

  private error: undefined | string;

  public constructor(
    public readonly vm: AddTodoListTaskViewModel,

    private readonly subsription: Subscription,

    private readonly clock    : AppClock,
    private readonly route    : ActivatedRoute,
    private readonly links    : TodoListTaskLinks,
    private readonly navigator: TodoListTaskNavigator,
  ) { }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public ngOnInit(): void {
    const observer = {
      next: (params: ParamMap) => {
        const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

        if (todoListId) {
          this.initialize(this.vm.task as AddTodoListDayTaskRequestDto, todoListId);
        }
        else {
          this.error = 'An error occured.';
        }
      },
    };

    this.subsription.add(
      this.route.paramMap.subscribe(observer));
  }

  public ngAfterViewInit(): void {
    if (this.error) {
      this.toasts.error(this.error)
    }
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

  private initialize(task: AddTodoListDayTaskRequestDto, todoListId: string): void {
    task.todoListId = todoListId;
    task.date = this.clock.now();
  }
}
