import { inject, TestBed, } from '@angular/core/testing';

import { of, } from 'rxjs';

import { SearchTodoListsRecordResponseDto,
         TodoListService,                  } from 'src/app/todo-list/api';
import { SearchTodoListsViewModel,         } from './search-todo-lists.view-model';

describe('SearchTodoListsViewModel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchTodoListsViewModel,
        {
          provide : TodoListService,
          useValue: jasmine.createSpyObj(
            TodoListService,
            [
              'searchTodoList',
              'deleteTodoList',
            ]),
        }
      ],
    });
  });

  it(
    'hasSelection should indicate if there is selected record',
    inject(
      [
        SearchTodoListsViewModel,
      ],
      (
        vm : SearchTodoListsViewModel,
      ) => {
        expect(vm.hasSelection)
          .withContext('should return false')
          .toBeFalse();

        vm.selected = new SearchTodoListsRecordResponseDto(
          'test id', 'test title', 'test description');

        expect(vm.hasSelection)
          .withContext('should return true')
          .toBeTrue();
      }));

  it(
    'search should populate records',
    inject(
      [
        SearchTodoListsViewModel,
        TodoListService,
      ],
      (
        vm : SearchTodoListsViewModel,
        srv: jasmine.SpyObj<TodoListService>,
      ) => {
        expect(vm.todoLists)
          .withContext('todoLists should be defined')
          .toBeDefined();

        expect(vm.todoLists)
          .withContext('todoLists should be empty')
          .toHaveSize(0);

        const responseDtos = [
          new SearchTodoListsRecordResponseDto(
            'test id 0', 'test title 0', 'test description 0'),
          new SearchTodoListsRecordResponseDto(
            'test id 1', 'test title 1', 'test description 1'),
          new SearchTodoListsRecordResponseDto(
            'test id 2', 'test title 2', 'test description 2'),
        ];

        srv.searchTodoList.and.returnValue(of(responseDtos));

        vm.search().subscribe(() => {
          expect(srv.searchTodoList.calls.count())
            .withContext('searchTodoList should be called once')
            .toBe(1);

          expect(vm.todoLists)
            .withContext('todoLists should be populated')
            .toEqual(responseDtos);
        });
      }));

  it(
    'delete should call delete method',
    inject(
      [
        SearchTodoListsViewModel,
        TodoListService,
      ],
      (
        vm : SearchTodoListsViewModel,
        srv: jasmine.SpyObj<TodoListService>,
      ) => {
        srv.deleteTodoList.and.returnValue(of(void 0));

        const responseDtos = [
          new SearchTodoListsRecordResponseDto(
            'test id 0', 'test title 0', 'test description 0'),
          new SearchTodoListsRecordResponseDto(
            'test id 1', 'test title 1', 'test description 1'),
          new SearchTodoListsRecordResponseDto(
            'test id 2', 'test title 2', 'test description 2'),
        ];

        srv.searchTodoList.and.returnValue(of(responseDtos));

        vm.delete().subscribe(() => {
          expect(srv.deleteTodoList.calls.count())
            .withContext('deleteTodoList should not be called')
            .toBe(0);

          expect(srv.searchTodoList.calls.count())
            .withContext('searchTodoList should not be called')
            .toBe(0);
        });

        vm.selected = new SearchTodoListsRecordResponseDto(
          'test id', 'test title', 'test description');

        vm.delete().subscribe(() => {
          expect(srv.deleteTodoList.calls.count())
            .withContext('deleteTodoList should be called once')
            .toBe(1);

          expect(srv.searchTodoList.calls.count())
            .withContext('searchTodoList should be called once')
            .toBe(1);
        });
      }));
});
