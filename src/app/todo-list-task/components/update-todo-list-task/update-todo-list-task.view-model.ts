import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { GetTodoListTaskRequestDto,
         GetTodoListTaskResponseDto,
         TodoListTaskService,
         UpdateTodoListDayTaskRequestDto,
         UpdateTodoListPeriodTaskRequestDto, } from 'src/app/todo-list-task/api';
import { TodoListTaskViewModel,              } from 'src/app/todo-list-task/components/todo-list-task';

@Injectable()
export class UpdateTodoListTaskViewModel {
  private taskValue : undefined | TodoListTaskViewModel;

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get task(): TodoListTaskViewModel {
    return this.taskValue ?? (this.taskValue = new TodoListTaskViewModel());
  }

  public initialize(): Observable<void> {
    const requestDto = new GetTodoListTaskRequestDto(
      this.task.todoListId,
      this.task.todoListTaskId,
    );

    const project = (responseDto: GetTodoListTaskResponseDto) => {
      if (responseDto) {
        this.taskValue = new TodoListTaskViewModel(
          this.task.todoListId,
          this.task.todoListTaskId,
          responseDto.title,
          responseDto.description,
        );
      }
    };

    return this.service.getTodoListTask(requestDto)
                       .pipe(map(project));
  }

  public update(): Observable<void> {
    return this.service.updateTodoListTask(this.buildRequestDto());
  }

  private buildRequestDto(): UpdateTodoListDayTaskRequestDto | UpdateTodoListPeriodTaskRequestDto {
    if (this.task.period.fullDay) {
      return new UpdateTodoListDayTaskRequestDto(
        this.task.todoListId,
        this.task.todoListTaskId,
        this.task.title,
        this.task.description,
        this.task.period.day,
      );
    }

    return new UpdateTodoListPeriodTaskRequestDto(
      this.task.todoListId,
      this.task.todoListTaskId,
      this.task.title,
      this.task.description,
      this.task.period.start,
      this.task.period.end,
    );
  }
}
