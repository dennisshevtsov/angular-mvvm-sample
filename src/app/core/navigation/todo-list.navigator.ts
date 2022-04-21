import { Injectable, } from '@angular/core';
import { Router,     } from '@angular/router';

import { TodoListLinks, } from './todo-list.links';

@Injectable({
  providedIn: 'root',
})
export class TodoListNavigator {
  public constructor(
    private readonly router: Router,
    private readonly links: TodoListLinks,
  ) {}

  public navigateToUpdateTodoList(
    todoListId: number | string)
    : void {
    const command = this.links.updateTodoListLink(todoListId);
    const extras = {
      fragment: 'added'
    };

    this.router.navigate(command, extras);
  }
}
