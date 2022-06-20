import { inject, TestBed, } from '@angular/core/testing';

import { of, } from 'rxjs';

import { AddTodoListResponseDto,
         TodoListService,        } from 'src/app/todo-list/api';
import { AddTodoListViewModel,   } from './add-todo-list.view-model';

describe('AddTodoListViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddTodoListViewModel,
        {
          provide: TodoListService,
          useValue: jasmine.createSpyObj(
            TodoListService,
            [
              'addTodoList',
            ]),
        },
      ]
    });
  });

  it('should call addTodoList method', inject(
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
      .withContext('should call addTodoList method once')
      .toBe(1);
  }))
});
