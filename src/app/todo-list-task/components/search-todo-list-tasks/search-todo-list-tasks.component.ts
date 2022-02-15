import { Component, OnInit, } from '@angular/core';

import { SearchTodoListTasksRecordResponseDto, } from 'src/app/todo-list-task-api';
import { SearchTodoListTasksViewModel,         } from './search-todo-list-tasks.view-model';

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

  public get backLink(): string {
    return '';
  }

  public get addTodoListTaskLink(): string {
    return '';
  }

  public onCompletedChanged(
    record: SearchTodoListTasksRecordResponseDto): void {
    this.vm.complete();
  }
}
