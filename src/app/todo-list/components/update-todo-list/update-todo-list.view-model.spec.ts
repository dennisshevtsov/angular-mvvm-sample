import { inject, TestBed, } from '@angular/core/testing';

import { of, } from 'rxjs';

import { GetTodoListResponseDto,
         TodoListService,         } from 'src/app/todo-list/api';
import { UpdateTodoListViewModel, } from './update-todo-list.view-model';

describe('UpdateTodoListViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateTodoListViewModel,
        {
          provide: TodoListService,
          useValue: jasmine.createSpyObj(
            TodoListService,
            [
              'getTodoList',
              'updateTodoList',
            ]),
        },
      ]
    });
  });

  it('initialize should populate todoList prop',
     inject(
      [
        UpdateTodoListViewModel,
        TodoListService,
      ],
      (
        vm: UpdateTodoListViewModel,
        srv: jasmine.SpyObj<TodoListService>
      ) => {
        const responseDto = new GetTodoListResponseDto(
          'test title', 'test description');

        srv.getTodoList.and.returnValue(of(responseDto));

        const todoListId = 'test id';

        vm.todoList.todoListId = todoListId;
        vm.initialize().subscribe(() => {
          expect(srv.getTodoList.calls.count())
            .withContext('getTodoList should be called once')
            .toBe(1);

          expect(vm.todoList)
            .withContext('todoList prop shoul be defined')
            .toBeDefined();

          expect(vm.todoList.todoListId)
            .withContext('todoListId should not to be rewritten')
            .toBe(todoListId)

          expect(vm.todoList.title)
            .withContext('title should be populated')
            .toBe(responseDto.title);

          expect(vm.todoList.description)
            .withContext('description should be populated')
            .toBe(responseDto.description);
        });
      }
     ));

  it('update should call updateTodoList method',
     inject(
      [
        UpdateTodoListViewModel,
        TodoListService,
      ],
      (
        vm: UpdateTodoListViewModel,
        srv: jasmine.SpyObj<TodoListService>
      ) => {
        srv.updateTodoList.and.returnValue(of(void 0));

        vm.update().subscribe(() => {
          expect(srv.updateTodoList.calls.count())
            .withContext('updateTodoList should be called once')
            .toBe(1);
        });
      }));
});