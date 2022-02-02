import { Routes, } from '@angular/router';

import { TODO_LIST_ROUTE_ID_PARAMETER,      } from '../../todo-list/routing';
import { AddTodoListTaskComponent,
         SearchTodoListTasksComponent,
         UpdateTodoListTaskComponent,       } from '../components';
import { TodoListTaskLinkProvider,          } from './todo-list-task.link-provider';
import { TODO_LIST_TASK_ROUTE_ID_PARAMETER, } from './todo-list-task.routing-fragments';

const linkProvider = new TodoListTaskLinkProvider();

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
