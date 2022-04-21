import { Component, OnDestroy, ViewChild, } from '@angular/core';

import { Subscription, } from 'rxjs';

import { PageComponent,
         TodoListLinks,
         TodoListNavigator,    } from 'src/app/core';
import { TodoListComponent,    } from '../todo-list/todo-list.component';
import { AddTodoListViewModel, } from './add-todo-list.view-model';

@Component({
  templateUrl: './add-todo-list.component.html',
  styleUrls: [
    './add-todo-list.component.scss',
  ],
  providers: [
    AddTodoListViewModel,
  ],
})
export class AddTodoListComponent implements OnDestroy {
  @ViewChild('page')
  private page!: PageComponent;

  @ViewChild('todoList')
  private todoList!: TodoListComponent;

  private readonly subscription: Subscription;

  public constructor(
    public readonly vm: AddTodoListViewModel,

    private readonly links    : TodoListLinks,
    private readonly navigator: TodoListNavigator,
  ) {
    this.subscription = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListsLink();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onOkPressed(): void {
    this.todoList.validateForm();

    if (this.todoList.form.valid) {
      const observer = {
        complete: () => this.navigator.navigateToUpdateTodoList(this.vm.todoListId),
        error   : () => this.page.showError('An error occured.'),
      };

      this.subscription.add(this.vm.add().subscribe(observer));
    }
  }
}
