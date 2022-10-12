import { HttpHandler, HttpRequest, } from '@angular/common/http';

import { TodoListTaskInterceptor, } from './todo-list-task.interceptor';

describe('TodoListTaskInterceptor', () => {
  it('intercept', () => {
    const req : jasmine.SpyObj<HttpRequest<any>> = jasmine.createSpyObj('HttpRequest', [], ['body']);
    const next: jasmine.SpyObj<HttpHandler>      = jasmine.createSpyObj('HttpHandler', ['handle']);

    const interceptor = new TodoListTaskInterceptor();

    interceptor.intercept(req, next);
  });
});
