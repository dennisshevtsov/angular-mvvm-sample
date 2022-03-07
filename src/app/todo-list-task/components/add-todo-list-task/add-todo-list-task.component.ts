import { Component, OnInit,      } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { ActivatedRoute,         } from '@angular/router';

import { FormComponentBase,
         TodoListTaskLinks,
         TodoListTaskNavigator,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { AddTodoListTaskViewModel,     } from './add-todo-list-task.view-model';

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

    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly links: TodoListTaskLinks,
    private readonly navigator: TodoListTaskNavigator,
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

    this.form.valueChanges.subscribe(value => {
      this.vm.task.title = value.title;
      this.vm.task.description = value.title;
      this.vm.task.date = value.date;
    });
  }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public onOkPressed(): void {
    this.vm.add();
    this.navigator.navigateToUpdateTodoListTask(
      this.vm.todoListId,
      this.vm.todoListTaskId)
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title': '',
      'description': '',
      'date': this.fb.group({
        'day': Date.now(),
        'fullDay': false,
        'start': Date.now(),
        'end': ''
      }),
    });
  }
}
