import { NgModule,     } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { AddTodoListTaskComponent,
         SearchTodoListTasksComponent,
         UpdateTodoListTaskComponent,  } from './components';
import { CoreModule,                   } from '../core';
import { TodoListTaskRoutingModule } from './todo-list-task-routing.module';

@NgModule({
  declarations: [
    AddTodoListTaskComponent,
    SearchTodoListTasksComponent,
    UpdateTodoListTaskComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    TodoListTaskRoutingModule,
  ]
})
export class TodoListTaskModule { }
