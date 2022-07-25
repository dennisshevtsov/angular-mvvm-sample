import { fakeAsync, inject, TestBed, tick, } from '@angular/core/testing';
import { Router,                           } from '@angular/router';

import { TodoListLinks,                    } from './todo-list.links';
import { TodoListNavigator,                } from './todo-list.navigator';

describe('TodoListNavigator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoListNavigator,
        {
          provide : Router,
          useValue: jasmine.createSpyObj(Router, ['navigate']),
        },
        {
          provide : TodoListLinks,
          useValue: jasmine.createSpyObj(TodoListLinks, ['updateTodoListLink']),
        },
      ]});
  });

  it('navigateToUpdateTodoList should navigate to update', fakeAsync(inject(
    [
      Router,
      TodoListLinks,
      TodoListNavigator,
    ],
    (
      routerSpy: jasmine.SpyObj<Router>,
      linksSpy : jasmine.SpyObj<TodoListLinks>,
      navigator: TodoListNavigator,
    ) => {
      const updateLink = ['test'];
      linksSpy.updateTodoListLink.and.returnValue(updateLink);

      const todoListId = 'test todo list id';

      navigator.navigateToUpdateTodoList(todoListId);
      tick();

      expect(linksSpy.updateTodoListLink.calls.count())
        .withContext('updateTodoListLink should be called')
        .toBe(1);

      expect(routerSpy.navigate.calls.count())
        .withContext('navigate should be called')
        .toBe(1);

      expect(routerSpy.navigate.calls.first().args[0])
        .withContext('navigate should take url')
        .toBe(updateLink);

      expect(routerSpy.navigate.calls.first().args[1])
        .withContext('navigate should take added flag')
        .toEqual({
          fragment: 'added',
        });
  })));
});
