import { Injectable, } from '@angular/core';

import { TodoListRoutingLinks,         } from './todo-list-routing.links';
import { TODO_LIST_ROUTE_ID_PARAMETER, } from './todo-list-routing.fragments';

@Injectable({
  providedIn: 'root',
})
export class TodoListRoutingRoutes {
  public constructor(
    private readonly links: TodoListRoutingLinks,
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
