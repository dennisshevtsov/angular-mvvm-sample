import { Injectable, } from '@angular/core';

import { SearchTodoListsRecordResponseDto, } from '../../../todo-list-api';

@Injectable({
  providedIn: 'root',
})
export class SearchTodoListsViewModel {
  public datasource: SearchTodoListsRecordResponseDto[] | undefined;

  public search(): void {}
}