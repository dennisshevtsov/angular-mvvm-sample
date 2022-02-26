import { CommonModule,        } from '@angular/common';
import { NgModule,            } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';

import { CoreModule,               } from '../core';
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
    ReactiveFormsModule,

    CoreModule,
    TodoListRoutingModule,
  ],
})
export class TodoListModule { }
