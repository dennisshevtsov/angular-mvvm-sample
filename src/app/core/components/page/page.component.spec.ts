import { NO_ERRORS_SCHEMA } from '@angular/core';

import { inject  } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { TodoListLinks } from '../../navigation/todo-list.links';
import { PageComponent } from './page.component';

describe('PageComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageComponent],
      providers: [
        {
          provide: TodoListLinks,
          useValue: jasmine.createSpyObj(TodoListLinks, ['searchTodoListsLink']),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('homeLink should return list to search TODO lists',
     inject(
      [
        TodoListLinks,
      ],
      (
        linksSpy: jasmine.SpyObj<TodoListLinks>,
      ) => {
        const component = TestBed.createComponent(PageComponent);
        component.detectChanges();

        const searchTodoListsLink: any[] = ['test search todo lists link'];
        linksSpy.searchTodoListsLink.and.returnValue(searchTodoListsLink);

        expect(component.componentInstance.homeLink)
          .withContext('homeLink should return correct link')
          .toBe(searchTodoListsLink);

        expect(linksSpy.searchTodoListsLink.calls.count())
          .withContext('searchTodoListsLink should be called')
          .toBeGreaterThan(1);
  }));
});
