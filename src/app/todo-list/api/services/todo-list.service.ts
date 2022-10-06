import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable,              } from '@angular/core';

import { Observable, } from 'rxjs';

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
  private readonly todoListRoute: string = 'http://localhost:5295/api/todo-list';

  public constructor(
    private readonly http: HttpClient,
  ) {}

  public getTodoList(
    requestDto: GetTodoListRequestDto)
    : Observable<GetTodoListResponseDto> {
    return this.http.get<GetTodoListResponseDto>(`${this.todoListRoute}/${requestDto.todoListId}`);
  }

  public searchTodoList(
    requestDto: SearchTodoListsRequestDto)
    : Observable<SearchTodoListsRecordResponseDto[]> {
    return this.http.get<SearchTodoListsRecordResponseDto[]>(this.todoListRoute);
  }

  public addTodoList(
    requestDto: AddTodoListRequestDto)
    : Observable<AddTodoListResponseDto> {
    const url     = this.todoListRoute;
    const body    = JSON.stringify(requestDto);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<AddTodoListResponseDto>(url, body, options);
  }

  public updateTodoList(
    requestDto: UpdateTodoListRequestDto)
    : Observable<void> {
      const url     = `${this.todoListRoute}/${requestDto.todoListId}`;
      const body    = JSON.stringify(requestDto);
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      };
  
      return this.http.put<void>(url, body, options);
  }

  public deleteTodoList(
    requestDto: DeleteTodoListRequestDto)
    : Observable<void> {
    return this.http.delete<void>(`${this.todoListRoute}/${requestDto.todoListId}`);
  }
}
