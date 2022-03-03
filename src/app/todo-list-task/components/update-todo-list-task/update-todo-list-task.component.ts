import { Component, OnInit,      } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ActivatedRoute,         } from '@angular/router';

import { FormComponentBase,
         TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { UpdateTodoListTaskViewModel,  } from './update-todo-list-task.view-model';

@Component({
  templateUrl: './update-todo-list-task.component.html',
  styleUrls: [
    './update-todo-list-task.component.scss',
  ],
})
export class UpdateTodoListTaskComponent
  extends  FormComponentBase
  implements OnInit {
  public constructor(
    public readonly vm: UpdateTodoListTaskViewModel,

    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly links: TodoListTaskLinks,
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
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public onOkPressed(): void {}

  protected buildForm(): FormGroup {
    return this.fb.group({});
  }
}
