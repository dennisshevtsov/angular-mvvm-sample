import { Component, OnDestroy,
         OnInit, ViewChild,    } from '@angular/core';

import { Subscription, } from 'rxjs';

import { ModalComponent, PageComponent,
         ToastsComponent,
         TodoListLinks, TodoListTaskLinks, } from 'src/app/core';
import { SearchTodoListsRecordResponseDto, } from 'src/app/todo-list/api';
import { SearchTodoListsViewModel,         } from './search-todo-lists.view-model';

@Component({
  templateUrl: './search-todo-lists.component.html',
  styleUrls: [
    './search-todo-lists.component.scss',
  ],
  providers: [
    SearchTodoListsViewModel,
  ],
})
export class SearchTodoListsComponent implements OnInit, OnDestroy {
  @ViewChild('modal')
  public modal!: ModalComponent;

  @ViewChild('toasts')
  public toasts!: ToastsComponent;

  private subscription: Subscription;

  public constructor(
    public readonly vm: SearchTodoListsViewModel,

    private readonly todoListLinks    : TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {
    this.subscription = new Subscription();
  }

  public get addTodoListLink(): any[] {
    return this.todoListLinks.addTodoListLink();
  }

  public ngOnInit(): void {
    const observer = {
      error: () => this.toasts.push('Error', 'An error occured.'),
    };

    this.subscription.add(this.vm.search().subscribe(observer));
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
      complete: () => this.toasts.push('Info', message),
      error   : () => this.toasts.push('Error', 'An error occured.'),
    };

    this.subscription.add(this.vm.delete().subscribe(observer));
  }
}
