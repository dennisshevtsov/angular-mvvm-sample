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
  private taskValue          : undefined | UpdateTodoListTaskRequestDto;

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get task(): UpdateTodoListTaskRequestDto {
    return this.taskValue ?? (this.taskValue = new UpdateTodoListTaskRequestDto());
  }

  public initialize(): Observable<void> {
    const requestDto = new GetTodoListTaskRequestDto(
      this.task.todoListId,
      this.task.todoListTaskId,
    );

    const project = (responseDto: GetTodoListTaskResponseDto) => {
      if (responseDto) {
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
