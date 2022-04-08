import { CommonModule,         } from '@angular/common';
import { NgModule,             } from '@angular/core';
import { ReactiveFormsModule,  } from '@angular/forms';

import { CoreModule,                   } from '../core';
import { AddTodoListTaskComponent,
         SearchTodoListTasksComponent,
         UpdateTodoListTaskComponent,  } from './components';
import { TodoListTaskTimePipe,         } from './pipes';
import { TodoListTaskRoutingModule,    } from './todo-list-task-routing.module';
import { TodoListTaskPeriodComponent } from './components/todo-list-task-period/todo-list-task-period.component';
import { TodoListTaskComponent } from './components/todo-list-task/todo-list-task.component';

@NgModule({
  declarations: [
    AddTodoListTaskComponent,
    SearchTodoListTasksComponent,
    UpdateTodoListTaskComponent,
    TodoListTaskTimePipe,
    TodoListTaskPeriodComponent,
    TodoListTaskComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CoreModule,
    TodoListTaskRoutingModule,
  ]
})
export class TodoListTaskModule { }
