import { AfterViewInit, Component,
         OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute, ParamMap,     } from '@angular/router';

import { mergeMap, Subscription, takeWhile, throwError, } from 'rxjs';

import { ToastsComponent,
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
  ],
})
export class UpdateTodoListComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('todoList')
  private todoList!: TodoListComponent;

  @ViewChild('toasts')
  private toasts!: ToastsComponent;

  private readonly subscription: Subscription;

  public constructor(
    public readonly vm: UpdateTodoListViewModel,

    private readonly route            : ActivatedRoute,
    private readonly todoListLinks    : TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {
    this.subscription = new Subscription();
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

      return throwError(() => new Error(''));
    };

    const observer = {
      complete: () => {
        this.subscription.add(this.vm.initialize().subscribe());
      },
      error: () => this.toasts.push('Error', 'An error occured.'),
    };

    this.subscription.add(
      this.route.paramMap.pipe(mergeMap(project))
                         .subscribe(observer));
  }

  public ngAfterViewInit(): void {
    this.subscription.add(
      this.route.fragment.pipe(takeWhile(fragment => fragment === 'added'))
                         .subscribe(() => this.toasts.push('Info', 'The TODO list is added.')));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onOkPressed(): void {
    this.todoList.validateForm();

    if (this.todoList.form.valid) {
      const observer = {
        complete: () => this.toasts.push('Info', 'The TODO list was updated.'),
        error   : () => this.toasts.push('Error', 'An error occured.'),
      };

      this.subscription.add(this.vm.update().subscribe(observer));
    }
  }
}
