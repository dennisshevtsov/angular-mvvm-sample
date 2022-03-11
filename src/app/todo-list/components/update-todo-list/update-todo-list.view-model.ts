import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { GetTodoListRequestDto,
         TodoListService,
         UpdateTodoListRequestDto, } from 'src/app/todo-list/api';

@Injectable({
  providedIn: 'root',
})
export class UpdateTodoListViewModel {
  private todoListValue: UpdateTodoListRequestDto | undefined;

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get todoList(): UpdateTodoListRequestDto {
    return this.todoListValue ?? (this.todoListValue = new UpdateTodoListRequestDto());
  }

  public set todoList(todoList: UpdateTodoListRequestDto) {
    this.todoListValue = todoList;
  }

  public initialize(): Observable<void> {
    const requestDto = new GetTodoListRequestDto(this.todoList.todoListId);

    return this.service.getTodoList(requestDto)
                       .pipe(map(responseDto => {
                         this.todoList.title = responseDto.title;
                         this.todoList.description = responseDto.description;
                       }));
  }

  public update(): void {
    this.service.updateTodoList(this.todoList);
  }
}
