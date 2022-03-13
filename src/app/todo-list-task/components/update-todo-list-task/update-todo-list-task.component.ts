import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup,       } from '@angular/forms';
import { ActivatedRoute,               } from '@angular/router';

import { Subscription, } from 'rxjs';

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
  implements OnInit, OnDestroy {
  private subscriptions: Subscription[];

  public constructor(
    public readonly vm: UpdateTodoListTaskViewModel,

    private readonly fb   : FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly links: TodoListTaskLinks,
  ) {
    super();

    this.subscriptions = [];
  }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);
      const todoListTaskId = params.get(TODO_LIST_TASK_ROUTE_ID_PARAMETER);

      if (todoListId && todoListTaskId) {
        this.vm.todoListId = todoListId;
        this.vm.todoListTaskId = todoListTaskId;

        this.subscriptions.push(
          this.vm.initialize()
                 .subscribe(() => {
                   this.form.setValue({
                     'title': this.vm.task.title,
                     'deacription': this.vm.task.description,
                     'date': {
                       'day': this.vm.task.date.day,
                       'fullDay': this.vm.task.date.fullDay,
                       'start': this.vm.task.date.start,
                       'end': this.vm.task.date.end
                     },
                   });
                 }));

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

  public ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.filter(subscription => subscription != null)
                        .forEach(subscription => subscription.unsubscribe());
    }
  }

  public onOkPressed(): void {
    this.vm.update();
  }

  protected buildForm(): FormGroup {
    return this.fb.group({
      'title': '',
      'deacription': '',
      'date': this.fb.group({
        'day': Date.now(),
        'fullDay': false,
        'start': Date.now(),
        'end': ''
      }),
    });
  }
}
