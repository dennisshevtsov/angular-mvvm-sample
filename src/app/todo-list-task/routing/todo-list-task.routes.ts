import { Routes, } from '@angular/router';

import { TODO_LIST_ROUTE_ID_PARAMETER,
         TODO_LIST_TASK_ROUTE_ID_PARAMETER,
         TodoListTaskLinks,                 } from 'src/app/core';
import { AddTodoListTaskComponent,
         SearchTodoListTasksComponent,
         UpdateTodoListTaskComponent,       } from '../components';

const linkProvider = new TodoListTaskLinks();

export const TODO_LIST_TASK_ROUTES: Routes = [
  {
    path: linkProvider.searchTodoListTasksLink(`:${TODO_LIST_ROUTE_ID_PARAMETER}`)
                      .slice(1)
                      .join('/'),
    component: SearchTodoListTasksComponent,
  },
  {
    path: linkProvider.addTodoListTaskLink(`:${TODO_LIST_ROUTE_ID_PARAMETER}`)
                      .slice(1)
                      .join('/'),
    component: AddTodoListTaskComponent,
  },
  {
    path: linkProvider.updateTodoListTaskLink(`:${TODO_LIST_ROUTE_ID_PARAMETER}`,
                                              `:${TODO_LIST_TASK_ROUTE_ID_PARAMETER}`)
                      .slice(1)
                      .join('/'),
    component: UpdateTodoListTaskComponent,
  },
];
