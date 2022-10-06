import { CommonModule,        } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule,            } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';

import { CoreModule,               } from '../core';
import { AddTodoListComponent,
         SearchTodoListsComponent,
         TodoListComponent,
         UpdateTodoListComponent,  } from './components';
import { TodoListRoutingModule,    } from './todo-list-routing.module';

@NgModule({
  declarations: [
    AddTodoListComponent,
    SearchTodoListsComponent,
    UpdateTodoListComponent,
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CoreModule,
    HttpClientModule,
    TodoListRoutingModule,
  ],
})
export class TodoListModule { }
