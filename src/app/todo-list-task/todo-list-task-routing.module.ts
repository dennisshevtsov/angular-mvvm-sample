import { NgModule,             } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { SearchTodoListTasksComponent, } from './components';

const routes: Routes = [
  {
    path: 'task',
    component: SearchTodoListTasksComponent,
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
