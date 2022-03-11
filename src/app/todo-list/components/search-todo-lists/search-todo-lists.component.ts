import { Component, OnDestroy,
         OnInit, ViewChild,    } from '@angular/core';

import { Subscription, } from 'rxjs';

import { ModalComponent, TodoListLinks,
         TodoListTaskLinks,                } from 'src/app/core';
import { SearchTodoListsRecordResponseDto, } from 'src/app/todo-list/api';
import { SearchTodoListsViewModel,         } from './search-todo-lists.view-model';

@Component({
  templateUrl: './search-todo-lists.component.html',
  styleUrls: [
    './search-todo-lists.component.scss',
  ],
})
export class SearchTodoListsComponent implements OnInit, OnDestroy {
  @ViewChild('modal')
  public modelRef!: ModalComponent;

  private subscription: Subscription | undefined;

  public constructor(
    public vm: SearchTodoListsViewModel,

    private readonly todoListLinks: TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {}

  public get addTodoListLink(): any[] {
    return this.todoListLinks.addTodoListLink();
  }

  public ngOnInit(): void {
    this.subscription = this.vm.search().subscribe();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription?.unsubscribe();
    }
  }

  public updateTodoListLink(
    record: SearchTodoListsRecordResponseDto)
    : any[] {
    return this.todoListLinks.updateTodoListLink(record.todoListId);
  }

  public searchTodoListTasksLink(
    record: SearchTodoListsRecordResponseDto)
    : any[] {
    return this.todoListTaskLinks.searchTodoListTasksLink(record.todoListId);
  }

  public onDeletePressed(
    record: SearchTodoListsRecordResponseDto)
    : void {
    this.vm.selected = record;
    this.modelRef.show();
  }

  public onDeleteOkPressed(): void {
    this.vm.delete();
  }
}
