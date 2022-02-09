import { Component, OnInit, } from '@angular/core';

import { SearchTodoListTasksViewModel, } from './search-todo-list-tasks.view-model';

@Component({
  templateUrl: './search-todo-list-tasks.component.html',
  styleUrls: [
    './search-todo-list-tasks.component.scss',
  ],
})
export class SearchTodoListTasksComponent implements OnInit {
  public constructor(
    public readonly vm: SearchTodoListTasksViewModel,
  ) {}

  public ngOnInit(): void {
    this.vm.search();
  }
}
