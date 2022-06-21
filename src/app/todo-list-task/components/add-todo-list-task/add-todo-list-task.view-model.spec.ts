import { inject, TestBed, } from '@angular/core/testing';
import { of } from 'rxjs';

import { AddTodoListTaskResponseDto, TodoListTaskService,      } from 'src/app/todo-list-task/api';
import { AddTodoListTaskViewModel, } from './add-todo-list-task.view-model';

describe('AddTodoListTaskViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddTodoListTaskViewModel,
        {
          provide: TodoListTaskService,
          useValue: jasmine.createSpyObj(
            TodoListTaskService,
            [
              'addTodoListTask',
            ]),
        },
      ],
    });
  });

  it('add should call addTodoListTask',
     inject(
      [
        AddTodoListTaskViewModel,
        TodoListTaskService,
      ],
      (
        vm : AddTodoListTaskViewModel,
        srv: jasmine.SpyObj<TodoListTaskService>,
      ) => {
        const todoListTaskId = 'test id';

        srv.addTodoListTask.and.returnValue(
          of(new AddTodoListTaskResponseDto(todoListTaskId)));

        expect(vm.todoListTaskId)
          .withContext('todoListTaskId should return default value')
          .toBe(0);

        vm.add().subscribe(() => {
          expect(srv.addTodoListTask.calls.count())
            .withContext('addTodoListTask should be called once')
            .toBe(1);

          expect(vm.todoListTaskId)
            .withContext('todoListTaskId should be populated')
            .toBe(todoListTaskId);
        });
      }))
});