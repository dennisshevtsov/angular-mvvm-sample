import { NgModule,     } from '@angular/core';
import { RouterModule, } from '@angular/router';

import { TODO_LIST_TASK_ROUTES } from './routing';

@NgModule({
  imports: [
    RouterModule.forChild(TODO_LIST_TASK_ROUTES),
  ],
  exports: [
    RouterModule,
  ],
})
export class TodoListRoutingModule { }
