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
      day    : number,
      fullDay: boolean,
      start  : number,
      end    : number,
    },
  }[]> = new Map();

  public constructor() { }

  public getTodoListTask(
    query: GetTodoListTaskRequestDto)
    : Observable<GetTodoListTaskResponseDto> {
    const todoListTasks = this.todoListTasksMap.get(query.todoListId);

    if (todoListTasks) {
      const todoListTaskIndex = todoListTasks.findIndex(
        todoListTask => todoListTask.todoListTaskId == query.todoListTaskId);

      if (todoListTaskIndex > -1) {
        const todoListTask = todoListTasks[todoListTaskIndex];

        return of({ ...todoListTask });
      }
    }

    return throwError(() => new Error('The TODO list task is not found.'));
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
    const newTodoListTaskId = this.getNewTodoListTaskId(todoListTasks);

    todoListTasks.push({
      todoListTaskId: newTodoListTaskId,
      completed: false,
      title: command.title,
      description: command.description,
      date: { ...command.date, },
    });

    return of(new AddTodoListTaskResponseDto(newTodoListTaskId));
  }

  public updateTodoListTask(
    command: UpdateTodoListTaskRequestDto)
    : Observable<void> {
    const todoListTasks = this.todoListTasksMap.get(command.todoListId)!;
    const todoListTaskIndex = todoListTasks.findIndex(todoListTask => todoListTask.todoListTaskId == command.todoListTaskId);

    if (todoListTaskIndex > -1) {
      const todoListTask = todoListTasks[todoListTaskIndex];

      todoListTask.title = command.title;
      todoListTask.description = command.description;
      todoListTask.date = { ...command.date, };
    }

    return of();
  }

  public completeTodoListTask(
    command: CompleteTodoListTaskRequestDto)
    : Observable<void> {
    const todoListTasks = this.todoListTasksMap.get(
      command.todoListId)!;

    if (todoListTasks) {
      const todoListTaskIndex = todoListTasks.findIndex(
        todoListTask => todoListTask.todoListTaskId == command.todoListTaskId);

      if (todoListTaskIndex > -1) {
        const todoListTask = todoListTasks[todoListTaskIndex];

        todoListTask.completed = true;
      }
      else {
        return throwError(() => new Error('There is no TODO list task with such ID.'));
      }
    }
    else {
      return throwError(() => new Error('There is no TODO list with such ID.'));
    }

    return of(void 0);
  }

  public uncompleteTodoListTask(
    command: UncompleteTodoListTaskRequestDto)
    : Observable<void> {
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

    return of(void 0);
  }

  public deleteTodoListTask(
    command: DeleteTodoListTaskRequestDto)
    : Observable<void> {
      const todoListTasks = this.todoListTasksMap.get(
        command.todoListId);

      if (todoListTasks) {
        const todoListTaskIndex = todoListTasks.findIndex(
          todoListTask => todoListTask.todoListTaskId == command.todoListTaskId);

        if (todoListTaskIndex > -1) {
          const newTodoListTasks = todoListTasks.splice(todoListTaskIndex, 1);

          this.todoListTasksMap.set(command.todoListId, newTodoListTasks);
        }
      }

      return of(void 0);
  }

  private getNewTodoListTaskId(
    todoListTasks: {
      todoListTaskId: number | string,
      completed     : boolean,
      title         : string,
      description   : string,
      date: {
        day    : number,
        fullDay: boolean,
        start  : number,
        end    : number,
      },
    }[]) {
    let todoListTaskId = 0;

    if (todoListTasks.length > 0) {
      const lastTodoListTask = todoListTasks[todoListTasks.length - 1];

      todoListTaskId = +lastTodoListTask.todoListTaskId + 1;
    }

    return todoListTaskId;
  }
}
