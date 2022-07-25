import { inject, TestBed,   } from '@angular/core/testing';

import { TodoListTaskLinks, } from './todo-list-task.links';

describe('TodoListTaskLinks', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [TodoListTaskLinks]}));

  it('addTodoListTaskLink should create URL', inject([TodoListTaskLinks], (links: TodoListTaskLinks) => {
    expect(links.addTodoListTaskLink(123))
      .withContext('todoListId should be used')
      .toEqual(['/', 'todo', 123, 'task', 'new']);
  }));

  it('updateTodoListTaskLink should create URL', inject([TodoListTaskLinks], (links: TodoListTaskLinks) => {
    expect(links.updateTodoListTaskLink(123, 456))
      .withContext('todoListId and todoListTaskId should be used')
      .toEqual(['/', 'todo', 123, 'task', 456]);
  }));

  it('searchTodoListTasksLink should create URL', inject([TodoListTaskLinks], (links: TodoListTaskLinks) => {
    expect(links.searchTodoListTasksLink(123))
      .withContext('todoListId should be used')
      .toEqual(['/', 'todo', 123, 'task']);
  }));
});
