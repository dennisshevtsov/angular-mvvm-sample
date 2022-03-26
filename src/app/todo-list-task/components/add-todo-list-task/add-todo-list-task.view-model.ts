import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { AddTodoListTaskRequestDto,
         TodoListTaskService,       } from 'src/app/todo-list-task/api';

@Injectable({
  providedIn: 'root',
})
export class AddTodoListTaskViewModel {
  private todoListIdValue    : undefined | number | string;
  private todoListTaskIdValue: undefined | number | string;
  private taskValue          : undefined | AddTodoListTaskRequestDto;

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get todoListId(): number | string {
    return this.todoListIdValue ?? 0;
  }

  public set todoListId(todoListId: number | string) {
    this.todoListIdValue = todoListId;
    this.task.todoListId = todoListId;
  }

  public get todoListTaskId(): number | string {
    return this.todoListTaskIdValue ?? 0;
  }

  public set todoListTaskId(todoListTaskId: number | string) {
    this.todoListTaskIdValue = todoListTaskId;
  }

  public get task(): AddTodoListTaskRequestDto {
    return this.taskValue ?? (this.taskValue = new AddTodoListTaskRequestDto(this.todoListId));
  }

  public add(): Observable<void> {
    return this.service.addTodoListTask(this.task)
                       .pipe(map(responseDto => {
                         this.todoListTaskId = responseDto.todoListTaskId;
                       }));
  }
}
