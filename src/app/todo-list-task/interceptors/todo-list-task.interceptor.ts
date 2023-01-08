import { HttpEvent    } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';

import { HttpHandler     } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest     } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { map        } from 'rxjs';
import { Observable } from 'rxjs';

import { AddTodoListDayTaskRequestDto        } from 'src/app/todo-list-task/api';
import { AddTodoListPeriodTaskRequestDto     } from 'src/app/todo-list-task/api';
import { GetTodoListDayTaskResponseDto       } from 'src/app/todo-list-task/api';
import { GetTodoListPeriodTaskResponseDto    } from 'src/app/todo-list-task/api';
import { SearchTodoListDayTaskResponseDto    } from 'src/app/todo-list-task/api';
import { SearchTodoListPeriodTaskResponseDto } from 'src/app/todo-list-task/api';
import { UpdateTodoListDayTaskRequestDto     } from 'src/app/todo-list-task/api';
import { UpdateTodoListPeriodTaskRequestDto  } from 'src/app/todo-list-task/api';

export const DAY_TASK    = 1;
export const PERIOD_TASK = 2;

@Injectable()
export class TodoListTaskInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.body instanceof AddTodoListDayTaskRequestDto) {
      const { todoListId, ...body } = req.body;

      return next.handle(req.clone({
        body: {
          type: DAY_TASK,
          ...body,
        },
      }));
    }

    if (req.body instanceof UpdateTodoListDayTaskRequestDto) {
      const { todoListId, todoListTaskId, ...body } = req.body;

      return next.handle(req.clone({
        body: {
          type: DAY_TASK,
          ...body,
        },
      }));
    }

    if (req.body instanceof AddTodoListPeriodTaskRequestDto) {
      const { todoListId, ...body } = req.body;

      return next.handle(req.clone({
        body: {
          type: PERIOD_TASK,
          ...body,
        },
      }));
    }

    if (req.body instanceof UpdateTodoListPeriodTaskRequestDto) {
      const { todoListId, todoListTaskId, ...body } = req.body;

      return next.handle(req.clone({
        body: {
          type: PERIOD_TASK,
          ...body,
        },
      }));
    }

    return next.handle(req).pipe(map(event => {
      if (event instanceof HttpResponse && event.body) {
        if (Array.isArray(event.body) && event.body.length && event.body[0].type) {
          return event.clone({ body: this.mapSearchTodoListTasks(event.body)});
        }

        if (!Array.isArray(event.body) && event.body.type) {
          return event.clone({ body: this.mapGetTodoListTask(event.body)});
        }
      }

      return event;
    }));
  }

  private mapSearchTodoListTasks<T extends { type: any }>(response: T[])
  : (SearchTodoListDayTaskResponseDto | SearchTodoListPeriodTaskResponseDto)[] {
    const dtos = new Array<SearchTodoListDayTaskResponseDto | SearchTodoListPeriodTaskResponseDto>(response.length);

    for (let i = 0; i < response.length; i++) {
      if (response[i].type == DAY_TASK) {
        dtos[i] = Object.assign(new SearchTodoListDayTaskResponseDto(), response[i]);
      }
      else if (response[i].type == PERIOD_TASK) {
        dtos[i] = Object.assign(new SearchTodoListPeriodTaskResponseDto(), response[i]);
      }
      else {
        throw 'Incorrect response';
      }
    }

    return dtos;
  }

  private mapGetTodoListTask<T extends { type: any }>(response: T)
  : GetTodoListDayTaskResponseDto | GetTodoListPeriodTaskResponseDto {
    if (response.type == DAY_TASK) {
      return Object.assign(new GetTodoListDayTaskResponseDto(), response);
    }

    if (response.type == PERIOD_TASK) {
      return Object.assign(new GetTodoListPeriodTaskResponseDto(), response);
    }

    throw 'Incorrect response';
  }
}