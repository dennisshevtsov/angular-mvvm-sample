import { AfterViewInit, Component,
         OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute, ParamMap,     } from '@angular/router';

import { mergeMap, Subscription, throwError, } from 'rxjs';

import { ModalComponent, ToastsComponent,
         TodoListLinks, TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,         } from 'src/app/core';
import { SearchTodoListTasksRecordResponseDto, } from 'src/app/todo-list-task/api';
import { SearchTodoListTasksViewModel,         } from './search-todo-list-tasks.view-model';

@Component({
  templateUrl: './search-todo-list-tasks.component.html',
  styleUrls: [
    './search-todo-list-tasks.component.scss',
  ],
  providers: [
    SearchTodoListTasksViewModel,
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class SearchTodoListTasksComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal')
  private modal!: ModalComponent;

  @ViewChild('toasts')
  private toasts!: ToastsComponent;

  private error: undefined | string;

  public constructor(
    public readonly vm: SearchTodoListTasksViewModel,

    private readonly subscription: Subscription,

    private readonly route            : ActivatedRoute,
    private readonly todoListLinks    : TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) { }

  public get backLink(): any[] {
    return this.todoListLinks.searchTodoListsLink();
  }

  public get addTodoListTaskLink(): any[] {
    return this.todoListTaskLinks.addTodoListTaskLink(this.vm.todoListId);
  }

  public ngOnInit(): void {
    const project = (params: ParamMap) => {
      const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

      if (todoListId) {
        this.vm.todoListId = todoListId;
        return this.vm.search();
      }

      return throwError(() => new Error('There is no TODO list ID parameter in the URL.'));
    };
    const observer = {
      error: () => this.error = 'An error occured.',
    };

    this.subscription.add(
      this.route.paramMap.pipe(mergeMap(project))
                         .subscribe(observer));
  }

  public ngAfterViewInit(): void {
    if (this.error) {
      this.toasts.error(this.error);
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public updateTodoListTaskLink(
    todoListTaskId: number | string) : any[] {
      return this.todoListTaskLinks.updateTodoListTaskLink(this.vm.todoListId, todoListTaskId);
  }

  public onCompletedChanged(
    record: SearchTodoListTasksRecordResponseDto): void {
    this.vm.selected = record;

    let message: string;

    if (this.vm.selected.completed) {
      message = `TODO list task '${this.vm.selected.title}' was uncompleted.`;
    }
    else {
      message = `TODO list task '${this.vm.selected.title}' was completed.`;
    }

    const observer = {
      complete: () => this.toasts.info(message),
      error   : () => this.toasts.error('An error occured.'),
    };

    if (this.vm.selected.completed) {
      this.subscription.add(this.vm.uncomplete().subscribe(observer));
    }
    else {
      this.subscription.add(this.vm.complete().subscribe(observer));
    }
  }

  public onDeletePressed(
    record: SearchTodoListTasksRecordResponseDto): void {
    this.vm.selected = record;
    this.modal.show();
  }

  public onDeleteOkPressed(): void {
    const message = `TODO list task '${this.vm.selected.title}' was deleted.`;
    const observer = {
      complete: () => this.toasts.info(message),
      error   : () => this.toasts.error('An error occured.'),
    };

    this.subscription.add(this.vm.delete().subscribe(observer));
  }
}
