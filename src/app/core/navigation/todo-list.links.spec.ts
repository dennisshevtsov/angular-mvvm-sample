import { inject  } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { TodoListLinks } from './todo-list.links';

describe('TodoListLinks', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [TodoListLinks]}));

  it('addTodoListLink create URL', inject([TodoListLinks], (links: TodoListLinks) => {
    expect(links.addTodoListLink())
      .withContext('addTodoListLink should return URL')
      .toEqual(['/', 'todo', 'new']);
  }));

  it('updateTodoListLink create URL', inject([TodoListLinks], (links: TodoListLinks) => {
    expect(links.updateTodoListLink(123))
      .withContext('updateTodoListLink should return URL')
      .toEqual(['/', 'todo', 123]);
  }));

  it('searchTodoListsLink create URL', inject([TodoListLinks], (links: TodoListLinks) => {
    expect(links.searchTodoListsLink())
      .withContext('searchTodoListsLink should return URL')
      .toEqual(['/', 'todo']);
  }));
});
