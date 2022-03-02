import { Component, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute,               } from '@angular/router';

import { ModalComponent,
         TodoListLinks, TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,         } from 'src/app/core';
import { SearchTodoListTasksRecordResponseDto, } from 'src/app/todo-list-task/api';
import { SearchTodoListTasksViewModel,         } from './search-todo-list-tasks.view-model';

@Component({
  templateUrl: './search-todo-list-tasks.component.html',
  styleUrls: [
    './search-todo-list-tasks.component.scss',
  ],
})
export class SearchTodoListTasksComponent implements OnInit {
  @ViewChild('modal')
  private modalRef!: ModalComponent;

  private recordValue: SearchTodoListTasksRecordResponseDto | undefined;

  public constructor(
    public readonly vm: SearchTodoListTasksViewModel,

    private readonly route: ActivatedRoute,
    private readonly todoListLinks: TodoListLinks,
    private readonly todoListTaskLinks: TodoListTaskLinks,
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const todoListId = params.get(TODO_LIST_ROUTE_ID_PARAMETER);

      if (todoListId) {
        this.vm.todoListId = todoListId;
        this.vm.search();
      }
    });
  }

  public get selected(): SearchTodoListTasksRecordResponseDto {
    return this.recordValue ?? new SearchTodoListTasksRecordResponseDto(0);
  }

  public set selected(record: SearchTodoListTasksRecordResponseDto) {
    this.recordValue = record;
  }

  public get backLink(): any[] {
    return this.todoListLinks.searchTodoListsLink();
  }

  public get addTodoListTaskLink(): any[] {
    return this.todoListTaskLinks.addTodoListTaskLink(this.vm.todoListId);
  }

  public updateTodoListTaskLink(
    todoListTaskId: number | string) : any[] {
      return this.todoListTaskLinks.updateTodoListTaskLink(this.vm.todoListId, todoListTaskId);
  }

  public onCompletedChanged(
    record: SearchTodoListTasksRecordResponseDto): void {
    this.vm.complete();
  }

  public onDeletePressed(
    record: SearchTodoListTasksRecordResponseDto): void {
    this.selected = { ...record, };
    this.modalRef.show();
  }

  public onDeleteOkPressed(): void {
    this.vm.delete(this.selected);
    this.vm.search();
  }
}
