import { Component } from '@angular/core';
import { inject, TestBed, waitForAsync, } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule,  } from '@angular/router';

import { of, Subscription, } from 'rxjs';

import { AddTodoListTaskRequestDto, } from 'src/app/todo-list-task/api';
import { AddTodoListTaskComponent,  } from './add-todo-list-task.component';
import { AddTodoListTaskViewModel,  } from './add-todo-list-task.view-model';

const PARAM_MAP_TOKEN = 'ParamMap';

@Component({
  selector: 'app-toasts',
})
class ToastsComponentMock {
  public info(message: string): void {}

  public error(message: string): void {}
}

describe('AddTodoListTaskComponent', () => {
  beforeEach(() => {
    const paramMapSpy = jasmine.createSpyObj(
      PARAM_MAP_TOKEN, [ 'get', ]);

    TestBed.configureTestingModule({
      declarations: [ AddTodoListTaskComponent, ToastsComponentMock, ],
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
      ],
    });

    TestBed.overrideProvider(
      AddTodoListTaskViewModel,
      {
        useValue: jasmine.createSpyObj(
          'AddTodoListTaskViewModel',
          [ 'add', ],
          [ 'task', 'todoListId', ]),
      });

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: jasmine.createSpyObj(
          Subscription,
          [ 'add', 'unsubscribe', ]),
      });
  });

  it('ngOnInit should initialize vm', waitForAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, AddTodoListTaskViewModel, ],
    (pm: jasmine.SpyObj<any>,
     sub: jasmine.SpyObj<Subscription>,
     vm: jasmine.SpyObj<AddTodoListTaskViewModel>) => {
    const todoListId = 'test todo list id';

    pm.get.and.returnValue(todoListId);

    const descs = Object.getOwnPropertyDescriptors(vm)!;

    const taskSpy = descs.task.get as jasmine.Spy<() => AddTodoListTaskRequestDto>;
    taskSpy.and.returnValue(new AddTodoListTaskRequestDto());

    const todoListIdSpy = descs.todoListId.get as jasmine.Spy<() => number | string>;
    todoListIdSpy.and.returnValue(todoListId);

    const fixture = TestBed.createComponent(AddTodoListTaskComponent);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(vm.todoListId)
        .withContext('todoListId should be populated from URL')
        .toBe(todoListId);

      expect(vm.task.date)
        .withContext('date should be defined')
        .toBeDefined();

      expect(sub.add.calls.count())
        .withContext('add should be called once')
        .toBe(1);
    });
  })));

  it('ngAfterViewInit should call error toast', waitForAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, AddTodoListTaskViewModel, ],
    (pm: jasmine.SpyObj<any>,
     sub: jasmine.SpyObj<Subscription>,
     vm: jasmine.SpyObj<AddTodoListTaskViewModel>) => {
    pm.get.and.returnValue(null);

    const descs = Object.getOwnPropertyDescriptors(vm)!;

    const taskSpy = descs.task.get as jasmine.Spy<() => AddTodoListTaskRequestDto>;
    taskSpy.and.returnValue(new AddTodoListTaskRequestDto());

    const todoListIdSpy = descs.todoListId.get as jasmine.Spy<() => number | string>;
    todoListIdSpy.and.returnValue('');

    const fixture = TestBed.createComponent(AddTodoListTaskComponent);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(taskSpy.calls.count())
        .withContext('task should not be called')
        .toBe(0);

      expect(todoListIdSpy.calls.count())
        .withContext('todoListId should not be called')
        .toBe(0);

      const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
      const errorSpy = spyOn(toastsComponent, 'error');

      fixture.componentInstance.ngAfterViewInit();

      expect(errorSpy.calls.count())
        .withContext('error should be called once')
        .toBe(1);
    });
  })));

  it('ngOnDestroy should call unsubscribe', waitForAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, AddTodoListTaskViewModel, ],
    (pm: jasmine.SpyObj<any>,
     sub: jasmine.SpyObj<Subscription>,
     vm: jasmine.SpyObj<AddTodoListTaskViewModel>) => {
    const todoListId = 'test todo list id';

    pm.get.and.returnValue(todoListId);

    const descs = Object.getOwnPropertyDescriptors(vm)!;

    const taskSpy = descs.task.get as jasmine.Spy<() => AddTodoListTaskRequestDto>;
    taskSpy.and.returnValue(new AddTodoListTaskRequestDto());

    const todoListIdSpy = descs.todoListId.get as jasmine.Spy<() => number | string>;
    todoListIdSpy.and.returnValue(todoListId);

    const fixture = TestBed.createComponent(AddTodoListTaskComponent);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.componentInstance.ngOnDestroy();

      expect(sub.unsubscribe.calls.count())
        .withContext('unsubscribe should be called once')
        .toBe(1);
    });
  })));
});
