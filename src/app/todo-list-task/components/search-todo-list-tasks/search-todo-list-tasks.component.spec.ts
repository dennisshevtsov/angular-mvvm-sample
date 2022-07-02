import { Component,                    } from '@angular/core';
import { fakeAsync, inject, TestBed,
         tick,                         } from '@angular/core/testing';
import { By,                           } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule, } from '@angular/router';

import { of, Subscription,             } from 'rxjs';

import { TodoListLinks,
         TodoListTaskLinks,            } from 'src/app/core';
import { SearchTodoListTasksComponent, } from './search-todo-list-tasks.component';
import { SearchTodoListTasksViewModel, } from './search-todo-list-tasks.view-model';

const PARAM_MAP_TOKEN = 'ParamMap';

@Component({
  selector: 'app-toasts',
})
class ToastsComponentMock {
  public info(message: string): void {}

  public error(message: string): void {}
}

describe('SearchTodoListTasksComponent', () => {
  beforeEach(() => {
    const paramMapSpy = jasmine.createSpyObj(
      PARAM_MAP_TOKEN, [ 'get', ]);

    TestBed.configureTestingModule({
      declarations: [
        SearchTodoListTasksComponent,
        ToastsComponentMock, ],
      imports: [ RouterModule.forRoot([]), ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(paramMapSpy), },
        },
        {
          provide: PARAM_MAP_TOKEN,
          useValue: paramMapSpy,
        },
        {
          provide: TodoListLinks,
          useValue: jasmine.createSpyObj(TodoListLinks, [ 'searchTodoListsLink', ]),
        },
        {
          provide: TodoListTaskLinks,
          useValue: jasmine.createSpyObj(TodoListTaskLinks, [ 'addTodoListTaskLink', ]),
        },
      ]
    });

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: jasmine.createSpyObj(Subscription, [ 'add', 'unsubscribe', ]),
      });

    TestBed.overrideProvider(
      SearchTodoListTasksViewModel,
      {
        useValue: jasmine.createSpyObj(
          'SearchTodoListTasksViewModel',
           [ 'search', ], [ 'todoListId', ]),
      });
  });

  it('ngOnInit should populate error', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, SearchTodoListTasksViewModel, ],
    (pmSpy : jasmine.SpyObj<any>,
     subSpy: jasmine.SpyObj<Subscription>,
     vmSpy : jasmine.SpyObj<SearchTodoListTasksViewModel>) => {
      pmSpy.get.and.returnValue(null);

      const fixture = TestBed.createComponent(SearchTodoListTasksComponent);

      const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
      const errorSpy = spyOn(toastsComponent, 'error');

      fixture.detectChanges();

      tick();

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.search.calls.count())
        .withContext('search should not be called')
        .toBe(0);

      expect(errorSpy.calls.count())
        .withContext('error should be called once')
        .toBe(1);

      expect(errorSpy.calls.first().args[0])
        .withContext('error should be called with error message')
        .toBe('An error occured.');
  })));

  it('ngOnInit should initialize vm', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, SearchTodoListTasksViewModel, ],
    (pmSpy : jasmine.SpyObj<any>,
     subSpy: jasmine.SpyObj<Subscription>,
     vmSpy : jasmine.SpyObj<SearchTodoListTasksViewModel>) => {
      const todoListId = 'test id';

      pmSpy.get.and.returnValue(todoListId);

      const descs = Object.getOwnPropertyDescriptors(vmSpy);
      const todoListIdSpy = descs.todoListId.set! as jasmine.Spy<(value: number | string) => void>;

      vmSpy.search.and.returnValue(of(void 0));

      const fixture = TestBed.createComponent(SearchTodoListTasksComponent);

      const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
      const errorSpy = spyOn(toastsComponent, 'error');

      fixture.detectChanges();

      tick();

      expect(subSpy.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);

      expect(vmSpy.search.calls.count())
        .withContext('search should be called once')
        .toBe(1);

      expect(todoListIdSpy.calls.count())
        .withContext('todoListId should be called once')
        .toBe(1);

      expect(errorSpy.calls.count())
        .withContext('error should not be called')
        .toBe(0);
  })));
});
