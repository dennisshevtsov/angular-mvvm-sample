import { inject  } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { AddTodoListResponseDto } from 'src/app/todo-list/api';
import { TodoListService        } from 'src/app/todo-list/api';

import { AddTodoListViewModel } from './add-todo-list.view-model';

describe('AddTodoListViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddTodoListViewModel,
        {
          provide: TodoListService,
          useValue: jasmine.createSpyObj(TodoListService, ['addTodoList']),
        },
      ]
    });
  });

  it('add should call addTodoList', inject(
    [
      AddTodoListViewModel,
      TodoListService,
    ],
    (vm: AddTodoListViewModel,
     service: jasmine.SpyObj<TodoListService>) => {
      service.addTodoList.and.returnValue(
        of(new AddTodoListResponseDto('test id')));

      vm.add();

      expect(service.addTodoList.calls.count())
        .withContext('addTodoList should be called once')
        .toBe(1);
    }))
});
