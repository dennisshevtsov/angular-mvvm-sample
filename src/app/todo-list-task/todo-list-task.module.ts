import { CommonModule,         } from '@angular/common';
import { NgModule,             } from '@angular/core';
import { ReactiveFormsModule,  } from '@angular/forms';

import { CoreModule,                   } from '../core';
import { AddTodoListTaskComponent,
         SearchTodoListTasksComponent,
         TodoListTaskPeriodComponent,
         TodoListTaskComponent,
         UpdateTodoListTaskComponent,  } from './components';
import { TodoListTaskTimePipe,         } from './pipes';
import { TodoListTaskRoutingModule,    } from './todo-list-task-routing.module';
import { TodoListTaskPeriod2Component } from './components/todo-list-task-period2/todo-list-task-period2.component';

@NgModule({
  declarations: [
    AddTodoListTaskComponent,
    SearchTodoListTasksComponent,
    TodoListTaskPeriodComponent,
    TodoListTaskComponent,
    UpdateTodoListTaskComponent,
    TodoListTaskTimePipe,
    TodoListTaskPeriod2Component,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CoreModule,
    TodoListTaskRoutingModule,
  ]
})
export class TodoListTaskModule { }
