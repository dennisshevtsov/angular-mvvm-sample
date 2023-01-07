import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit    } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { ModalComponent    } from 'src/app/core';
import { ToastsComponent   } from 'src/app/core';
import { TodoListLinks     } from 'src/app/core';
import { TodoListTaskLinks } from 'src/app/core';

import { SearchTodoListsRecordResponseDto } from 'src/app/todo-list/api';
import { SearchTodoListsViewModel         } from './search-todo-lists.view-model';

@Component({
  templateUrl: './search-todo-lists.component.html',
  providers: [
    SearchTodoListsViewModel,
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class SearchTodoListsComponent implements OnInit, OnDestroy {
  @ViewChild('modal')
  public modal!: ModalComponent;

  @ViewChild('toasts')
  public toasts!: ToastsComponent;

  public constructor(
    public readonly vm: SearchTodoListsViewModel,

    private readonly subscription: Subscription,

    private readonly todoListLinks    : TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {}

  public get addTodoListLink(): any[] {
    return this.todoListLinks.addTodoListLink();
  }

  public ngOnInit(): void {
    const observer = {
      error: () => this.toasts.error('An error occured.'),
    };

    this.subscription.add(this.vm.search().subscribe(observer));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public updateTodoListLink(
    record: SearchTodoListsRecordResponseDto)
    : any[] {
    return this.todoListLinks.updateTodoListLink(record.todoListId);
  }

  public searchTodoListTasksLink(
    record: SearchTodoListsRecordResponseDto)
    : any[] {
    return this.todoListTaskLinks.searchTodoListTasksLink(record.todoListId);
  }

  public onDeletePressed(
    record: SearchTodoListsRecordResponseDto)
    : void {
    this.vm.selected = record;
    this.modal.show();
  }

  public onDeleteOkPressed(): void {
    const message = `TODO list '${this.vm.selected.title}' was deleted.`;
    const observer = {
      complete: () => this.toasts.info(message),
      error   : () => this.toasts.error('An error occured.'),
    };

    this.subscription.add(this.vm.delete().subscribe(observer));
  }
}
