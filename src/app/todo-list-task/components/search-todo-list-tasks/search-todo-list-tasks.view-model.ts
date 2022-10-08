import { Injectable, } from '@angular/core';

import { map, mergeMap, Observable, of, } from 'rxjs';

import { CompleteTodoListTaskRequestDto,
         DeleteTodoListTaskRequestDto,
         SearchTodoListTasksRecordResponseDto,
         SearchTodoListTasksRequestDto,
         TodoListTaskService,
         UncompleteTodoListTaskRequestDto,     } from 'src/app/todo-list-task/api';

@Injectable()
export class SearchTodoListTasksViewModel {
  private todoListIdValue: undefined | string;
  private recordValue    : undefined | SearchTodoListTasksRecordResponseDto;
  private tasksValue     : undefined | SearchTodoListTasksRecordResponseDto[];

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get todoListId(): string {
    return this.todoListIdValue ?? '';
  }

  public set todoListId(todoListId: string) {
    this.todoListIdValue = todoListId;
  }

  public get selected(): SearchTodoListTasksRecordResponseDto {
    return this.recordValue ?? new SearchTodoListTasksRecordResponseDto();
  }

  public set selected(record: SearchTodoListTasksRecordResponseDto) {
    this.recordValue = record;
  }

  public get hasSelection(): boolean {
    return !!this.selected.todoListTaskId;
  }

  public get tasks(): SearchTodoListTasksRecordResponseDto[] {
    return this.tasksValue ?? [];
  }

  public set tasks(tasks: SearchTodoListTasksRecordResponseDto[]) {
    this.tasksValue = tasks;
  }

  public search(): Observable<void> {
    const requestDto = new SearchTodoListTasksRequestDto(this.todoListId);

    return this.service.searchTodoListTasks(requestDto)
                       .pipe(map(responseDtos => {
                         this.tasks = responseDtos;
                       }));
  }

  public complete(): Observable<void> {
    if (this.hasSelection) {
      const requestDto = new CompleteTodoListTaskRequestDto(
        this.todoListId,
        this.selected.todoListTaskId,
      );
  
      return this.service.completeTodoListTask(requestDto)
                         .pipe(map(() => {
                           this.selected.completed = true;
                         }));
    }

    return of(void 0);
  }

  public uncomplete(): Observable<void> {
    if (this.hasSelection) {
      const requestDto = new UncompleteTodoListTaskRequestDto(
        this.todoListId,
        this.selected.todoListTaskId,
      );

      return this.service.uncompleteTodoListTask(requestDto)
                         .pipe(map(() => {
                           this.selected.completed = false;
                         }));
    }

    return of(void 0);
  }

  public delete() : Observable<void> {
    if (this.hasSelection) {
      const requestDto = new DeleteTodoListTaskRequestDto(
        this.todoListId,
        this.selected.todoListTaskId,
      );
  
      return this.service.deleteTodoListTask(requestDto)
                         .pipe(mergeMap(() => this.search()));
    }

    return of(void 0);
  }
}
