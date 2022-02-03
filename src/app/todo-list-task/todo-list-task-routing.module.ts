import { NgModule,     } from '@angular/core';
import { RouterModule, } from '@angular/router';

import { TODO_LIST_TASK_ROUTES } from './routing/todo-list-task.routes';

@NgModule({
  imports: [
    RouterModule.forChild(TODO_LIST_TASK_ROUTES),
  ],
  exports: [
    RouterModule,
  ],
})
export class TodoListRoutingModule { }
