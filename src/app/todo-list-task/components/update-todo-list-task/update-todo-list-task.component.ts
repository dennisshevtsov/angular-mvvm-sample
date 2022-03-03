import { Component, OnInit,      } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ActivatedRoute,         } from '@angular/router';

import { FormComponentBase,
         TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,
         TODO_LIST_TASK_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { UpdateTodoListTaskRequestDto,      } from 'src/app/todo-list-task/api';
import { UpdateTodoListTaskViewModel,       } from './update-todo-list-task.view-model';

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
      const todoListTaskId = params.get(TODO_LIST_TASK_ROUTE_ID_PARAMETER);

      if (todoListId && todoListTaskId) {
        this.vm.todoListId = todoListId;
        this.vm.todoListTaskId = todoListTaskId;

        this.vm.initialize();

        this.form.valueChanges.subscribe(value => {
          this.vm.task = new UpdateTodoListTaskRequestDto(
            this.vm.todoListId,
            this.vm.todoListTaskId,
            value.title,
            value.deacription,
            value.date,
          );
        });
      }
    });
  }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public onOkPressed(): void {
    this.vm.update();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({});
  }
}
