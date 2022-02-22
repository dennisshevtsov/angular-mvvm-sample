import { Component, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormComponentBase,    } from 'src/app/core';
import { TodoListLinkProvider, } from 'src/app/todo-list/routing';
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
    private readonly todoListLinks: TodoListLinkProvider,
  ) {
    super();
  }

  public get backLink(): any[] {
    return this.todoListLinks.searchTodoListsLink();
  }

  public onOkPressed(): void {
    this.vm.add();
  }

  protected buildForm(): FormGroup {
      return this.fb.group({});
  }
}
