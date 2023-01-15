import { Injectable } from '@angular/core';

import { map        } from 'rxjs';
import { Observable } from 'rxjs';

import { AddTodoListResponseDto } from 'src/app/todo-list/api';
import { TodoListService        } from 'src/app/todo-list/api';

import { TodoListViewModel } from '../todo-list';

@Injectable()
export class AddTodoListViewModel {
  private todoListValue  : undefined | TodoListViewModel;

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get todoList(): TodoListViewModel {
    return this.todoListValue ?? (this.todoListValue = new TodoListViewModel());
  }

  public add(): Observable<void> {
    const project = (responseDto: AddTodoListResponseDto) => {
      if (responseDto) {
        this.todoList.todoListId = responseDto.todoListId;
      }
    };

    return this.service.addTodoList(this.todoList)
                       .pipe(map(project));
  }
}
