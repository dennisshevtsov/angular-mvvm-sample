import { NgModule,     } from '@angular/core';
import { CommonModule, } from '@angular/common';

import { AddTodoListComponent,
         SearchTodoListsComponent,
         UpdateTodoListComponent,  } from './components';

@NgModule({
  declarations: [
    AddTodoListComponent,
    SearchTodoListsComponent,
    UpdateTodoListComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class TodoListModule { }
