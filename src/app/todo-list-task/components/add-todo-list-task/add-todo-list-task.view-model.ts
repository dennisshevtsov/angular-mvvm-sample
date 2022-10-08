import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { AddTodoListTaskRequestDto,
         TodoListTaskService,       } from 'src/app/todo-list-task/api';

@Injectable()
export class AddTodoListTaskViewModel {
  private todoListIdValue    : undefined | string;
  private todoListTaskIdValue: undefined | string;
  private taskValue          : undefined | AddTodoListTaskRequestDto;

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get todoListId(): string {
    return this.todoListIdValue ?? '';
  }

  public set todoListId(todoListId: string) {
    this.todoListIdValue = todoListId;
    this.task.todoListId = todoListId;
  }

  public get todoListTaskId(): string {
    return this.todoListTaskIdValue ?? '';
  }

  public set todoListTaskId(todoListTaskId:string) {
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
