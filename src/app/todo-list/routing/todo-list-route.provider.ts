import { Injectable, } from '@angular/core';

import { TodoListLinkProvider,         } from './todo-list-link.provider';
import { TODO_LIST_ROUTE_ID_PARAMETER, } from './todo-list-routing.fragments';

@Injectable({
  providedIn: 'root',
})
export class TodoListRouteProvider {
  public constructor(
    private readonly links: TodoListLinkProvider,
  ) {}

  public addTodoListRoute(): string {
    return this.convertToRoute(this.links.addTodoListLink());
  }

  public updateTodoListRoute(): string {
    return this.convertToRoute(this.links.updateTodoListLink(`:${TODO_LIST_ROUTE_ID_PARAMETER}`));
  }

  public searchTodoListsRoute(): string {
    return this.convertToRoute(this.links.searchTodoListsLink());
  }

  private convertToRoute(link: Array<any>): string {
    return link.slice(1).join('/');
  }
}
