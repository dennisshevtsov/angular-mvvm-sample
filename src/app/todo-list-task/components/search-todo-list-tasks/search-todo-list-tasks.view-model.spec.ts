import { inject, TestBed, } from '@angular/core/testing';

import { of, } from 'rxjs';

import { SearchTodoListTasksRecordResponseDto,
         TodoListTaskDateDto,
         TodoListTaskService,                  } from 'src/app/todo-list-task/api';
import { SearchTodoListTasksViewModel,         } from './search-todo-list-tasks.view-model';

describe('SearchTodoListTasksViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchTodoListTasksViewModel,
        {
          provide : TodoListTaskService,
          useValue: jasmine.createSpyObj(
            TodoListTaskService,
            [
              'searchTodoListTasks',
              'completeTodoListTask',
              'uncompleteTodoListTask',
              'deleteTodoListTask',
            ]),
        }
      ]
    });
  });

  it('search should populate tasks',
     inject(
      [
        SearchTodoListTasksViewModel,
        TodoListTaskService,
      ],
      (
        vm : SearchTodoListTasksViewModel,
        srv: jasmine.SpyObj<TodoListTaskService>,
      ) => {
        const todoListId = 'test todo list id';

        vm.todoListId = todoListId;

        const responseDtos = [
          new SearchTodoListTasksRecordResponseDto(
            'test todo list task id 0',
            false,
            'test todo list task title 0',
            'test todo list task description 0',
            new TodoListTaskDateDto(1000000, false),
          ),
          new SearchTodoListTasksRecordResponseDto(
            'test todo list task id 1',
            false,
            'test todo list task title 1',
            'test todo list task description 1',
            new TodoListTaskDateDto(1000000, false),
          ),
          new SearchTodoListTasksRecordResponseDto(
            'test todo list task id 2',
            false,
            'test todo list task title 2',
            'test todo list task description 2',
            new TodoListTaskDateDto(1000000, false),
          ),
        ];

        srv.searchTodoListTasks.and.returnValue(of(responseDtos));

        vm.search().subscribe(() => {
          expect(vm.tasks)
            .withContext('tasks should be defined')
            .toBeDefined();

          expect(vm.tasks)
            .withContext('tasks should be populated')
            .toEqual(responseDtos);

          expect(srv.searchTodoListTasks.calls.count())
            .withContext('searchTodoListTasks should be called once')
            .toBe(1);

          expect(srv.searchTodoListTasks.calls.first().args[0].todoListId)
            .withContext('searchTodoListTasks should be called with todoListId')
            .toBe(todoListId);
        });
      }));

  it('complete should call completeTodoListTask',
     inject(
      [
        SearchTodoListTasksViewModel,
        TodoListTaskService,
      ],
      (
        vm : SearchTodoListTasksViewModel,
        srv: jasmine.SpyObj<TodoListTaskService>,
      ) => {
        srv.completeTodoListTask.and.returnValue(of(void 0));

        vm.complete().subscribe(() => {
          expect(srv.completeTodoListTask.calls.count())
            .withContext('completeTodoListTask should not be called if there is no selected record')
            .toBe(0);
        });

        const todoListId = 'test todo list id';
        const todoListTaskId = 'test todo list task id 0';

        vm.todoListId = todoListId;
        vm.selected = new SearchTodoListTasksRecordResponseDto(
          todoListTaskId,
          false,
          'test todo list task title 0',
          'test todo list task description 0',
          new TodoListTaskDateDto(1000000, false),
        );

        vm.complete().subscribe(() => {
          expect(srv.completeTodoListTask.calls.count())
            .withContext('completeTodoListTask should be called once')
            .toBe(1);

          const completeTodoListTaskCalls =
            srv.completeTodoListTask.calls.first();

          expect(completeTodoListTaskCalls.args[0].todoListId)
            .withContext('completeTodoListTask should be called with IDs')
            .toBe(todoListId);

          expect(completeTodoListTaskCalls.args[0].todoListTaskId)
            .withContext('completeTodoListTask should be called with IDs')
            .toBe(todoListTaskId);
        });
      }));
});
