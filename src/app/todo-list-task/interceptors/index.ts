import { HTTP_INTERCEPTORS, } from '@angular/common/http';

import { TodoListTaskInterceptor, } from './todo-list-task.interceptor';

export const httpInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass: TodoListTaskInterceptor,
    multi   : true,
  },
];