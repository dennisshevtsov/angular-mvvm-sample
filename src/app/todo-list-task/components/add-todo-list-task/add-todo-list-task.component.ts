import { Component, OnInit,      } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ActivatedRoute,         } from '@angular/router';

import { FormComponentBase, TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,         } from 'src/app/core';
import { AddTodoListTaskViewModel,             } from './add-todo-list-task.view-model';

@Component({
  templateUrl: './add-todo-list-task.component.html',
  styleUrls: [
    './add-todo-list-task.component.scss',
  ],
})
export class AddTodoListTaskComponent
  extends FormComponentBase
  implements OnInit {
  public constructor(
    public readonly vm: AddTodoListTaskViewModel,

    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

      if (todoListId) {
        this.vm.todoListId = todoListId;
      }
    });
  }

  public get backLink(): any[] {
    return this.todoListTaskLinks.searchTodoListTasksLink(this.vm.todoListId);
  }

  public onOkPressed(): void {
    this.vm.add();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({});
  }
}
