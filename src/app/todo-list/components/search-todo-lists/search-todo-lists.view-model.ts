import { Injectable, } from '@angular/core';

import { DeleteTodoListRequestDto,
         SearchTodoListsRecordResponseDto,
         SearchTodoListsRequestDto,
         TodoListService,                  } from 'src/app/todo-list-api';

@Injectable({
  providedIn: 'root',
})
export class SearchTodoListsViewModel {
  private todoListsValue: SearchTodoListsRecordResponseDto[] | undefined;

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get todoLists(): SearchTodoListsRecordResponseDto[] {
    return this.todoListsValue ?? [];
  }

  public search(): void {
    this.todoListsValue = this.service.searchTodoList(new SearchTodoListsRequestDto());
  }

  public delete(record: SearchTodoListsRecordResponseDto) {
    this.service.deleteTodoList(new DeleteTodoListRequestDto(record.todoListId));
  }
}