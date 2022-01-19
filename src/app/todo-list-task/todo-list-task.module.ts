import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoListTaskComponent } from './components/add-todo-list-task/add-todo-list-task.component';
import { SearchTodoListTasksComponent } from './components/search-todo-list-tasks/search-todo-list-tasks.component';
import { UpdateTodoListTaskComponent } from './components/update-todo-list-task/update-todo-list-task.component';



@NgModule({
  declarations: [
    AddTodoListTaskComponent,
    SearchTodoListTasksComponent,
    UpdateTodoListTaskComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TodoListTaskModule { }
