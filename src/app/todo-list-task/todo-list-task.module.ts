import { CommonModule,         } from '@angular/common';
import { NgModule,             } from '@angular/core';
import { ReactiveFormsModule,  } from '@angular/forms';

import { CoreModule,                   } from '../core';
import { TodoListNavigationModule,     } from '../todo-list-navigation';
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
    TodoListNavigationModule,
    TodoListTaskRoutingModule,
  ]
})
export class TodoListTaskModule { }
