import { Injectable, } from '@angular/core';

import { TODO_LIST_ROUTE_NEW_FRAGMENT,
         TODO_LIST_ROUTE_ROOT_FRAGMENT, } from './todo-list-routing-fragments';

@Injectable({
  providedIn: 'root',
})
export class TodoListLinks {
  public addTodoListLink(): Array<any> {
    return [
      '/',
      TODO_LIST_ROUTE_ROOT_FRAGMENT,
      TODO_LIST_ROUTE_NEW_FRAGMENT,
    ];
  }

  public updateTodoListLink(todoListId: number | string): Array<any> {
    return [
      '/',
      TODO_LIST_ROUTE_ROOT_FRAGMENT,
      todoListId,
    ];
  }

  public searchTodoListsLink(): Array<any> {
    return [
      '/',
      TODO_LIST_ROUTE_ROOT_FRAGMENT,
    ];
  }
}
