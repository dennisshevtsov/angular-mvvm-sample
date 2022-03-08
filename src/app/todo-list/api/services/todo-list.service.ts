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
    const index = this.todoLists.findIndex(todoList => todoList.todoListId === requestDto.todoListId);

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
    const todoListId = this.todoLists.length + 1;

    this.todoLists.push({
      todoListId: this.todoLists.length + 1,
      title: requestDto.title,
      description: requestDto.description,
    });

    return of(new AddTodoListResponseDto(todoListId));
  }

  public updateTodoList(
    requestDto: UpdateTodoListRequestDto)
    : Observable<void> {
    const index = this.todoLists.findIndex(todoList => todoList.todoListId === requestDto.todoListId);
    const todoList =  this.todoLists[index];

    todoList.title = requestDto.title;
    todoList.description = requestDto.description;

    return of();
  }

  public deleteTodoList(
    requestDto: DeleteTodoListRequestDto)
    : Observable<void> {
    const index = this.todoLists.findIndex(todoList => todoList.todoListId === requestDto.todoListId);

    if (index >= 0) {
      this.todoLists.splice(index, 1);
    }

    return of();
  }
}
