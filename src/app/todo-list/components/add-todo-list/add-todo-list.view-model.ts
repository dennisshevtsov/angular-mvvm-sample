import { Injectable, } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { AddTodoListRequestDto,
         AddTodoListResponseDto,
         TodoListService,        } from 'src/app/todo-list/api';

@Injectable()
export class AddTodoListViewModel {
  private todoListIdValue: number | string | undefined;
  private todoListValue: AddTodoListRequestDto | undefined;

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get todoListId(): number | string {
    return this.todoListIdValue ?? 0;
  }

  public set todoListId(todoListId: number | string) {
    this.todoListIdValue = todoListId;
  }

  public get todoList(): AddTodoListRequestDto {
    return this.todoListValue ?? (this.todoListValue = new AddTodoListRequestDto());
  }

  public add(): Observable<void> {
    const projet = (responseDto: AddTodoListResponseDto) => {
      if (responseDto) {
        this.todoListId = responseDto.todoListId;
      }
    };

    return this.service.addTodoList(this.todoList)
                       .pipe(map(projet));
  }
}
