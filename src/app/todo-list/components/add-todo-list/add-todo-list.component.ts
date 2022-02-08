import { Component, } from '@angular/core';

import { AddTodoListViewModel, } from './add-todo-list.view-model';

@Component({
  templateUrl: './add-todo-list.component.html',
  styleUrls: [
    './add-todo-list.component.scss',
  ],
})
export class AddTodoListComponent {
  public constructor(
    public readonly vm: AddTodoListViewModel,
  ) {}

  public get backLink(): string {
    return '';
  }

  public onOkPressed(): void {
    this.vm.add();
  }
}
