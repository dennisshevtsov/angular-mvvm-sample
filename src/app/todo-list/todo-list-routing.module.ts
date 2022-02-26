import { Injector, NgModule,   } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { TodoListLinks,            } from 'src/app/core';
import { AddTodoListComponent,
         SearchTodoListsComponent,
         UpdateTodoListComponent,  } from './components';
import { TodoListRouteProvider,    } from './routing';

const options = {
  providers: [
    {
      provide: TodoListRouteProvider,
      deps: [ TodoListLinks ],
    },
    {
      provide: TodoListLinks,
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
