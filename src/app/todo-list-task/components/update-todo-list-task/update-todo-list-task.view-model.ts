import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { AppClock, MILLISECONDS_IN_HOUR,
         MILLISECONDS_IN_MENUTE,             } from 'src/app/core';
import { GetTodoListTaskRequestDto,
         GetTodoListTaskResponseDto,
         TodoListTaskService,
         UpdateTodoListDayTaskRequestDto,
         UpdateTodoListPeriodTaskRequestDto, } from 'src/app/todo-list-task/api';

@Injectable()
export class UpdateTodoListTaskViewModel {
  private taskValue   : undefined | UpdateTodoListDayTaskRequestDto | UpdateTodoListPeriodTaskRequestDto;
  private fullDayValue: undefined | boolean;

  public constructor(
    private readonly clock  : AppClock,
    private readonly service: TodoListTaskService,
  ) {}

  public get fullDay(): boolean {
    return this.fullDayValue === true;
  }

  public set fullDay(value: boolean) {
    if (this.fullDayValue != value) {
      if (value) {
        this.taskValue = new UpdateTodoListDayTaskRequestDto(
          this.task.todoListId,
          this.task.todoListTaskId,
          this.task.title,
          this.task.description,
          this.clock.now(),
        );
      }
      else {
        const now = this.clock.now();
        const step = 15 * MILLISECONDS_IN_MENUTE;
        const start = now - (now % step) + step;
        const end = start + MILLISECONDS_IN_HOUR;

        this.taskValue = new UpdateTodoListPeriodTaskRequestDto(
          this.task.todoListId,
          this.task.todoListTaskId,
          this.task.title,
          this.task.description,
          start,
          end,
        );
      }

      this.fullDayValue = value;
    }
  }

  public get task(): UpdateTodoListDayTaskRequestDto | UpdateTodoListPeriodTaskRequestDto {
    return this.taskValue ?? (this.taskValue = this.fullDay ? new UpdateTodoListDayTaskRequestDto() : new UpdateTodoListPeriodTaskRequestDto());
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
      }
    };

    return this.service.getTodoListTask(requestDto)
                       .pipe(map(project));
  }

  public update(): Observable<void> {
    return this.service.updateTodoListTask(this.task);
  }
}
