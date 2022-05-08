import { Injectable, } from '@angular/core';

import { Observable, of, throwError, } from 'rxjs';

import { AddTodoListRequestDto,
         AddTodoListResponseDto,
         DeleteTodoListRequestDto,
         GetTodoListRequestDto,
         GetTodoListResponseDto,
         UpdateTodoListRequestDto,
         SearchTodoListsRecordResponseDto,
         SearchTodoListsRequestDto,        } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private todoLists: {
    todoListId: number,
    title: string,
    description: string,
  }[] = [
    { todoListId: 1, title: 'Create mock data.', description: 'You have to create mock data in the DB.', },
    { todoListId: 2, title: 'Add task list in search todo lists screen.', description: 'You have to change the search todo lists component.', },
    { todoListId: 3, title: 'Remove old components.', description: 'Remove components that are already unused.', },
  ];

  public getTodoList(
    requestDto: GetTodoListRequestDto)
    : Observable<GetTodoListResponseDto> {
    const index = this.todoLists.findIndex(todoList => todoList.todoListId == requestDto.todoListId);

    if (index > -1) {
      const todoList =  this.todoLists[index];

      return of({ ...todoList, });
    }

    return throwError(() => 'Not Found.');
  }

  public searchTodoList(
    requestDto: SearchTodoListsRequestDto)
    : Observable<SearchTodoListsRecordResponseDto[]> {
    return of(this.todoLists.map(todoList => new SearchTodoListsRecordResponseDto(
      todoList.todoListId,
      todoList.title,
      todoList.description)));
  }

  public addTodoList(
    requestDto: AddTodoListRequestDto)
    : Observable<AddTodoListResponseDto> {
    const newTodoListId = this.getTodoListId(this.todoLists);

    this.todoLists.push({
      todoListId: newTodoListId,
      title: requestDto.title,
      description: requestDto.description,
    });

    return of(new AddTodoListResponseDto(newTodoListId));
  }

  public updateTodoList(
    requestDto: UpdateTodoListRequestDto)
    : Observable<void> {
    const index = this.todoLists.findIndex(todoList => todoList.todoListId == requestDto.todoListId);

    if (index >= 0) {
      const todoList =  this.todoLists[index];

      todoList.title = requestDto.title;
      todoList.description = requestDto.description;
    }

    return of(void 0);
  }

  public deleteTodoList(
    requestDto: DeleteTodoListRequestDto)
    : Observable<void> {
    const index = this.todoLists.findIndex(todoList => todoList.todoListId == requestDto.todoListId);

    if (index >= 0) {
      this.todoLists = this.todoLists.splice(index, 1);
    }

    return of(void 0);
  }

  private getTodoListId(
    todoLists: {
      todoListId: number,
      title: string,
      description: string,
    }[]) {
    let todoListId = 0;

    if (todoLists.length) {
      const lastTodoList = todoLists[todoLists.length -1];

      todoListId = lastTodoList.todoListId + 1;
    }

    return todoListId;
  }
}
