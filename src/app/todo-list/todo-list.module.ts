import { NgModule,     } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { AddTodoListComponent } from './components/add-todo-list/add-todo-list.component';
import { SearchTodoListsComponent } from './components/search-todo-lists/search-todo-lists.component';
import { UpdateTodoListComponent } from './components/update-todo-list/update-todo-list.component';

@NgModule({
  declarations: [
    AddTodoListComponent,
    SearchTodoListsComponent,
    UpdateTodoListComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class TodoListModule { }
