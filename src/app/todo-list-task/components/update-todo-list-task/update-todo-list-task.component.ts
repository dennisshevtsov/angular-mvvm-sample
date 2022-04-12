import { Component, OnDestroy,
         OnInit, ViewChild,        } from '@angular/core';
import { ActivatedRoute,           } from '@angular/router';

import { Subscription, } from 'rxjs';

import { PageComponent, TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,
         TODO_LIST_TASK_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { UpdateTodoListTaskViewModel,       } from './update-todo-list-task.view-model';

@Component({
  templateUrl: './update-todo-list-task.component.html',
  styleUrls: [
    './update-todo-list-task.component.scss',
  ],
})
export class UpdateTodoListTaskComponent implements OnInit, OnDestroy {
  @ViewChild('page')
  private page!: PageComponent;

  private subscription: Subscription;

  public constructor(
    public readonly vm: UpdateTodoListTaskViewModel,

    private readonly route    : ActivatedRoute,
    private readonly links    : TodoListTaskLinks,
  ) {
    this.subscription = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListTasksLink(this.vm.todoListId);
  }

  public ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);
        const todoListTaskId = params.get(TODO_LIST_TASK_ROUTE_ID_PARAMETER);

        if (todoListId && todoListTaskId) {
          this.vm.todoListId = todoListId;
          this.vm.todoListTaskId = todoListTaskId;

          const observer = {
            error: () => this.page.showError('An error occured.'),
          };

          this.subscription.add(
            this.vm.initialize().subscribe(observer));
        }
      })
    );
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public onOkPressed(): void {
    const observer = {
      complete: () => this.page.showMessage('The TODO list task was updated.'),
      error   : () => this.page.showError('An error occured.'),
    };

    this.subscription.add(this.vm.update().subscribe(observer));
  }
}
