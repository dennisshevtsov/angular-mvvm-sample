import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { GetTodoListTaskRequestDto,
         GetTodoListTaskResponseDto,
         TodoListTaskService,
         UpdateTodoListTaskRequestDto, } from 'src/app/todo-list-task/api';

@Injectable({
  providedIn: 'root',
})
export class UpdateTodoListTaskViewModel {
  private todoListIdValue    : undefined | number | string;
  private todoListTaskIdValue: undefined | number | string;
  private taskValue          : undefined | UpdateTodoListTaskRequestDto;

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get todoListId(): number | string {
    return this.todoListIdValue ?? 0;
  }

  public set todoListId(todoListId: number | string) {
    this.todoListIdValue = todoListId;
  }

  public get todoListTaskId(): number | string {
    return this.todoListTaskIdValue ?? 0;
  }

  public set todoListTaskId(todoListTaskId: number | string) {
    this.todoListTaskIdValue = todoListTaskId;
  }

  public get task(): UpdateTodoListTaskRequestDto {
    return this.taskValue ?? (this.taskValue = new UpdateTodoListTaskRequestDto());
  }

  public initialize(): Observable<void> {
    const requestDto = new GetTodoListTaskRequestDto(
      this.todoListId,
      this.todoListTaskId,
    );

    const project = (responseDto: GetTodoListTaskResponseDto) => {
      if (responseDto) {
        this.task.todoListId = this.todoListId;
        this.task.todoListId = this.todoListTaskId;

        this.task.title = responseDto.title;
        this.task.description = responseDto.description;

        this.task.date.day = responseDto.date.day;
        this.task.date.fullDay = responseDto.date.fullDay;
        this.task.date.start = responseDto.date.start;
        this.task.date.end = responseDto.date.end;
      }
    };

    return this.service.getTodoListTask(requestDto)
                       .pipe(map(project));
  }

  public update(): Observable<void> {
    return this.service.updateTodoListTask(this.task);
  }
}
