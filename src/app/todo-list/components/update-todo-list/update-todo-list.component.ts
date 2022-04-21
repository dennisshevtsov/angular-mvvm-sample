import { AfterViewInit, Component,
         OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute, ParamMap,     } from '@angular/router';

import { mergeMap, Subscription, throwError, } from 'rxjs';

import { PageComponent,
         TodoListLinks,
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
  @ViewChild('page')
  private page!: PageComponent;

  @ViewChild('todoList')
  private todoList!: TodoListComponent;

  private readonly subscription: Subscription;

  public constructor(
    public readonly vm: UpdateTodoListViewModel,

    private readonly route: ActivatedRoute,
    private readonly links: TodoListLinks,
  ) {
    this.subscription = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListsLink();
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
      error: () => this.page.showError('An error occured.'),
    };

    this.subscription.add(
      this.route.paramMap.pipe(mergeMap(project))
                         .subscribe(observer));
  }

  public ngAfterViewInit(): void {
    this.subscription.add(
      this.route.fragment.subscribe(
        fragment => {
          if (fragment === 'added') {
            Promise.resolve(null)
                   .then(() => this.page.showMessage(`The TODO list is added.`));
          }
        }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onOkPressed(): void {
    this.todoList.validateForm();

    if (this.todoList.form.valid) {
      const observer = {
        complete: () => this.page.showMessage('The TODO list was updated.'),
        error: () => this.page.showError('An error occured.'),
      };

      this.subscription.add(this.vm.update().subscribe(observer));
    }
  }
}
