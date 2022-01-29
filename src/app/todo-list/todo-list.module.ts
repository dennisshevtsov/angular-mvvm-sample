import { NgModule,     } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { AddTodoListComponent,
         SearchTodoListsComponent,
         UpdateTodoListComponent,  } from './components';
import { TodoListRoutingModule,    } from './todo-list-routing.module';

@NgModule({
  declarations: [
    AddTodoListComponent,
    SearchTodoListsComponent,
    UpdateTodoListComponent,
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
  ],
})
export class TodoListModule { }
