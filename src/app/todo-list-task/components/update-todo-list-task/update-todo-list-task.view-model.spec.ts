import { inject, TestBed } from '@angular/core/testing';

import { of, } from 'rxjs';

import { GetTodoListTaskResponseDto,
         TodoListTaskDateDto,
         TodoListTaskService,
         UpdateTodoListTaskRequestDto, } from 'src/app/todo-list-task/api';
import { UpdateTodoListTaskViewModel,  } from './update-todo-list-task.view-model';

describe('UpdateTodoListTaskViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UpdateTodoListTaskViewModel,
        {
          provide: TodoListTaskService,
          useValue: jasmine.createSpyObj(
            TodoListTaskService,
            [
              'getTodoListTask',
            ]),
        },
      ]
    });
  });

  it('initialize',
    inject(
      [
        UpdateTodoListTaskViewModel,
        TodoListTaskService,
      ],
      (
        vm: UpdateTodoListTaskViewModel,
        srv: jasmine.SpyObj<TodoListTaskService>,
      ) => {
        const responseDto = new GetTodoListTaskResponseDto(
          'test todo list task title',
          'test todo list task description',
          new TodoListTaskDateDto(0, true),
        )

        srv.getTodoListTask.and.returnValue(of(responseDto));

        const todoListId = 'test todo list id';
        const todoListTaskId = 'test todo list id';

        vm.task.todoListId = todoListId;
        vm.task.todoListTaskId = todoListTaskId;

        vm.initialize().subscribe(() => {
          expect(vm.task)
            .withContext('task should be defined')
            .toBeDefined();

          const task = new UpdateTodoListTaskRequestDto(
            todoListId,
            todoListTaskId,
            responseDto.title,
            responseDto.description,
            responseDto.date,
          )

          expect(vm.task)
            .withContext('task should be populated')
            .toEqual(task);

          expect(srv.getTodoListTask.calls.count())
            .withContext('getTodoListTask should be called once');

          const getTodoListTaskCall =
            srv.getTodoListTask.calls.first();

          expect(getTodoListTaskCall.args[0].todoListId)
            .withContext('getTodoListTask should be called with todoListId')
            .toBe(todoListId);

          expect(getTodoListTaskCall.args[0].todoListTaskId)
            .withContext('getTodoListTask should be called with todoListTaskId')
            .toBe(todoListTaskId);
        });
      }))
});
