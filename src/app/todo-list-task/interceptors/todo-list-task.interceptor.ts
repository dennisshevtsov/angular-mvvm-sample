import { HttpEvent, HttpHandler,
         HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable,                   } from '@angular/core';

import { Observable, } from 'rxjs';

import { AddTodoListDayTaskRequestDto,
         AddTodoListPeriodTaskRequestDto,
         UpdateTodoListDayTaskRequestDto,
         UpdateTodoListPeriodTaskRequestDto, } from 'src/app/todo-list-task/api';

export const DAY_TASK    = 1;
export const PERIOD_TASK = 2;

@Injectable()
export class TodoListTaskInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.body instanceof AddTodoListDayTaskRequestDto ||
        req.body instanceof UpdateTodoListDayTaskRequestDto) {
      const { todoListId, ...body } = req.body;

      return next.handle(req.clone({
        body: {
          ...body,
          type: DAY_TASK,
        },
      }));
    } else if (req.body instanceof AddTodoListPeriodTaskRequestDto ||
               req.body instanceof UpdateTodoListPeriodTaskRequestDto) {
      const { todoListId, ...body } = req.body;

      return next.handle(req.clone({
        body: {
          ...body,
          type: PERIOD_TASK,
        },
      }));
    }

    return next.handle(req);
  }
}