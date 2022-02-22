import { Component, OnInit, ViewChild, } from '@angular/core';

import { ModalComponent,                   } from 'src/app/core';
import { SearchTodoListsRecordResponseDto, } from 'src/app/todo-list-api';
import { TodoListTaskLinkProvider,         } from 'src/app/todo-list-task/routing';
import { TodoListLinkProvider,             } from 'src/app/todo-list/routing';
import { SearchTodoListsViewModel,         } from './search-todo-lists.view-model';

@Component({
  templateUrl: './search-todo-lists.component.html',
  styleUrls: [
    './search-todo-lists.component.scss',
  ],
})
export class SearchTodoListsComponent implements OnInit {
  @ViewChild('modal')
  public modelRef!: ModalComponent;

  public constructor(
    public vm: SearchTodoListsViewModel,

    private readonly todoListLinks: TodoListLinkProvider,
    private readonly todoListTaskLinks: TodoListTaskLinkProvider,
  ) {}

  public ngOnInit(): void {
      this.vm.search();
  }

  public get addTodoListLink(): any[] {
    return this.todoListLinks.addTodoListLink();
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

  public onDeletePressed(record: SearchTodoListsRecordResponseDto): void {
    this.vm.selected = record;
    this.modelRef.show();
  }

  public onDeleteOkPressed(): void {
    this.vm.delete();
  }
}
