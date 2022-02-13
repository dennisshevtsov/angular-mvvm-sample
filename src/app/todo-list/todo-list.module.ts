import { CommonModule,        } from '@angular/common';
import { NgModule,            } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';

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
    ReactiveFormsModule,

    CoreModule,
    TodoListRoutingModule,
  ],
})
export class TodoListModule { }
