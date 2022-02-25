import { CommonModule,        } from '@angular/common';
import { NgModule,            } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';

import { AddTodoListComponent,
         SearchTodoListsComponent,
         UpdateTodoListComponent,  } from './components';
import { TodoListRoutingModule,    } from './todo-list-routing.module';
import { CoreModule,               } from '../core';
import { TodoListNavigationModule, } from '../todo-list-navigation';

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
    TodoListNavigationModule,
    TodoListRoutingModule,
  ],
})
export class TodoListModule { }
