import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup,       } from '@angular/forms';
import { ActivatedRoute, ParamMap,     } from '@angular/router';

import { Subscription, } from 'rxjs';

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
  implements OnInit, OnDestroy {
  private subsriptions: Subscription[];

  public constructor(
    public readonly vm: AddTodoListTaskViewModel,

    private readonly fb       : FormBuilder,
    private readonly route    : ActivatedRoute,
    private readonly links    : TodoListTaskLinks,
    private readonly navigator: TodoListTaskNavigator,
  ) {
    super();

    this.subsriptions = [];
  }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public ngOnInit(): void {
    const observer = {
      next: (params: ParamMap) => {
        const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

        if (todoListId) {
          this.vm.todoListId = todoListId;
        }
      },
    };

    this.subsriptions.push(
      this.route.paramMap.subscribe(observer));

    this.form.valueChanges.subscribe(value => {
      this.vm.task.title = value.title;
      this.vm.task.description = value.title;
      this.vm.task.date = value.date;
    });
  }

  public ngOnDestroy(): void {
    if (this.subsriptions) {
      this.subsriptions.forEach(subscription => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    }
  }

  public onOkPressed(): void {
    const observer = {
      next: () => this.navigator.navigateToUpdateTodoListTask(
        this.vm.todoListId, this.vm.todoListTaskId),
    };

    this.subsriptions.push(this.vm.add().subscribe(observer));
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
