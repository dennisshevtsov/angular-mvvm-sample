import { HttpEvent, HttpHandler,
         HttpInterceptor, HttpRequest, } from '@angular/common/http';
import { Injectable,                   } from '@angular/core';

import { Observable, } from 'rxjs';

import { AddTodoListDayTaskRequestDto,
         AddTodoListPeriodTaskRequestDto,
         UpdateTodoListDayTaskRequestDto,
         UpdateTodoListPeriodTaskRequestDto, } from '../api';

@Injectable()
export class TodoListTaskInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.body instanceof AddTodoListDayTaskRequestDto ||
        req.body instanceof UpdateTodoListDayTaskRequestDto) {
      return next.handle(req.clone({
        body: {
          ...req.body,
          type: 1,
        }
      }));
    } else if (req.body instanceof AddTodoListPeriodTaskRequestDto ||
               req.body instanceof UpdateTodoListPeriodTaskRequestDto) {
      return next.handle(req.clone({
        body: {
          ...req.body,
          type: 1,
        }
      }));
    }

    return next.handle(req);
  }
}