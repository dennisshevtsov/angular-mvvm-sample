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
    private readonly sub      : Subscription,
  ) {
    this.sub = new Subscription();
  }

  public get backLink(): any[] {
    return this.links.searchTodoListsLink();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onOkPressed(): void {
    this.todoList.validateForm();

    if (this.todoList.form.valid) {
      const observer = {
        complete: () => this.navigator.navigateToUpdateTodoList(this.vm.todoList.todoListId),
        error   : () => this.toasts.error('An error occured.'),
      };

      this.sub.add(this.vm.add().subscribe(observer));
    }
  }
}
