import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Routes       } from '@angular/router';

import { convertToRoute                    } from 'src/app/core';
import { TodoListTaskLinks                 } from 'src/app/core';
import { TODO_LIST_ROUTE_ID_PARAMETER      } from 'src/app/core';
import { TODO_LIST_TASK_ROUTE_ID_PARAMETER } from 'src/app/core';

import { AddTodoListTaskComponent     } from './components';
import { SearchTodoListTasksComponent } from './components';
import { UpdateTodoListTaskComponent  } from './components';

const links = new TodoListTaskLinks();

const routes: Routes = [
  {
    path: convertToRoute(
      links.searchTodoListTasksLink(`:${TODO_LIST_ROUTE_ID_PARAMETER}`)),
    component: SearchTodoListTasksComponent,
  },
  {
    path: convertToRoute(
      links.addTodoListTaskLink(`:${TODO_LIST_ROUTE_ID_PARAMETER}`)),
    component: AddTodoListTaskComponent,
  },
  {
    path: convertToRoute(
      links.updateTodoListTaskLink(
        `:${TODO_LIST_ROUTE_ID_PARAMETER}`,
        `:${TODO_LIST_TASK_ROUTE_ID_PARAMETER}`)),
    component: UpdateTodoListTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListTaskRoutingModule { }
