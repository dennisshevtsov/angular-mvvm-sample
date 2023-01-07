import { inject  } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { SearchTodoListDayTaskResponseDto } from 'src/app/todo-list-task/api';
import { TodoListTaskService              } from 'src/app/todo-list-task/api';
import { SearchTodoListTasksViewModel     } from './search-todo-list-tasks.view-model';

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

  it('hasSelection should indicate if there is selected record',
     inject(
      [
        SearchTodoListTasksViewModel,
        TodoListTaskService,
      ],
      (
        vm : SearchTodoListTasksViewModel,
      ) => {
        expect(vm.hasSelection)
          .withContext('hasSelection should return false')
          .toBeFalse();

        vm.selected = new SearchTodoListDayTaskResponseDto(
          'test todo list task id',
          false,
          'test todo list task title',
          'test todo list task description',
        );

        expect(vm.hasSelection)
          .withContext('hasSelection should return true')
          .toBeTrue();
      }));

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
          new SearchTodoListDayTaskResponseDto(
            'test todo list task id 0',
            false,
            'test todo list task title 0',
            'test todo list task description 0',
          ),
          new SearchTodoListDayTaskResponseDto(
            'test todo list task id 1',
            false,
            'test todo list task title 1',
            'test todo list task description 1',
          ),
          new SearchTodoListDayTaskResponseDto(
            'test todo list task id 2',
            false,
            'test todo list task title 2',
            'test todo list task description 2',
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
        vm.selected = new SearchTodoListDayTaskResponseDto(
          todoListTaskId,
          false,
          'test todo list task title 0',
          'test todo list task description 0',
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

  it('uncomplete should call uncompleteTodoListTask',
    inject(
    [
      SearchTodoListTasksViewModel,
      TodoListTaskService,
    ],
    (
      vm : SearchTodoListTasksViewModel,
      srv: jasmine.SpyObj<TodoListTaskService>,
    ) => {
      srv.uncompleteTodoListTask.and.returnValue(of(void 0));

      vm.uncomplete().subscribe(() => {
        expect(srv.completeTodoListTask.calls.count())
          .withContext('uncompleteTodoListTask should not be called if there is no selected record')
          .toBe(0);
      });

      const todoListId = 'test todo list id';
      const todoListTaskId = 'test todo list task id 0';

      vm.todoListId = todoListId;
      vm.selected = new SearchTodoListDayTaskResponseDto(
        todoListTaskId,
        false,
        'test todo list task title 0',
        'test todo list task description 0',
      );

      vm.uncomplete().subscribe(() => {
        expect(srv.uncompleteTodoListTask.calls.count())
          .withContext('uncompleteTodoListTask should be called once')
          .toBe(1);

        const uncompleteTodoListTaskCalls =
          srv.uncompleteTodoListTask.calls.first();

        expect(uncompleteTodoListTaskCalls.args[0].todoListId)
          .withContext('uncompleteTodoListTask should be called with IDs')
          .toBe(todoListId);

        expect(uncompleteTodoListTaskCalls.args[0].todoListTaskId)
          .withContext('uncompleteTodoListTask should be called with IDs')
          .toBe(todoListTaskId);
      });
    }));

  it('delete should call uncompleteTodoListTask',
    inject(
    [
      SearchTodoListTasksViewModel,
      TodoListTaskService,
    ],
    (
      vm : SearchTodoListTasksViewModel,
      srv: jasmine.SpyObj<TodoListTaskService>,
    ) => {
      srv.deleteTodoListTask.and.returnValue(of(void 0));

      const responseDtos = [
        new SearchTodoListDayTaskResponseDto(
          'test todo list task id 0',
          false,
          'test todo list task title 0',
          'test todo list task description 0',
        ),
        new SearchTodoListDayTaskResponseDto(
          'test todo list task id 1',
          false,
          'test todo list task title 1',
          'test todo list task description 1',
        ),
        new SearchTodoListDayTaskResponseDto(
          'test todo list task id 2',
          false,
          'test todo list task title 2',
          'test todo list task description 2',
        ),
      ];

      srv.searchTodoListTasks.and.returnValue(of(responseDtos));

      vm.delete().subscribe(() => {
        expect(srv.completeTodoListTask.calls.count())
          .withContext('deleteTodoListTask should not be called if there is no selected record')
          .toBe(0);
      });

      const todoListId = 'test todo list id';
      const todoListTaskId = 'test todo list task id 0';

      vm.todoListId = todoListId;
      vm.selected = new SearchTodoListDayTaskResponseDto(
        todoListTaskId,
        false,
        'test todo list task title 0',
        'test todo list task description 0',
      );

      vm.delete().subscribe(() => {
        expect(srv.deleteTodoListTask.calls.count())
          .withContext('deleteTodoListTask should be called once')
          .toBe(1);

        const deleteTodoListTaskCalls =
          srv.deleteTodoListTask.calls.first();

        expect(deleteTodoListTaskCalls.args[0].todoListId)
          .withContext('deleteTodoListTask should be called with IDs')
          .toBe(todoListId);

        expect(deleteTodoListTaskCalls.args[0].todoListTaskId)
          .withContext('deleteTodoListTask should be called with IDs')
          .toBe(todoListTaskId);

        expect(srv.searchTodoListTasks.calls.count())
          .withContext('searchTodoListTasks should be called once')
          .toBe(1);

        expect(srv.searchTodoListTasks.calls.first().args[0].todoListId)
          .withContext('searchTodoListTasks should be called with todoListId')
          .toBe(todoListId);
      });
    }));
});
