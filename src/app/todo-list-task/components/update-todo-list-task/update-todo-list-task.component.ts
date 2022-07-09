import { AfterViewInit, Component,
         OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute,               } from '@angular/router';

import { Subscription, } from 'rxjs';

import { RouteCleaner, ToastsComponent,
         TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,
         TODO_LIST_TASK_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { TodoListTaskComponent,             } from 'src/app/todo-list-task/components/todo-list-task';
import { UpdateTodoListTaskViewModel,       } from './update-todo-list-task.view-model';

@Component({
  templateUrl: './update-todo-list-task.component.html',
  styleUrls: [
    './update-todo-list-task.component.scss',
  ],
  providers: [
    UpdateTodoListTaskViewModel,
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class UpdateTodoListTaskComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('task')
  private task!: TodoListTaskComponent;

  @ViewChild('toasts')
  private toasts!: ToastsComponent;

  private added: undefined | boolean;

  public constructor(
    public readonly vm: UpdateTodoListTaskViewModel,

    private readonly subscription: Subscription,

    private readonly route       : ActivatedRoute,
    private readonly routeCleaner: RouteCleaner,
    private readonly links       : TodoListTaskLinks,
  ) {}

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.task.todoListId);
  }

  public get addTodoListTaskLink(): any[] {
    return this.links.addTodoListTaskLink(
      this.vm.task.todoListId);
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.route.fragment.subscribe((fragment) => {
        if (fragment === 'added') {
          this.routeCleaner.clean();
          this.added = true;
        }
      }));
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);
        const todoListTaskId = params.get(TODO_LIST_TASK_ROUTE_ID_PARAMETER);

        if (todoListId && todoListTaskId) {
          this.vm.task.todoListId = todoListId;
          this.vm.task.todoListTaskId = todoListTaskId;

          const observer = {
            error: () => this.toasts.error('An error occured.'),
          };

          this.subscription.add(
            this.vm.initialize().subscribe(observer));
        }
      })
    );
  }

  public ngAfterViewInit(): void {
    if (this.added) {
      this.toasts.info('The TODO list task is added.');
    }
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public onOkPressed(): void {
    this.task.validateForm();

    if (this.task.form.valid) {
      const observer = {
        complete: () => this.toasts.info('The TODO list task was updated.'),
        error   : () => this.toasts.error('An error occured.'),
      };

      this.subscription.add(this.vm.update().subscribe(observer));
    }
  }
}
