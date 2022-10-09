import { inject, TestBed, } from '@angular/core/testing';

import { of, } from 'rxjs';

import { GetTodoListTaskResponseDto,
         TodoListTaskDateDto,
         TodoListTaskService,
         UpdateTodoListDayTaskRequestDto, } from 'src/app/todo-list-task/api';
import { UpdateTodoListTaskViewModel,     } from './update-todo-list-task.view-model';

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
              'updateTodoListTask',
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

          const task = new UpdateTodoListDayTaskRequestDto(
            todoListId,
            todoListTaskId,
            responseDto.title,
            responseDto.description,
            responseDto.date.day,
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

  it('update should call updateTodoListTask',
    inject(
      [
        UpdateTodoListTaskViewModel,
        TodoListTaskService,
      ],
      (
        vm: UpdateTodoListTaskViewModel,
        srv: jasmine.SpyObj<TodoListTaskService>,
      ) => {
        srv.updateTodoListTask.and.returnValue(of(void 0));

        const dto = new UpdateTodoListDayTaskRequestDto(
          'test todo list id',
          'test todo list task id',
          'test todo list task title',
          'test todo list task description');

        vm.task.todoListId = dto.todoListId;
        vm.task.todoListTaskId = dto.todoListTaskId;
        vm.task.title = dto.title;
        vm.task.description = dto.description;
        (vm.task as UpdateTodoListDayTaskRequestDto).date = (dto as UpdateTodoListDayTaskRequestDto).date;

        vm.update().subscribe(() => {
          expect(srv.updateTodoListTask.calls.count())
            .withContext('updateTodoListTask should be called once')
            .toBe(1);

          expect(srv.updateTodoListTask.calls.first().args[0])
            .withContext('updateTodoListTask should be called with task params')
            .toEqual(dto);
        });
      }));
});
