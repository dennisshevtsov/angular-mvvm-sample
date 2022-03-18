import { Component, OnDestroy,
         OnInit, ViewChild,    } from '@angular/core';

import { Subscription, } from 'rxjs';

import { ModalComponent, PageComponent, TodoListLinks,
         TodoListTaskLinks,                } from 'src/app/core';
import { SearchTodoListsRecordResponseDto, } from 'src/app/todo-list/api';
import { SearchTodoListsViewModel,         } from './search-todo-lists.view-model';

@Component({
  templateUrl: './search-todo-lists.component.html',
  styleUrls: [
    './search-todo-lists.component.scss',
  ],
})
export class SearchTodoListsComponent implements OnInit, OnDestroy {
  @ViewChild('page')
  public page!: PageComponent;

  @ViewChild('modal')
  public model!: ModalComponent;

  private subscription: undefined | Subscription;

  public constructor(
    public readonly vm: SearchTodoListsViewModel,

    private readonly todoListLinks    : TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {}

  public get addTodoListLink(): any[] {
    return this.todoListLinks.addTodoListLink();
  }

  public ngOnInit(): void {
    const observer = {
      error: () => this.page.showError('An error occured.'),
    };

    this.subscription = this.vm.search().subscribe(observer);
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
    this.model.show();
  }

  public onDeleteOkPressed(): void {
    this.vm.delete();
  }
}
