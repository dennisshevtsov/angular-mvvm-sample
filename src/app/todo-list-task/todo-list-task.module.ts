import { CommonModule,         } from '@angular/common';
import { NgModule,             } from '@angular/core';
import { ReactiveFormsModule,  } from '@angular/forms';

import { CoreModule,                   } from '../core';
import { AddTodoListTaskComponent,
         SearchTodoListTasksComponent,
         TodoListTaskPeriodComponent,
         TodoListTaskComponent,
         UpdateTodoListTaskComponent,  } from './components';
import { httpInterceptorProviders,     } from './interceptors';
import { TodoListTaskTimePipe,         } from './pipes';
import { TodoListTaskRoutingModule,    } from './todo-list-task-routing.module';

@NgModule({
  declarations: [
    AddTodoListTaskComponent,
    SearchTodoListTasksComponent,
    TodoListTaskComponent,
    TodoListTaskPeriodComponent,
    TodoListTaskTimePipe,
    UpdateTodoListTaskComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CoreModule,
    TodoListTaskRoutingModule,
  ],
  providers: [ httpInterceptorProviders, ],
})
export class TodoListTaskModule { }
