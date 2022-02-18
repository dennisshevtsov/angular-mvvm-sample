import { Injectable, } from '@angular/core';

import { SearchTodoListsRecordResponseDto, } from 'src/app/todo-list-api';

@Injectable({
  providedIn: 'root',
})
export class SearchTodoListsViewModel {
  public datasource: SearchTodoListsRecordResponseDto[] | undefined;

  public search(): void {}

  public delete(selected: SearchTodoListsRecordResponseDto) {}
}