import { HTTP_INTERCEPTORS, } from '@angular/common/http';

import { TodoListInterceptor, } from './todo-list.interceptor';

export const httpInterceptorProviders = [
  {
    provide : HTTP_INTERCEPTORS,
    useClass: TodoListInterceptor,
    multi   : true,
  },
];
