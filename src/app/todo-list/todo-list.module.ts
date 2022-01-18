import { NgModule,     } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { AddTodoListComponent } from './components/add-todo-list/add-todo-list.component';

@NgModule({
  declarations: [
    AddTodoListComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class TodoListModule { }
