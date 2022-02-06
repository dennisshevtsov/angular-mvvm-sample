import { Component, } from '@angular/core';

import { SearchTodoListsViewModel, } from './search-todo-lists.view-model';

@Component({
  templateUrl: './search-todo-lists.component.html',
  styleUrls: [
    './search-todo-lists.component.scss',
  ],
})
export class SearchTodoListsComponent {
  public constructor(
    public vm: SearchTodoListsViewModel,
  ) {}
}
