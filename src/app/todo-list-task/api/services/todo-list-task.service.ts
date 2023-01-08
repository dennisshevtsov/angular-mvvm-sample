import { HttpClient  } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Inject     } from '@angular/core';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AppSettings  } from 'src/app/core';
import { APP_SETTINGS } from 'src/app/core';

import { AddTodoListDayTaskRequestDto        } from '../dtos';
import { AddTodoListPeriodTaskRequestDto     } from '../dtos';
import { AddTodoListTaskResponseDto          } from '../dtos';
import { CompleteTodoListTaskRequestDto      } from '../dtos';
import { DeleteTodoListTaskRequestDto        } from '../dtos';
import { GetTodoListDayTaskResponseDto       } from '../dtos';
import { GetTodoListPeriodTaskResponseDto    } from '../dtos';
import { GetTodoListTaskRequestDto           } from '../dtos';
import { SearchTodoListDayTaskResponseDto    } from '../dtos';
import { SearchTodoListPeriodTaskResponseDto } from '../dtos';
import { SearchTodoListTasksRequestDto       } from '../dtos';
import { UncompleteTodoListTaskRequestDto    } from '../dtos';
import { UpdateTodoListDayTaskRequestDto     } from '../dtos';
import { UpdateTodoListPeriodTaskRequestDto  } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class TodoListTaskService {
  private readonly todoListRoute: string;

  public constructor(
    @Inject(APP_SETTINGS)
    settings: AppSettings,

    private readonly http: HttpClient,
  ) {
    this.todoListRoute = settings.apiServer + '/todo-list';
  }

  public getTodoListTask(
    query: GetTodoListTaskRequestDto)
    : Observable<GetTodoListDayTaskResponseDto | GetTodoListPeriodTaskResponseDto> {
    return this.http.get<GetTodoListDayTaskResponseDto | GetTodoListPeriodTaskResponseDto>(
      `${this.todoListRoute}/${query.todoListId}/task/${query.todoListTaskId}`);
  }

  public searchTodoListTasks(
    query: SearchTodoListTasksRequestDto)
    : Observable<(SearchTodoListDayTaskResponseDto | SearchTodoListPeriodTaskResponseDto)[]> {
    return this.http.get<(SearchTodoListDayTaskResponseDto | SearchTodoListPeriodTaskResponseDto)[]>(
      `${this.todoListRoute}/${query.todoListId}/task`);
  }

  public addTodoListTask(
    command: AddTodoListDayTaskRequestDto | AddTodoListPeriodTaskRequestDto)
    : Observable<AddTodoListTaskResponseDto> {
    const url  = `${this.todoListRoute}/${command.todoListId}/task`;
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
      const url  = `${this.todoListRoute}/${command.todoListId}/task/${command.todoListTaskId}`;
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
    return this.http.post<void>(`${this.todoListRoute}/${command.todoListId}/task/${command.todoListTaskId}/complete`, null);
  }

  public uncompleteTodoListTask(
    command: UncompleteTodoListTaskRequestDto)
    : Observable<void> {
    return this.http.post<void>(`${this.todoListRoute}/${command.todoListId}/task/${command.todoListTaskId}/uncomplete`, null);
  }

  public deleteTodoListTask(
    command: DeleteTodoListTaskRequestDto)
    : Observable<void> {
    return this.http.delete<void>(`${this.todoListRoute}/${command.todoListId}/task/${command.todoListTaskId}`);
  }
}
