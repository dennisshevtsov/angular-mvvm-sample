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
    return this.http.get<GetTodoListTaskResponseDto>(`${this.todoRoute}/${query.todoListId}/list/${query.todoListTaskId}`);
  }

  public searchTodoListTasks(
    query: SearchTodoListTasksRequestDto)
    : Observable<SearchTodoListTasksRecordResponseDto[]> {
    return this.http.get<SearchTodoListTasksRecordResponseDto[]>(`${this.todoRoute}/${query.todoListId}/list`);
  }

  public addTodoListTask(
    command: AddTodoListDayTaskRequestDto | AddTodoListPeriodTaskRequestDto)
    : Observable<AddTodoListTaskResponseDto> {
    const url  = `${this.todoRoute}/${command.todoListId}/list`;
    const body = JSON.stringify(command);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<AddTodoListTaskResponseDto>(url, body, options);
  }

  public updateTodoListTask(
    command: UpdateTodoListDayTaskRequestDto | UpdateTodoListPeriodTaskRequestDto)
    : Observable<void> {
      const url  = `${this.todoRoute}/${command.todoListId}/list/${command.todoListTaskId}`;
      const body = JSON.stringify(command);
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };

    return this.http.put<void>(url, body, options);
  }

  public completeTodoListTask(
    command: CompleteTodoListTaskRequestDto)
    : Observable<void> {
    const url  = `${this.todoRoute}/${command.todoListId}/list/${command.todoListTaskId}/complete`;
    const body = JSON.stringify(command);

    return this.http.post<void>(url, body);
  }

  public uncompleteTodoListTask(
    command: UncompleteTodoListTaskRequestDto)
    : Observable<void> {
    const url  = `${this.todoRoute}/${command.todoListId}/list/${command.todoListTaskId}/uncomplete`;
    const body = JSON.stringify(command);

    return this.http.post<void>(url, body);
  }

  public deleteTodoListTask(
    command: DeleteTodoListTaskRequestDto)
    : Observable<void> {
    const url  = `${this.todoRoute}/${command.todoListId}/list/${command.todoListTaskId}`;

    return this.http.delete<void>(url);
  }
}
