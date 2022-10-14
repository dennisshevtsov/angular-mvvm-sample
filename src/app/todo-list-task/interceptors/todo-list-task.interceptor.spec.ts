import { HttpHandler, HttpRequest, } from '@angular/common/http';

import { AddTodoListDayTaskRequestDto,
         AddTodoListPeriodTaskRequestDto, } from 'src/app/todo-list-task/api';
import { DAY_TASK, PERIOD_TASK,
         TodoListTaskInterceptor,         } from './todo-list-task.interceptor';

describe('TodoListTaskInterceptor', () => {
  it('intercept should keep original request', () => {
    const req : jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['clone'], ['body']);
    const next: jasmine.SpyObj<HttpHandler>      = jasmine.createSpyObj('HttpHandler', ['handle']);

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
      '2022-09-01T00:00:00');

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

  it('intercept should modify request for AddTodoListPeriodTaskRequestDto', () => {
    const req : jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['clone'], ['body']);
    const next: jasmine.SpyObj<HttpHandler>      = jasmine.createSpyObj('HttpHandler', ['handle']);

    const interceptor = new TodoListTaskInterceptor();

    req.clone.and.returnValue(req);

    const reqDescs = Object.getOwnPropertyDescriptors(req);
    const bodyPropSpy = reqDescs.body.get as jasmine.Spy<() => any>;

    const requestDto = new AddTodoListPeriodTaskRequestDto(
      'a7abc513-4154-48d2-8d00-ea9b36c878f9',
      'test title',
      'test description',
      '2022-09-01T12:00:00',
      '2022-09-01T13:00:00');

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
