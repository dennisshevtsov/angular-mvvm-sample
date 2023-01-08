import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { of } from 'rxjs';

import { AddTodoListDayTaskRequestDto       } from 'src/app/todo-list-task/api';
import { UpdateTodoListDayTaskRequestDto    } from 'src/app/todo-list-task/api';
import { UpdateTodoListPeriodTaskRequestDto } from 'src/app/todo-list-task/api';

import { DAY_TASK                } from './todo-list-task.interceptor';
import { PERIOD_TASK             } from './todo-list-task.interceptor';
import { TodoListTaskInterceptor } from './todo-list-task.interceptor';

describe('TodoListTaskInterceptor', () => {
  it('intercept should keep original request', () => {
    const req : jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['clone'], ['body']);
    const next: jasmine.SpyObj<HttpHandler>      = jasmine.createSpyObj('HttpHandler', ['handle']);

    next.handle.and.returnValue(of())

    const interceptor = new TodoListTaskInterceptor();

    const reqDescs = Object.getOwnPropertyDescriptors(req);
    const bodyPropSpy = reqDescs.body.get as jasmine.Spy<() => any>;

    bodyPropSpy.and.returnValue({});

    interceptor.intercept(req, next);

    expect(req.clone.calls.count())
      .withContext('req.clone should not be called')
      .toBe(0);

    expect(next.handle.calls.count())
      .withContext('next.handle should be called once')
      .toBe(1);

    expect(next.handle.calls.first().args[0])
      .withContext('next.handle should be called with original req')
      .toEqual(req);
  });

  it('intercept should modify request for AddTodoListDayTaskRequestDto', () => {
    const req : jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['clone'], ['body']);
    const next: jasmine.SpyObj<HttpHandler>      = jasmine.createSpyObj('HttpHandler', ['handle']);

    const interceptor = new TodoListTaskInterceptor();

    req.clone.and.returnValue(req);

    const reqDescs = Object.getOwnPropertyDescriptors(req);
    const bodyPropSpy = reqDescs.body.get as jasmine.Spy<() => any>;

    const requestDto = new AddTodoListDayTaskRequestDto(
      'a7abc513-4154-48d2-8d00-ea9b36c878f9',
      'test title',
      'test description',
      637975872000000000);

    bodyPropSpy.and.returnValue(requestDto);

    interceptor.intercept(req, next);

    expect(req.clone.calls.count())
      .withContext('req.clone should be called once')
      .toBe(1);

    expect(req.clone.calls.first().args[0])
      .withContext('req.clone should be called with modified body')
      .toEqual({
        body: {
          title: requestDto.title,
          description: requestDto.description,
          date: requestDto.date,
          type: DAY_TASK,
        },
      });

    expect(next.handle.calls.count())
      .withContext('next.handle should be called once')
      .toBe(1);

    expect(next.handle.calls.first().args[0])
      .withContext('next.handle should be called with modified req')
      .toEqual(req);
  });

  it('intercept should modify request for UpdateTodoListDayTaskRequestDto', () => {
    const req : jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['clone'], ['body']);
    const next: jasmine.SpyObj<HttpHandler>      = jasmine.createSpyObj('HttpHandler', ['handle']);

    const interceptor = new TodoListTaskInterceptor();

    req.clone.and.returnValue(req);

    const reqDescs = Object.getOwnPropertyDescriptors(req);
    const bodyPropSpy = reqDescs.body.get as jasmine.Spy<() => any>;

    const requestDto = new UpdateTodoListDayTaskRequestDto(
      'a7abc513-4154-48d2-8d00-ea9b36c878f9',
      'ba1e26c4-efe6-40a8-aa21-fa30e168174a',
      'test title',
      'test description',
      637975872000000000);

    bodyPropSpy.and.returnValue(requestDto);

    interceptor.intercept(req, next);

    expect(req.clone.calls.count())
      .withContext('req.clone should be called once')
      .toBe(1);

    expect(req.clone.calls.first().args[0])
      .withContext('req.clone should be called with modified body')
      .toEqual({
        body: {
          title: requestDto.title,
          description: requestDto.description,
          date: requestDto.date,
          type: DAY_TASK,
        },
      });

    expect(next.handle.calls.count())
      .withContext('next.handle should be called once')
      .toBe(1);

    expect(next.handle.calls.first().args[0])
      .withContext('next.handle should be called with modified req')
      .toEqual(req);
  });

  it('intercept should modify request for UpdateTodoListPeriodTaskRequestDto', () => {
    const req : jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['clone'], ['body']);
    const next: jasmine.SpyObj<HttpHandler>      = jasmine.createSpyObj('HttpHandler', ['handle']);

    const interceptor = new TodoListTaskInterceptor();

    req.clone.and.returnValue(req);

    const reqDescs = Object.getOwnPropertyDescriptors(req);
    const bodyPropSpy = reqDescs.body.get as jasmine.Spy<() => any>;

    const requestDto = new UpdateTodoListPeriodTaskRequestDto(
      'a7abc513-4154-48d2-8d00-ea9b36c878f9',
      '40f60662-10af-4dcf-8ca2-2b64726e8789',
      'test title',
      'test description',
      637976304000000000,
      637976340000000000);

    bodyPropSpy.and.returnValue(requestDto);

    interceptor.intercept(req, next);

    expect(req.clone.calls.count())
      .withContext('req.clone should be called once')
      .toBe(1);

    expect(req.clone.calls.first().args[0])
      .withContext('req.clone should be called with modified body')
      .toEqual({
        body: {
          title: requestDto.title,
          description: requestDto.description,
          begin: requestDto.begin,
          end: requestDto.end,
          type: PERIOD_TASK,
        },
      });

    expect(next.handle.calls.count())
      .withContext('next.handle should be called once')
      .toBe(1);

    expect(next.handle.calls.first().args[0])
      .withContext('next.handle should be called with modified req')
      .toEqual(req);
  });
});
