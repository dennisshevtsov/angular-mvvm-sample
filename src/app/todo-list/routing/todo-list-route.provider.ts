import { Injectable, } from '@angular/core';

import { TodoListLinks,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core/navigation';

@Injectable({
  providedIn: 'root',
})
export class TodoListRouteProvider {
  public constructor(
    private readonly links: TodoListLinks,
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
