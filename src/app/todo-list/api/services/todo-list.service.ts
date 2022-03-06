import { Injectable, } from '@angular/core';

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
    : GetTodoListResponseDto | null {
    const index = this.todoLists.findIndex(todoList => todoList.todoListId === requestDto.todoListId);

    if (index > -1) {
      const todoList =  this.todoLists[index];

      return { ...todoList, };
    }

    return null;
  }

  public searchTodoList(
    requestDto: SearchTodoListsRequestDto)
    : SearchTodoListsRecordResponseDto[] {
    return this.todoLists.map(todoList => new SearchTodoListsRecordResponseDto(
      todoList.todoListId,
      todoList.title,
      todoList.description));
  }

  public addTodoList(
    requestDto: AddTodoListRequestDto)
    : AddTodoListResponseDto {
    const todoListId = this.todoLists.length + 1;

    this.todoLists.push({
      todoListId: this.todoLists.length + 1,
      title: requestDto.title,
      description: requestDto.description,
    });

    return new AddTodoListResponseDto(todoListId);
  }

  public updateTodoList(
    requestDto: UpdateTodoListRequestDto)
    : void {
    const index = this.todoLists.findIndex(todoList => todoList.todoListId === requestDto.todoListId);
    const todoList =  this.todoLists[index];

    todoList.title = requestDto.title;
    todoList.description = requestDto.description;
  }

  public deleteTodoList(
    requestDto: DeleteTodoListRequestDto)
    : void {
    const index = this.todoLists.findIndex(todoList => todoList.todoListId === requestDto.todoListId);

    if (index >= 0) {
      this.todoLists.splice(index, 1);
    }
  }
}
