import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { AppClock, MILLISECONDS_IN_HOUR,
         MILLISECONDS_IN_MENUTE,          } from 'src/app/core';
import { AddTodoListDayTaskRequestDto,
         AddTodoListPeriodTaskRequestDto,
         TodoListTaskService,             } from 'src/app/todo-list-task/api';

@Injectable()
export class AddTodoListTaskViewModel {
  private todoListIdValue    : undefined | string;
  private todoListTaskIdValue: undefined | string;
  private taskValue          : undefined | AddTodoListDayTaskRequestDto | AddTodoListPeriodTaskRequestDto;
  private fullDayValue       : undefined | boolean;

  public constructor(
    private readonly clock  : AppClock,
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

  public get fullDay(): boolean {
    return this.fullDayValue === true;
  }

  public set fullDay(value: boolean) {
    if (this.fullDay != value) {
      if (value) {
        this.taskValue = new AddTodoListDayTaskRequestDto(
          this.todoListId,
          this.task.title,
          this.task.description,
          this.clock.now());
      }
      else {
        const now = this.clock.now();
        const step = 15 * MILLISECONDS_IN_MENUTE;
        const start = now - (now % step) + step;
        const end = start + MILLISECONDS_IN_HOUR;

        this.taskValue = new AddTodoListPeriodTaskRequestDto(
          this.todoListId,
          this.task.title,
          this.task.description,
          start,
          end);
      }

      this.fullDayValue = value;
    }
  }

  public get task(): AddTodoListDayTaskRequestDto | AddTodoListPeriodTaskRequestDto {
    return this.taskValue ?? (this.taskValue = this.fullDay ? new AddTodoListDayTaskRequestDto(this.todoListId) : new AddTodoListPeriodTaskRequestDto(this.todoListId));
  }

  public add(): Observable<void> {
    return this.service.addTodoListTask(this.task)
                       .pipe(map(responseDto => {
                         this.todoListTaskId = responseDto.todoListTaskId;
                       }));
  }
}
