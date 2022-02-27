import { NgModule,             } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { TodoListLinks,
         TODO_LIST_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { AddTodoListComponent,
         SearchTodoListsComponent,
         UpdateTodoListComponent,      } from './components';

function convertToRoute(link: Array<any>): string {
  return link.slice(1).join('/');
}

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
