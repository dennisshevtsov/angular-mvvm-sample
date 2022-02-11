import { Component, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

    private readonly fb: FormBuilder,
  ) {}

  public get form(): FormGroup {
    return this.fb.group({});
  }

  public onOkPressed(): void {
    this.vm.add();
  }
}
