import { Injectable } from '@angular/core';

import { map        } from 'rxjs';
import { Observable } from 'rxjs';

import { AddTodoListDayTaskRequestDto    } from 'src/app/todo-list-task/api';
import { AddTodoListPeriodTaskRequestDto } from 'src/app/todo-list-task/api';
import { TodoListTaskService             } from 'src/app/todo-list-task/api';
import { TodoListTaskViewModel           } from 'src/app/todo-list-task/components/todo-list-task';

@Injectable()
export class AddTodoListTaskViewModel {
  private taskValue : undefined | TodoListTaskViewModel;

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
        this.task.period.day,
      );
    }

    return new AddTodoListPeriodTaskRequestDto(
      this.task.todoListId,
      this.task.title,
      this.task.description,
      this.task.period.start,
      this.task.period.end,
    );
  }
}
