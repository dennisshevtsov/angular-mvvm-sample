import { Component, } from '@angular/core';

import { AddTodoListTaskViewModel, } from './add-todo-list-task.view-model';

@Component({
  templateUrl: './add-todo-list-task.component.html',
  styleUrls: [
    './add-todo-list-task.component.scss',
  ],
})
export class AddTodoListTaskComponent {
  public constructor(
    public readonly vm: AddTodoListTaskViewModel,
  ) {}
}
