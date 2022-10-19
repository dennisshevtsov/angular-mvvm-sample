import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { MILLISECONDS_IN_DAY,                } from 'src/app/core';
import { GetTodoListDayTaskResponseDto,
         GetTodoListPeriodTaskResponseDto,
         GetTodoListTaskRequestDto,
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

    const project = (responseDto: GetTodoListDayTaskResponseDto |
                                  GetTodoListPeriodTaskResponseDto) => {
      this.taskValue = this.buildTodoListTaskViewModel(responseDto);
    };

    return this.service.getTodoListTask(requestDto)
                       .pipe(map(project));
  }

  public update(): Observable<void> {
    return this.service.updateTodoListTask(this.buildRequestDto());
  }

  private buildTodoListTaskViewModel(
    responseDto: GetTodoListDayTaskResponseDto |
                 GetTodoListPeriodTaskResponseDto)
    : TodoListTaskViewModel {
    const vm = new TodoListTaskViewModel(
      this.task.todoListId,
      this.task.todoListTaskId,
      responseDto.title,
      responseDto.description,
    );

    if (responseDto instanceof GetTodoListDayTaskResponseDto) {
      vm.period.day     = responseDto.date;
      vm.period.start   = responseDto.date - responseDto.date % MILLISECONDS_IN_DAY;
      vm.period.end     = vm.period.start + MILLISECONDS_IN_DAY - 1;
      vm.period.fullDay = true;
    }
    else if (responseDto instanceof GetTodoListPeriodTaskResponseDto) {
      vm.period.day     = responseDto.begin - responseDto.begin % MILLISECONDS_IN_DAY;
      vm.period.start   = responseDto.begin;
      vm.period.end     = responseDto.end;
      vm.period.fullDay = false;
    }

    return vm;
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
