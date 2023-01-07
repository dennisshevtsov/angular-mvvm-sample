import { HttpClient  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Inject     } from '@angular/core';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AppSettings  } from 'src/app/core/settings';
import { APP_SETTINGS } from 'src/app/core/settings';

import { AddTodoListRequestDto            } from 'src/app/todo-list/api/dtos';
import { AddTodoListResponseDto           } from 'src/app/todo-list/api/dtos';
import { DeleteTodoListRequestDto         } from 'src/app/todo-list/api/dtos';
import { GetTodoListRequestDto            } from 'src/app/todo-list/api/dtos';
import { GetTodoListResponseDto           } from 'src/app/todo-list/api/dtos';
import { UpdateTodoListRequestDto         } from 'src/app/todo-list/api/dtos';
import { SearchTodoListsRecordResponseDto } from 'src/app/todo-list/api/dtos';
import { SearchTodoListsRequestDto        } from 'src/app/todo-list/api/dtos';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private readonly todoListRoute: string;

  public constructor(
    @Inject(APP_SETTINGS)
    settings: AppSettings,

    private readonly http: HttpClient,
  ) {
    this.todoListRoute = settings.apiServer + '/todo-list';
  }

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
