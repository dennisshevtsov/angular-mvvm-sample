import { CommonModule,         } from '@angular/common';
import { NgModule,             } from '@angular/core';
import { ReactiveFormsModule,  } from '@angular/forms';

import { CoreModule,                   } from '../core';
import { AddTodoListTaskComponent,
         SearchTodoListTasksComponent,
         UpdateTodoListTaskComponent,  } from './components';
import { TodoListTaskTimePipe,         } from './pipes';
import { TodoListTaskRoutingModule,    } from './todo-list-task-routing.module';

@NgModule({
  declarations: [
    AddTodoListTaskComponent,
    SearchTodoListTasksComponent,
    UpdateTodoListTaskComponent,
    TodoListTaskTimePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CoreModule,
    TodoListTaskRoutingModule,
  ]
})
export class TodoListTaskModule { }
