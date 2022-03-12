import { Injectable, } from '@angular/core';

import { Observable, of, throwError, } from 'rxjs';

import { AddTodoListTaskRequestDto,
         AddTodoListTaskResponseDto,
         CompleteTodoListTaskRequestDto,
         DeleteTodoListTaskRequestDto,
         GetTodoListTaskRequestDto,
         GetTodoListTaskResponseDto,
         SearchTodoListTasksRecordResponseDto,
         SearchTodoListTasksRequestDto,
         UncompleteTodoListTaskRequestDto,
         UpdateTodoListTaskRequestDto,         } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class TodoListTaskService {
  private readonly todoListTasksMap : Map<number | string, {
    todoListTaskId: number | string,
    completed     : boolean,
    title         : string,
    description   : string,
    date: {
      day     : number,
      fullDay : boolean,
      start   : number,
      end     : number,
    },
  }[]> = new Map();

  public constructor() { }

  public getTodoListTask(
    query: GetTodoListTaskRequestDto)
    : GetTodoListTaskResponseDto | null {
    const todoListTasks = this.todoListTasksMap.get(query.todoListId);

    if (todoListTasks) {
      const todoListTaskIndex = todoListTasks.findIndex(
        todoListTask => todoListTask.todoListTaskId === query.todoListTaskId);

      if (todoListTaskIndex > -1) {
        const todoListTask = todoListTasks[todoListTaskIndex];

        return { ...todoListTask };
      }
    }

    return null;
  }

  public searchTodoListTasks(
    query: SearchTodoListTasksRequestDto)
    : Observable<SearchTodoListTasksRecordResponseDto[]> {
    const todoListTasks = this.todoListTasksMap.get(query.todoListId);

    if (todoListTasks) {
      return of(todoListTasks.map(todoListTask => new SearchTodoListTasksRecordResponseDto(
        todoListTask.todoListTaskId,
        todoListTask.completed,
        todoListTask.title,
        todoListTask.description,
        { ...todoListTask.date, },
      )));
    }

    return of([]);
  }

  public addTodoListTask(
    command: AddTodoListTaskRequestDto)
    : Observable<AddTodoListTaskResponseDto> {
    if (!this.todoListTasksMap.has(command.todoListId)) {
      this.todoListTasksMap.set(command.todoListId, []);
    }

    const todoListTasks = this.todoListTasksMap.get(command.todoListId)!;
    const todoListTaskId = todoListTasks.length + 1;

    todoListTasks.push({
      todoListTaskId: todoListTaskId,
      completed: false,
      title: command.title,
      description: command.description,
      date: { ...command.date, },
    });

    return of(new AddTodoListTaskResponseDto(todoListTaskId));
  }

  public updateTodoListTask(
    command: UpdateTodoListTaskRequestDto)
    : void {
    const todoListTasks = this.todoListTasksMap.get(command.todoListId)!;
    const todoListTaskIndex = todoListTasks.findIndex(todoListTask => todoListTask.todoListTaskId === command.todoListTaskId);

    if (todoListTaskIndex > -1) {
      const todoListTask = todoListTasks[todoListTaskIndex];

      todoListTask.title = command.title;
      todoListTask.description = command.description;
      todoListTask.date = { ...command.date, };
    }
  }

  public completeTodoListTask(
    command: CompleteTodoListTaskRequestDto)
    : Observable<void> {
    const todoListTasks = this.todoListTasksMap.get(
      command.todoListId)!;

    if (todoListTasks) {
      const todoListTaskIndex = todoListTasks.findIndex(
        todoListTask => todoListTask.todoListTaskId === command.todoListTaskId);

      if (todoListTaskIndex > -1) {
        const todoListTask = todoListTasks[todoListTaskIndex];

        todoListTask.completed = true;

        return throwError(() => new Error('There is no TODO list task with such ID.'));
      }
    }
    else {
      return throwError(() => new Error('There is no TODO list with such ID.'));
    }

    return of();
  }

  public uncompleteTodoListTask(
    command: UncompleteTodoListTaskRequestDto)
    : void {
    const todoListTasks = this.todoListTasksMap.get(
      command.todoListId)!;

    if (todoListTasks) {
      const todoListTaskIndex = todoListTasks.findIndex(
        todoListTask => todoListTask.todoListTaskId === command.todoListTaskId);

      if (todoListTaskIndex > -1) {
        const todoListTask = todoListTasks[todoListTaskIndex];

        todoListTask.completed = false;
      }
    }
  }

  public deleteTodoListTask(
    command: DeleteTodoListTaskRequestDto)
    : void {
      const todoListTasks = this.todoListTasksMap.get(
        command.todoListId)!;

      if (todoListTasks) {
        const todoListTaskIndex = todoListTasks.findIndex(
          todoListTask => todoListTask.todoListTaskId === command.todoListTaskId);

        if (todoListTaskIndex > -1) {
          todoListTasks.splice(todoListTaskIndex, 1);
        }
      }
  }
}
