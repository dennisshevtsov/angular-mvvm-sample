import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable,              } from '@angular/core';

import { map, Observable, } from 'rxjs';

import { DAY_TASK,                             } from '../../interceptors/todo-list-task.interceptor';
import { AddTodoListDayTaskRequestDto,
         AddTodoListPeriodTaskRequestDto,
         AddTodoListTaskResponseDto,
         CompleteTodoListTaskRequestDto,
         DeleteTodoListTaskRequestDto,
         GetTodoListTaskRequestDto,
         GetTodoListTaskResponseDto,
         SearchTodoListDayTaskResponseDto,
         SearchTodoListPeriodTaskResponseDto,
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
    : Observable<(SearchTodoListDayTaskResponseDto | SearchTodoListPeriodTaskResponseDto)[]> {
    return this.http.get<any[]>(`${this.todoRoute}/${query.todoListId}/task`)
                    .pipe(map(reponse => {
                      const dtos = new Array<SearchTodoListDayTaskResponseDto | SearchTodoListPeriodTaskResponseDto>(reponse.length);

                      for (let i = 0; i < reponse.length; i++) {
                        if (reponse[i].type == DAY_TASK) {
                          dtos[i] = Object.assign(new SearchTodoListDayTaskResponseDto(), reponse[i]);
                        }
                        else {
                          dtos[i] = Object.assign(new SearchTodoListPeriodTaskResponseDto(), reponse[i]);
                        }
                      }

                      return dtos;
                    }));
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
