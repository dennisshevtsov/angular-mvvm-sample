import { Injectable, } from '@angular/core';

import { TODO_LIST_ROUTE_ROOT_FRAGMENT,      } from './todo-list-routing-fragments';
import { TODO_LIST_TASK_ROUTE_NEW_FRAGMENT,
         TODO_LIST_TASK_ROUTE_ROOT_FRAGMENT, } from './todo-list-task-routing-fragments';

@Injectable({
  providedIn: 'root',
})
export class TodoListTaskLinks {
  public addTodoListTaskLink(todoListId: string | number) : Array<any> {
    return [
      '/',
      TODO_LIST_ROUTE_ROOT_FRAGMENT,
      todoListId,
      TODO_LIST_TASK_ROUTE_ROOT_FRAGMENT,
      TODO_LIST_TASK_ROUTE_NEW_FRAGMENT,
    ];
  }

  public updateTodoListTaskLink(
    todoListId: string | number,
    todoListTaskId: string | number): Array<any> {
      return [
        '/',
        TODO_LIST_ROUTE_ROOT_FRAGMENT,
        todoListId,
        TODO_LIST_TASK_ROUTE_ROOT_FRAGMENT,
        todoListTaskId,
      ];
  }

  public searchTodoListTasksLink(todoListId: string | number): Array<any> {
    return [
      '/',
      TODO_LIST_ROUTE_ROOT_FRAGMENT,
      todoListId,
      TODO_LIST_TASK_ROUTE_ROOT_FRAGMENT,
    ];
  }
}
