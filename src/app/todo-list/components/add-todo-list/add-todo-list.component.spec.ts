import { TestBed, } from '@angular/core/testing';
import { TodoListLinks, TodoListNavigator } from 'src/app/core';

import { AddTodoListComponent, } from './add-todo-list.component';
import { AddTodoListViewModel, } from './add-todo-list.view-model';

describe('AddTodoListComponent', () => {
  let component: AddTodoListComponent;

  let vm       : jasmine.SpyObj<AddTodoListViewModel>;
  let links    : jasmine.SpyObj<TodoListLinks>;
  let navigator: jasmine.SpyObj<TodoListNavigator>;
  
  beforeEach(() => {
    vm = jasmine.createSpyObj(
      'AddTodoListViewModel',
      {
        'todoListId': undefined,
        'todoList'  : undefined,
        'add'       : undefined,
      });
  
    links = jasmine.createSpyObj(
      'TodoListLinks',
      {
        'addTodoListLink'    : undefined,
        'updateTodoListLink' : undefined,
        'searchTodoListsLink': undefined,
      });
  
    navigator =  jasmine.createSpyObj(
      'TodoListNavigator',
      {
        'navigateToUpdateTodoList': undefined,
      });
  
    TestBed.configureTestingModule({
      declarations: [
        AddTodoListComponent,
      ],
      providers: [
        {
          provide: AddTodoListViewModel,
          useValue: vm,
        },
        {
          provide: TodoListLinks,
          useValue: links,
        },
        {
          provide: TodoListNavigator,
          useValue: navigator,
        },
      ],
    });
  
    const fixture = TestBed.createComponent(AddTodoListComponent);
  
    component = fixture.componentInstance;
  });
});
