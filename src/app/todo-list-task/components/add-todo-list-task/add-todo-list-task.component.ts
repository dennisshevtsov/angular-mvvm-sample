import { Component, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormComponentBase,        } from 'src/app/core';
import { AddTodoListTaskViewModel, } from './add-todo-list-task.view-model';

@Component({
  templateUrl: './add-todo-list-task.component.html',
  styleUrls: [
    './add-todo-list-task.component.scss',
  ],
})
export class AddTodoListTaskComponent extends FormComponentBase {
  public constructor(
    public readonly vm: AddTodoListTaskViewModel,

    private readonly fb: FormBuilder,
  ) {
    super();
  }

  public get backLink(): string {
    return '';
  }

  public onOkPressed(): void {
    this.vm.add();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({});
  }
}
