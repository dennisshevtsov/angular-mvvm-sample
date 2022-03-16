import { Component, OnDestroy,
         OnInit, ViewChild,        } from '@angular/core';
import { ActivatedRoute, ParamMap, } from '@angular/router';

import { mergeMap, Subscription, throwError, } from 'rxjs';

import { ModalComponent,
         PageComponent,
         TodoListLinks, TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,         } from 'src/app/core';
import { SearchTodoListTasksRecordResponseDto, } from 'src/app/todo-list-task/api';
import { SearchTodoListTasksViewModel,         } from './search-todo-list-tasks.view-model';

@Component({
  templateUrl: './search-todo-list-tasks.component.html',
  styleUrls: [
    './search-todo-list-tasks.component.scss',
  ],
})
export class SearchTodoListTasksComponent
  implements OnInit, OnDestroy {
  @ViewChild('page')
  private page!: PageComponent;

  @ViewChild('modal')
  private modal!: ModalComponent;

  private subscriptions: Subscription[];

  public constructor(
    public readonly vm: SearchTodoListTasksViewModel,

    private readonly route            : ActivatedRoute,
    private readonly todoListLinks    : TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {
    this.subscriptions = [];
  }

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
      error: () => this.page.showError('An error occured.'),
    };

    this.subscriptions.push(
      this.route.paramMap.pipe(mergeMap(project))
                         .subscribe(observer));
  }

  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    }
  }

  public updateTodoListTaskLink(
    todoListTaskId: number | string) : any[] {
      return this.todoListTaskLinks.updateTodoListTaskLink(this.vm.todoListId, todoListTaskId);
  }

  public onCompletedChanged(
    record: SearchTodoListTasksRecordResponseDto): void {
    const observer = {
      error: () => this.page.showError('An error occured.'),
    };

    this.subscriptions.push(this.vm.complete().subscribe(observer));
  }

  public onDeletePressed(
    record: SearchTodoListTasksRecordResponseDto): void {
    this.vm.selected = record;
    this.modal.show();
  }

  public onDeleteOkPressed(): void {
    const observer = {
      error: () => this.page.showError('An error occured.'),
    };

    this.subscriptions.push(this.vm.delete().subscribe(observer));
  }
}
