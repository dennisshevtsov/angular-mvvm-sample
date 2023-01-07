import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { Routes       } from '@angular/router';

import { convertToRoute               } from 'src/app/core';
import { TodoListLinks                } from 'src/app/core';
import { TODO_LIST_ROUTE_ID_PARAMETER } from 'src/app/core';

import { AddTodoListComponent     } from './components';
import { SearchTodoListsComponent } from './components';
import { UpdateTodoListComponent  } from './components';

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
