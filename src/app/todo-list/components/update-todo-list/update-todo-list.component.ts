import { Component, OnInit,      } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ActivatedRoute,         } from '@angular/router';

import { FormComponentBase,
         TodoListLinks,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { UpdateTodoListViewModel,      } from './update-todo-list.view-model';

@Component({
  templateUrl: './update-todo-list.component.html',
  styleUrls: [
    './update-todo-list.component.scss',
  ],
})
export class UpdateTodoListComponent
  extends FormComponentBase
  implements OnInit {
  public constructor(
    public readonly vm: UpdateTodoListViewModel,

    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly links: TodoListLinks,
  ) {
    super();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListsLink();
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

      if (todoListId) {
        this.vm.todoList.todoListId = todoListId;
        this.vm.initialize();
      }
    });

    this.form.valueChanges.subscribe(value => {
      this.vm.todoList.title = value.title;
      this.vm.todoList.description = value.description;
    });
  }

  public onOkPressed(): void {
    this.vm.update();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title': '',
      'description': ''
    });
  }
}
