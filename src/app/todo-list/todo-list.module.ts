import { NgModule,     } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { AddTodoListComponent,
         SearchTodoListsComponent,
         UpdateTodoListComponent,  } from './components';
import { TodoListRoutingModule,    } from './todo-list-routing.module';
import { CoreModule,               } from '../core';

@NgModule({
  declarations: [
    AddTodoListComponent,
    SearchTodoListsComponent,
    UpdateTodoListComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    TodoListRoutingModule,
  ],
})
export class TodoListModule { }
