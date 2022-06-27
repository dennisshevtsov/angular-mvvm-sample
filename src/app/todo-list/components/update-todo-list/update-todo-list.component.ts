import { AfterViewInit, Component,
         OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute, ParamMap,     } from '@angular/router';

import { mergeMap, Subscription,
         takeWhile, throwError,        } from 'rxjs';

import { RouteCleaner, ToastsComponent,
         TodoListLinks,
         TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { TodoListComponent,            } from '../todo-list/todo-list.component';
import { UpdateTodoListViewModel,      } from './update-todo-list.view-model';

@Component({
  templateUrl: './update-todo-list.component.html',
  styleUrls: [
    './update-todo-list.component.scss',
  ],
  providers: [
    UpdateTodoListViewModel,
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class UpdateTodoListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('todoList')
  private todoList!: TodoListComponent;

  @ViewChild('toasts')
  private toasts!: ToastsComponent;

  private added: boolean;

  public constructor(
    public readonly vm: UpdateTodoListViewModel,

    private readonly subscription: Subscription,

    private readonly route            : ActivatedRoute,
    private readonly routeCleaner     : RouteCleaner,
    private readonly todoListLinks    : TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {
    this.added = false;
  }

  public get backLink(): any[] {
    return this.todoListLinks.searchTodoListsLink();
  }

  public get addTodoListTaskLink(): any[] {
    return this.todoListTaskLinks.addTodoListTaskLink(
      this.vm.todoList.todoListId);
  }

  public ngOnInit(): void {
    const project = (params: ParamMap) => {
      const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

      if (todoListId) {
        this.vm.todoList.todoListId = todoListId;

        return this.vm.initialize();
      }

      return throwError(() => new Error());
    };

    const observer = {
      error: () => this.toasts.error('An error occured.'),
    };

    this.subscription.add(
      this.route.paramMap.pipe(mergeMap(project))
                         .subscribe(observer));

    this.subscription.add(
      this.route.fragment.pipe(takeWhile(fragment => fragment === 'added'))
                         .subscribe(() => {
                           this.routeCleaner.clean();
                           this.added = true;
                         }));
  }

  public ngAfterViewInit(): void {
    if (this.added) {
      this.toasts.info('The TODO list is added.');
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onOkPressed(): void {
    this.todoList.validateForm();

    if (this.todoList.form.valid) {
      const observer = {
        complete: () => this.toasts.info('The TODO list was updated.'),
        error   : () => this.toasts.error('An error occured.'),
      };

      this.subscription.add(this.vm.update().subscribe(observer));
    }
  }
}
