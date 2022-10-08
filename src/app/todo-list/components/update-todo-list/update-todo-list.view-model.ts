import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { GetTodoListRequestDto,
         GetTodoListResponseDto,
         TodoListService,
         UpdateTodoListRequestDto, } from 'src/app/todo-list/api';

@Injectable()
export class UpdateTodoListViewModel {
  private todoListValue: undefined | UpdateTodoListRequestDto;

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get todoList(): UpdateTodoListRequestDto {
    return this.todoListValue ?? (this.todoListValue = new UpdateTodoListRequestDto());
  }

  public set todoList(value: UpdateTodoListRequestDto) {
    this.todoListValue = value;
  }

  public initialize(): Observable<void> {
    const requestDto = new GetTodoListRequestDto(this.todoList.todoListId);

    const project = (responseDto: GetTodoListResponseDto) => {
      this.todoListValue = new UpdateTodoListRequestDto(
        this.todoList.todoListId,
        responseDto.title,
        responseDto.description,
      );
    };

    return this.service.getTodoList(requestDto)
                       .pipe(map(project));
  }

  public update(): Observable<void> {
    return this.service.updateTodoList(this.todoList);
  }
}
