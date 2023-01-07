import { fakeAsync } from '@angular/core/testing';
import { inject    } from '@angular/core/testing';
import { TestBed   } from '@angular/core/testing';
import { tick      } from '@angular/core/testing';

import { Router } from '@angular/router';

import { TodoListTaskLinks     } from './todo-list-task.links';
import { TodoListTaskNavigator } from './todo-list-task.navigator';

describe('TodoListTaskNavigator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoListTaskNavigator,
        {
          provide: Router,
          useValue: jasmine.createSpyObj(Router, ['navigate']),
        },
        {
          provide: TodoListTaskLinks,
          useValue: jasmine.createSpyObj(TodoListTaskLinks, ['updateTodoListTaskLink']),
        },
      ],
    });
  });

  it('navigateToUpdateTodoListTask should navigate to update', fakeAsync(inject(
    [
      Router,
      TodoListTaskLinks,
      TodoListTaskNavigator,
    ],
    (
      routerSpy: jasmine.SpyObj<Router>,
      linksSpy : jasmine.SpyObj<TodoListTaskLinks>,
      navigator: jasmine.SpyObj<TodoListTaskNavigator>,
    ) => {
      const updateLink = ['test'];
      linksSpy.updateTodoListTaskLink.and.returnValue(updateLink);

      const todoListId     = 'test todo list id';
      const todoListTaskId = 'test todo list task id';

      navigator.navigateToUpdateTodoListTask(todoListId, todoListTaskId);
      tick();

      expect(linksSpy.updateTodoListTaskLink.calls.count())
        .withContext('updateTodoListTaskLink should be called')
        .toBe(1);

      expect(routerSpy.navigate.calls.count())
        .withContext('navigate should be called')
        .toBe(1);

      expect(routerSpy.navigate.calls.first().args[0])
        .withContext('navigate should take update URL')
        .toBe(updateLink);

      expect(routerSpy.navigate.calls.first().args[1])
        .withContext('navigate should take extras')
        .toEqual({
          fragment: 'added'
        });
    })));
});
