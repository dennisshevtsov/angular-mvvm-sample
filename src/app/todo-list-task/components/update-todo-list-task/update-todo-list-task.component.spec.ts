import { Component,                        } from '@angular/core';
import { fakeAsync, inject, TestBed, tick, } from '@angular/core/testing';
import { By,                               } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap,         } from '@angular/router';

import { of, Subscription,                 } from 'rxjs';

import { TodoListTaskLinks,
         TODO_LIST_ROUTE_ID_PARAMETER,
         TODO_LIST_TASK_ROUTE_ID_PARAMETER, } from 'src/app/core';
import { UpdateTodoListTaskRequestDto       } from 'src/app/todo-list-task/api';
import { UpdateTodoListTaskComponent,       } from './update-todo-list-task.component';
import { UpdateTodoListTaskViewModel,       } from './update-todo-list-task.view-model';

const PARAM_MAP_TOKEN = 'ParamMap';

@Component({
  selector: 'app-toasts',
})
class ToastsComponentMock {
  public info(message: string): void {}

  public error(message: string): void {}
}

describe('UpdateTodoListTaskComponent', () => {
  const paramMapSpy = jasmine.createSpyObj(
    PARAM_MAP_TOKEN, [ 'get', ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UpdateTodoListTaskComponent,
        ToastsComponentMock,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(paramMapSpy),
            fragment: of('added'),
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
        useValue: jasmine.createSpyObj(
          'UpdateTodoListTaskViewModel',
          [
            'initialize',
          ],
          [
            'task',
          ]),
      });

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: jasmine.createSpyObj(
          Subscription,
          [
            'add',
            'unsubscribe',
          ]),
      });
  });

  it('ngOnInit', fakeAsync(inject(
    [
      PARAM_MAP_TOKEN,
      UpdateTodoListTaskViewModel,
    ],
    (
      paramMapSpy: jasmine.SpyObj<ParamMap>,
      vmSpy: jasmine.SpyObj<UpdateTodoListTaskViewModel>,
    ) => {
    const todoListId = 'test todo list id';
    const todoListTaskId = 'test todo list task id';

    paramMapSpy.get.and.callFake(name => {
      if (name == TODO_LIST_ROUTE_ID_PARAMETER) {
        return todoListId;
      }

      if (name == TODO_LIST_TASK_ROUTE_ID_PARAMETER) {
        return todoListTaskId;
      }

      return null;
    });

    const requestDto = new UpdateTodoListTaskRequestDto();
    const vmSpyDescs = Object.getOwnPropertyDescriptors(vmSpy);
    const taskPropSpy = vmSpyDescs.task.get as jasmine.Spy<() => UpdateTodoListTaskRequestDto>;

    taskPropSpy.and.returnValue(requestDto);

    vmSpy.initialize.and.returnValue(of(void 0));

    const fixture = TestBed.createComponent(UpdateTodoListTaskComponent);

    const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
    const infoSpy = spyOn(toastsComponent, 'info');
    const errorSpy = spyOn(toastsComponent, 'error');

    fixture.detectChanges();

    tick();

    expect(requestDto.todoListId)
      .withContext('todoListId should be populated')
      .toBe(todoListId);

    expect(requestDto.todoListId)
      .withContext('todoListTaskID should be populated')
      .toBe(todoListId);

    expect(vmSpy.initialize.calls.count())
      .withContext('initialize should be called')
      .toBe(1);

    expect(infoSpy.calls.count())
      .withContext('info should be called')
      .toBe(1);

    expect(errorSpy.calls.count())
      .withContext('error should not be called')
      .toBe(0);
  })));

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
