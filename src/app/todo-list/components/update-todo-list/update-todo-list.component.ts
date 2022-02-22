import { Component,             } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { FormComponentBase,       } from 'src/app/core';
import { TodoListLinkProvider,    } from 'src/app/todo-list/routing';
import { UpdateTodoListViewModel, } from './update-todo-list.view-model';

@Component({
  templateUrl: './update-todo-list.component.html',
  styleUrls: [
    './update-todo-list.component.scss',
  ],
})
export class UpdateTodoListComponent extends FormComponentBase {
  public constructor(
    public readonly vm: UpdateTodoListViewModel,

    private readonly fb: FormBuilder,
    private readonly todoListLinks: TodoListLinkProvider,
  ) {
    super();
  }

  public get backLink(): any[] {
    return this.todoListLinks.searchTodoListsLink();
  }

  public onOkPressed(): void {
    this.vm.update();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({});
  }
}
