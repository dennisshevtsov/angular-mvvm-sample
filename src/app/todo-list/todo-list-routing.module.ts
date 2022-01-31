import { Injector, NgModule,   } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { AddTodoListComponent,
         SearchTodoListsComponent,
         UpdateTodoListComponent,  } from './components';
import { TodoListLinkProvider,
         TodoListRouteProvider,    } from './routing';

const options = {
  providers: [
    {
      provide: TodoListRouteProvider,
      deps: [ TodoListLinkProvider ],
    },
    {
      provide: TodoListLinkProvider,
      deps: [],
    },
  ],
}
const factory = Injector.create(options);

const routeProvider = factory.get(TodoListRouteProvider);

const routes: Routes = [
  {
    path: routeProvider.addTodoListRoute(),
    component: AddTodoListComponent,
  },
  {
    path: routeProvider.updateTodoListRoute(),
    component: UpdateTodoListComponent,
  },
  {
    path: routeProvider.searchTodoListsRoute(),
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
