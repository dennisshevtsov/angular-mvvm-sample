import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { AddTodoListDayTaskRequestDto,
         AddTodoListPeriodTaskRequestDto,
         TodoListTaskService,          } from 'src/app/todo-list-task/api';
import { TodoListTaskViewModel,        } from 'src/app/todo-list-task/components/todo-list-task/todo-list-task.view-model';

@Injectable()
export class AddTodoListTaskViewModel {
  private taskValue          : undefined | TodoListTaskViewModel;

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get task(): TodoListTaskViewModel {
    return this.taskValue ?? (this.taskValue = new TodoListTaskViewModel());
  }

  public add(): Observable<void> {
    return this.service.addTodoListTask(this.buildRequestDto())
                       .pipe(map(responseDto => {
                         this.task.todoListTaskId = responseDto.todoListTaskId;
                       }));
  }

  private buildRequestDto(): AddTodoListDayTaskRequestDto | AddTodoListPeriodTaskRequestDto {
    if (this.task.period.fullDay) {
      return new AddTodoListDayTaskRequestDto(
        this.task.todoListId,
        this.task.title,
        this.task.description,
        '2022-09-01T00:00:00', //this.task.period.day,
      );
    }

    return new AddTodoListPeriodTaskRequestDto(
      this.task.todoListId,
      this.task.title,
      this.task.description,
      '2022-09-01T12:00:00', //this.task.period.start,
      '2022-09-01T13:00:00', //this.task.period.end,
    );
  }
}
