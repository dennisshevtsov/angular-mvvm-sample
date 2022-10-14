import { CommonModule,        } from '@angular/common';
import { HttpClientModule,    } from '@angular/common/http';
import { NgModule,            } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';

import { CoreModule,               } from 'src/app/core';
import { AddTodoListComponent,
         SearchTodoListsComponent,
         TodoListComponent,
         UpdateTodoListComponent,  } from './components';
import { httpInterceptorProviders, } from './interceptors';
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
  providers: [ httpInterceptorProviders, ],
})
export class TodoListModule { }
