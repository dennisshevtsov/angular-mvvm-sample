import { Injectable } from '@angular/core';

import { map        } from 'rxjs';
import { Observable } from 'rxjs';

import { AddTodoListRequestDto  } from 'src/app/todo-list/api';
import { AddTodoListResponseDto } from 'src/app/todo-list/api';
import { TodoListService        } from 'src/app/todo-list/api';

@Injectable()
export class AddTodoListViewModel {
  private todoListIdValue: undefined | number | string;
  private todoListValue  : undefined | AddTodoListRequestDto;

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
    const project = (responseDto: AddTodoListResponseDto) => {
      if (responseDto) {
        this.todoListId = responseDto.todoListId;
      }
    };

    return this.service.addTodoList(this.todoList)
                       .pipe(map(project));
  }
}
