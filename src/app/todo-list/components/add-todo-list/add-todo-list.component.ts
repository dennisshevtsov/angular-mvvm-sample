import { Component, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormComponentBase } from 'src/app/core';

import { AddTodoListViewModel, } from './add-todo-list.view-model';

@Component({
  templateUrl: './add-todo-list.component.html',
  styleUrls: [
    './add-todo-list.component.scss',
  ],
})
export class AddTodoListComponent extends FormComponentBase {
  public constructor(
    public readonly vm: AddTodoListViewModel,
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
