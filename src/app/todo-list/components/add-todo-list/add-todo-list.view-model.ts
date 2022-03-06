import { Injectable, } from '@angular/core';

import { AddTodoListRequestDto,
         TodoListService,       } from 'src/app/todo-list/api';

@Injectable({
  providedIn: 'root',
})
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

  public set todoList(todoList: AddTodoListRequestDto) {
    this.todoListValue = todoList;
  }

  public add(): void {
    const responseDto = this.service.addTodoList(this.todoList);

    if (responseDto) {
      this.todoListId = responseDto.todoListId;
    }
  }
}
