import { NgModule,             } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { SearchTodoListsComponent, } from './components';

const routes: Routes = [
  {
    path: 'todo',
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
