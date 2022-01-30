import { Injectable, } from '@angular/core';

import { TODO_LIST_ROUTE_NEW_SEGMENT,
         TODO_LIST_ROUTE_ROOT_SEGMENT, } from './todo-list-routing.values';

@Injectable({
  providedIn: 'root',
})
export class TodoListRoutingLinks {
  public addTodoListLink(): Array<any> {
    return [
      '/',
      TODO_LIST_ROUTE_ROOT_SEGMENT,
      TODO_LIST_ROUTE_NEW_SEGMENT,
    ];
  }

  public updateTodoListLink(todoListId: number | string): Array<any> {
    return [
      '/',
      TODO_LIST_ROUTE_ROOT_SEGMENT,
      todoListId,
    ];
  }

  public searchTodoListsLink(): Array<any> {
    return [
      '/',
      TODO_LIST_ROUTE_ROOT_SEGMENT,
    ];
  }
}
