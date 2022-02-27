import { NgModule,             } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { convertToRoute, TodoListLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,  } from 'src/app/core';
import { AddTodoListComponent,
         SearchTodoListsComponent,
         UpdateTodoListComponent,       } from './components';

const links = new TodoListLinks();

const routes: Routes = [
  {
    path: convertToRoute(links.addTodoListLink()),
    component: AddTodoListComponent,
  },
  {
    path: convertToRoute(links.updateTodoListLink(`:${TODO_LIST_ROUTE_ID_PARAMETER}`)),
    component: UpdateTodoListComponent,
  },
  {
    path: convertToRoute(links.searchTodoListsLink()),
    component: SearchTodoListsComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TodoListRoutingModule { }
