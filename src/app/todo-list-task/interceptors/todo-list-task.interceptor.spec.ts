import { HttpHandler, HttpRequest, } from '@angular/common/http';

import { TodoListTaskInterceptor, } from './todo-list-task.interceptor';

describe('TodoListTaskInterceptor', () => {
  it('intercept should update request body', () => {
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
});
