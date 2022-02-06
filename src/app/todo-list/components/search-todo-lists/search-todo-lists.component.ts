import { Component, OnInit, } from '@angular/core';

import { SearchTodoListsViewModel, } from './search-todo-lists.view-model';

@Component({
  templateUrl: './search-todo-lists.component.html',
  styleUrls: [
    './search-todo-lists.component.scss',
  ],
})
export class SearchTodoListsComponent implements OnInit {
  public constructor(
    public vm: SearchTodoListsViewModel,
  ) {}

  public ngOnInit(): void {
      this.vm.search();
  }

  public get addTodoListLink(): string {
    return '';
  }

  public updateTodoListLink(todoListId: string | number) : string {
    return '';
  }

  public searchTodoListTasksLink(todoListId: string | number) : string {
    return '';
  }
}
