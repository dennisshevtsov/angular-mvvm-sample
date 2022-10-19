import { inject, TestBed, } from '@angular/core/testing';

import { of, } from 'rxjs';

import { GetTodoListDayTaskResponseDto,
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
        const responseDto = new GetTodoListDayTaskResponseDto(
          'test todo list task title',
          'test todo list task description',
        );

        srv.getTodoListTask.and.returnValue(of(responseDto));

        const todoListId = 'test todo list id';
        const todoListTaskId = 'test todo list id';

        vm.task.period.fullDay = true;
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
            0,
          );

          expect(vm.task)
            .withContext('task should be defined')
            .toBeDefined();

          expect(vm.task.todoListId)
            .withContext('task todoListId should be populated')
            .toEqual(task.todoListId);

          expect(vm.task.todoListTaskId)
            .withContext('task todoListTaskId should be populated')
            .toEqual(task.todoListTaskId);

          expect(vm.task.title)
            .withContext('task title should be populated')
            .toEqual(task.title);

          expect(vm.task.description)
            .withContext('task description should be populated')
            .toEqual(task.description);

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

        vm.task.period.fullDay = true;
        vm.task.todoListId = dto.todoListId;
        vm.task.todoListTaskId = dto.todoListTaskId;
        vm.task.title = dto.title;
        vm.task.description = dto.description;
        vm.task.period.day = (dto as UpdateTodoListDayTaskRequestDto).date;

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
