import { Injectable, } from '@angular/core';

import { DeleteTodoListRequestDto,
         SearchTodoListsRecordResponseDto,
         SearchTodoListsRequestDto,
         TodoListService,                  } from 'src/app/todo-list/api';

@Injectable({
  providedIn: 'root',
})
export class SearchTodoListsViewModel {
  private selectedValue: SearchTodoListsRecordResponseDto | undefined;
  private todoListsValue: SearchTodoListsRecordResponseDto[] | undefined;

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get hasSelection(): boolean {
    return this.selected.todoListId != 0;
  }

  public get selected(): SearchTodoListsRecordResponseDto {
    return this.selectedValue ?? (this.selectedValue = new SearchTodoListsRecordResponseDto(0, '', ''));
  }

  public set selected(record: SearchTodoListsRecordResponseDto) {
    this.selectedValue = record;
  }

  public get todoLists(): SearchTodoListsRecordResponseDto[] {
    return this.todoListsValue ?? [];
  }

  public search(): void {
    this.todoListsValue = this.service.searchTodoList(new SearchTodoListsRequestDto());
  }

  public delete() {
    if (this.hasSelection) {
      const request = new DeleteTodoListRequestDto(this.selected.todoListId);

      this.service.deleteTodoList(request);
    }
  }
}
