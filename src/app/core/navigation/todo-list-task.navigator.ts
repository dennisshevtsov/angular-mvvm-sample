import { Injectable, } from '@angular/core';
import { Router,     } from '@angular/router';

import { TodoListTaskLinks, } from './todo-list-task.links';

@Injectable({
  providedIn: 'root',
})
export class TodoListTaskNavigator {
  public constructor(
    private readonly router: Router,
    private readonly links : TodoListTaskLinks,
  ) {}

  public navigateToUpdateTodoListTask(
    todoListId    : number | string,
    todoListTaskId: number | string)
    : void {
    const command = this.links.updateTodoListTaskLink(
      todoListId, todoListTaskId);
    const extras = {
      fragment: 'added'
    };

    this.router.navigate(command, extras);
  }
}
