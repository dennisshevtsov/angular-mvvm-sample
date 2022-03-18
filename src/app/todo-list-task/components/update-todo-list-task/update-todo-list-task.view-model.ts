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
    return this.taskValue ?? new UpdateTodoListTaskRequestDto();
  }

  public set task(task: UpdateTodoListTaskRequestDto) {
    this.taskValue = task;
  }

  public initialize(): Observable<void> {
    const requestDto = new GetTodoListTaskRequestDto(
      this.todoListId,
      this.todoListTaskId,
    );
    const project = (responseDto: GetTodoListTaskResponseDto | null) => {
      if (responseDto) {
        this.task = new UpdateTodoListTaskRequestDto(
          this.todoListId,
          this.todoListTaskId,
          responseDto.title,
          responseDto.description,
          responseDto.date,
        );
      }
    };

    return this.service.getTodoListTask(requestDto)
                       .pipe(map(project));
  }

  public update(): Observable<void> {
    return this.service.updateTodoListTask(this.task);
  }
}
