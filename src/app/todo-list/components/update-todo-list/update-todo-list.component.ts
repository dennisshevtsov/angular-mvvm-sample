import { Component, } from '@angular/core';

import { UpdateTodoListViewModel, } from './update-todo-list.view-model';

@Component({
  templateUrl: './update-todo-list.component.html',
  styleUrls: [
    './update-todo-list.component.scss',
  ],
})
export class UpdateTodoListComponent {
  public constructor(
    public readonly vm: UpdateTodoListViewModel,
  ) {}

  public get backLink(): string {
    return '';
  }

  public onOkPressed(): void {
    this.vm.update();
  }
}
