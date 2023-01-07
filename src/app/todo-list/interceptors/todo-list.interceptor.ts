import { HttpEvent       } from '@angular/common/http';
import { HttpHandler     } from '@angular/common/http';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest     } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { UpdateTodoListRequestDto } from 'src/app/todo-list/api';

@Injectable()
export class TodoListInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.body instanceof UpdateTodoListRequestDto) {
      const { todoListId, ...body } = req.body;

      return next.handle(req.clone({
        body: body,
      }));
    }

    return next.handle(req);
  }
}
