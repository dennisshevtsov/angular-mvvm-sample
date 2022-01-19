import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoListTaskComponent } from './components/add-todo-list-task/add-todo-list-task.component';
import { SearchTodoListTasksComponent } from './components/search-todo-list-tasks/search-todo-list-tasks.component';



@NgModule({
  declarations: [
    AddTodoListTaskComponent,
    SearchTodoListTasksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TodoListTaskModule { }
