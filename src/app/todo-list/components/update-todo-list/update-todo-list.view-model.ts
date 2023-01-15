import { Injectable, } from '@angular/core';

import { map        } from 'rxjs';
import { Observable } from 'rxjs';

import { GetTodoListRequestDto    } from 'src/app/todo-list/api';
import { GetTodoListResponseDto   } from 'src/app/todo-list/api';
import { TodoListService          } from 'src/app/todo-list/api';
import { UpdateTodoListRequestDto } from 'src/app/todo-list/api';

import { TodoListViewModel } from '../todo-list';

@Injectable()
export class UpdateTodoListViewModel {
  private todoListValue: undefined | TodoListViewModel;

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get todoList(): TodoListViewModel {
    return this.todoListValue ?? (this.todoListValue = new TodoListViewModel());
  }

  public set todoList(value: TodoListViewModel) {
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
