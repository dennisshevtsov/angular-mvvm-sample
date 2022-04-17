import { Component, OnDestroy,
         OnInit, ViewChild,        } from '@angular/core';
import { ActivatedRoute, ParamMap, } from '@angular/router';

import { Subscription, } from 'rxjs';

import { PageComponent,
         TodoListTaskLinks,
         TodoListTaskNavigator,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { TodoListTaskComponent,        } from '../todo-list-task/todo-list-task.component';
import { AddTodoListTaskViewModel,     } from './add-todo-list-task.view-model';

@Component({
  templateUrl: './add-todo-list-task.component.html',
  styleUrls: [
    './add-todo-list-task.component.scss',
  ],
  providers: [
    AddTodoListTaskViewModel,
  ],
})
export class AddTodoListTaskComponent implements OnInit, OnDestroy {
  @ViewChild('page')
  private page!: PageComponent;

  @ViewChild('task')
  private task!: TodoListTaskComponent;

  private subsription: Subscription;

  public constructor(
    public readonly vm: AddTodoListTaskViewModel,

    private readonly route    : ActivatedRoute,
    private readonly links    : TodoListTaskLinks,
    private readonly navigator: TodoListTaskNavigator,
  ) {
    this.subsription = new Subscription();
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
      error: () => this.page.showError('An error occured.'),
    };

    this.subsription.add(
      this.route.paramMap.subscribe(observer));
  }

  public ngOnDestroy(): void {
    this.subsription.unsubscribe();
  }

  public onOkPressed(): void {
    this.task.validateForm();

    if (this.task.form.valid) {
      const observer = {
        next: () => this.navigator.navigateToUpdateTodoListTask(
          this.vm.todoListId, this.vm.todoListTaskId),
        error: () => this.page.showError('An error occured.'),
      };

      this.subsription.add(this.vm.add().subscribe(observer));
    }
  }
}
