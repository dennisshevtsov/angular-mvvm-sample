import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable,              } from '@angular/core';

import { Observable, } from 'rxjs';

import { AddTodoListDayTaskRequestDto,
         AddTodoListPeriodTaskRequestDto,
         AddTodoListTaskResponseDto,
         CompleteTodoListTaskRequestDto,
         DeleteTodoListTaskRequestDto,
         GetTodoListTaskRequestDto,
         GetTodoListTaskResponseDto,
         SearchTodoListTasksRecordResponseDto,
         SearchTodoListTasksRequestDto,
         UncompleteTodoListTaskRequestDto,
         UpdateTodoListDayTaskRequestDto,
         UpdateTodoListPeriodTaskRequestDto,   } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class TodoListTaskService {
  private readonly todoRoute: string = 'http://localhost:5295/api/todo-list';

  public constructor(
    private readonly http: HttpClient,
  ) { }

  public getTodoListTask(
    query: GetTodoListTaskRequestDto)
    : Observable<GetTodoListTaskResponseDto> {
    return this.http.get<GetTodoListTaskResponseDto>(`${this.todoRoute}/${query.todoListId}/task/${query.todoListTaskId}`);
  }

  public searchTodoListTasks(
    query: SearchTodoListTasksRequestDto)
    : Observable<SearchTodoListTasksRecordResponseDto[]> {
    return this.http.get<SearchTodoListTasksRecordResponseDto[]>(`${this.todoRoute}/${query.todoListId}/task`);
  }

  public addTodoListTask(
    command: AddTodoListDayTaskRequestDto | AddTodoListPeriodTaskRequestDto)
    : Observable<AddTodoListTaskResponseDto> {
    const url  = `${this.todoRoute}/${command.todoListId}/task`;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<AddTodoListTaskResponseDto>(url, command, options);
  }

  public updateTodoListTask(
    command: UpdateTodoListDayTaskRequestDto | UpdateTodoListPeriodTaskRequestDto)
    : Observable<void> {
      const url  = `${this.todoRoute}/${command.todoListId}/task/${command.todoListTaskId}`;
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

    return this.http.put<void>(url, command, options);
  }

  public completeTodoListTask(
    command: CompleteTodoListTaskRequestDto)
    : Observable<void> {
    return this.http.post<void>(`${this.todoRoute}/${command.todoListId}/task/${command.todoListTaskId}/complete`, null);
  }

  public uncompleteTodoListTask(
    command: UncompleteTodoListTaskRequestDto)
    : Observable<void> {
    return this.http.post<void>(`${this.todoRoute}/${command.todoListId}/task/${command.todoListTaskId}/uncomplete`, null);
  }

  public deleteTodoListTask(
    command: DeleteTodoListTaskRequestDto)
    : Observable<void> {
    return this.http.delete<void>(`${this.todoRoute}/${command.todoListId}/task/${command.todoListTaskId}`);
  }
}
