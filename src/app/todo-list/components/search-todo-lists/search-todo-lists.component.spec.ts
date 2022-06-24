import { ComponentFixture, inject, TestBed, } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { CoreModule, TodoListLinks,
         TodoListTaskLinks,                } from 'src/app/core';
import { SearchTodoListsComponent,         } from './search-todo-lists.component';
import { SearchTodoListsViewModel,         } from './search-todo-lists.view-model';

describe('SearchTodoListsComponent', () => {
  let vm               : jasmine.SpyObj<SearchTodoListsViewModel>;
  let todoListLinks    : jasmine.SpyObj<TodoListLinks>;
  let todoListTaskLinks: jasmine.SpyObj<TodoListTaskLinks>;

  let fixture: ComponentFixture<SearchTodoListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchTodoListsComponent,
      ],
      imports: [
        CoreModule,
        RouterModule.forRoot([]),
      ],
    });

    vm = jasmine.createSpyObj(
      SearchTodoListsViewModel,
      [
        'search',
        'delete',
      ]);

    vm.search.and.returnValue(of(void 0));

    TestBed.overrideProvider(
      SearchTodoListsViewModel,
      {
        useValue: vm,
      });

    todoListLinks = jasmine.createSpyObj(
      TodoListLinks,
      [
        'addTodoListLink',
        'updateTodoListLink',
        'searchTodoListsLink',
      ]);

    todoListLinks.searchTodoListsLink.and.returnValue([]);

    TestBed.overrideProvider(
      TodoListLinks,
      {
        useValue: todoListLinks,
      });

    todoListTaskLinks = jasmine.createSpyObj(
      TodoListTaskLinks,
      [
        'searchTodoListTasksLink',
      ]);

    TestBed.overrideProvider(
      TodoListTaskLinks,
      {
        useValue: todoListTaskLinks,
      });

    fixture = TestBed.createComponent(SearchTodoListsComponent);
    fixture.detectChanges();
  });
});
