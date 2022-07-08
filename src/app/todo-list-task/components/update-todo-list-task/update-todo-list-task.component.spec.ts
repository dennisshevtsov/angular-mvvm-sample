import { inject, TestBed, } from '@angular/core/testing';
import { ActivatedRoute,  } from '@angular/router';

import { of, Subscription, } from 'rxjs';

import { TodoListTaskLinks,           } from 'src/app/core';
import { UpdateTodoListTaskComponent, } from './update-todo-list-task.component';
import { UpdateTodoListTaskViewModel, } from './update-todo-list-task.view-model';

const PARAM_MAP_TOKEN = 'ParamMap';

describe('UpdateTodoListTaskComponent', () => {
  const paramMapSpy = jasmine.createSpyObj(
    PARAM_MAP_TOKEN, [ 'get', ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTodoListTaskComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(paramMapSpy),
            fragment: of({ 'added': '', }),
          },
        },
        {
          provide: PARAM_MAP_TOKEN,
          useValue: paramMapSpy,
        },
        {
          provide: TodoListTaskLinks,
          useValue: jasmine.createSpyObj(TodoListTaskLinks, ['searchTodoListTasksLink']),
        },
      ],
    });

    TestBed.overrideProvider(
      UpdateTodoListTaskViewModel,
      {
        useValue: jasmine.createSpyObj(UpdateTodoListTaskViewModel, ['initialize']),
      });

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: jasmine.createSpyObj(Subscription, [ 'add', 'unsubscribe', ]),
      });
  });

  it('ngOnDestroy should unsubscribe',
     inject([Subscription], (sub: jasmine.SpyObj<Subscription>) => {
    const fixture = TestBed.createComponent(UpdateTodoListTaskComponent);

    fixture.detectChanges();

    fixture.componentInstance.ngOnDestroy();

    expect(sub.unsubscribe.calls.count())
      .withContext('sub.unsubscribe should be called')
      .toBe(1);
  }));
});
