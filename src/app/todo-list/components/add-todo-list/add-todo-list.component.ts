import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { ToastsComponent   } from 'src/app/core';
import { TodoListLinks     } from 'src/app/core';
import { TodoListNavigator } from 'src/app/core';

import { TodoListComponent    } from '../todo-list/todo-list.component';
import { AddTodoListViewModel } from './add-todo-list.view-model';

@Component({
  templateUrl: './add-todo-list.component.html',
  styleUrls: [
    './add-todo-list.component.scss',
  ],
  providers: [
    AddTodoListViewModel,
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    }
  ],
})
export class AddTodoListComponent implements OnDestroy {
  @ViewChild('todoList')
  private todoList!: TodoListComponent;

  @ViewChild('toasts')
  private toasts!: ToastsComponent;

  public constructor(
    public readonly vm: AddTodoListViewModel,

    private readonly links    : TodoListLinks,
    private readonly navigator: TodoListNavigator,
    private readonly subscription: Subscription,
  ) {
    this.subscription = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListsLink();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onOkPressed(): void {
    this.todoList.validateForm();

    if (this.todoList.form.valid) {
      const observer = {
        complete: () => this.navigator.navigateToUpdateTodoList(this.vm.todoListId),
        error   : () => this.toasts.error('An error occured.'),
      };

      this.subscription.add(this.vm.add().subscribe(observer));
    }
  }
}
