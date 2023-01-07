import { HttpHandler } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

import { UpdateTodoListRequestDto } from 'src/app/todo-list/api';
import { TodoListInterceptor      } from './todo-list.interceptor';

describe('TodoListInterceptor', () => {
  it('intercept should keep original request', () => {
    const req : jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['clone'], ['body']);
    const next: jasmine.SpyObj<HttpHandler>      = jasmine.createSpyObj('HttpHandler', ['handle']);

    const interceptor = new TodoListInterceptor();

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

  it('intercept should modify request for UpdateTodoListRequestDto', () => {
    const req : jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', ['clone'], ['body']);
    const next: jasmine.SpyObj<HttpHandler>      = jasmine.createSpyObj('HttpHandler', ['handle']);

    const interceptor = new TodoListInterceptor();

    req.clone.and.returnValue(req);

    const reqDescs = Object.getOwnPropertyDescriptors(req);
    const bodyPropSpy = reqDescs.body.get as jasmine.Spy<() => any>;

    const requestDto = new UpdateTodoListRequestDto(
      'a7abc513-4154-48d2-8d00-ea9b36c878f9',
      'test title',
      'test description');

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
