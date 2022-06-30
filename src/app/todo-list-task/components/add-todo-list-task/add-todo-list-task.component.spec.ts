import { Component,                        } from '@angular/core';
import { fakeAsync, inject, TestBed, tick, } from '@angular/core/testing';
import { By,                               } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule,     } from '@angular/router';

import { of, Subscription, } from 'rxjs';

import { PageComponent,             } from 'src/app/core';
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

@Component({
  selector: 'todo-list-task',
})
export class TodoListTaskComponentMock {
  public validateForm(): void {}

  public get form(): any { return; }
}

describe('AddTodoListTaskComponent', () => {
  beforeEach(() => {
    const paramMapSpy = jasmine.createSpyObj(
      PARAM_MAP_TOKEN, [ 'get', ]);

    TestBed.configureTestingModule({
      declarations: [
        AddTodoListTaskComponent,
        ToastsComponentMock,
        TodoListTaskComponentMock,
        PageComponent,
      ],
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

  it('ngOnInit should initialize vm', fakeAsync(inject(
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

    tick();

    expect(vm.todoListId)
      .withContext('todoListId should be populated from URL')
      .toBe(todoListId);

    expect(vm.task.date)
      .withContext('date should be defined')
      .toBeDefined();

    expect(sub.add.calls.count())
      .withContext('add should be called once')
      .toBe(1);
  })));

  it('ngAfterViewInit should call error toast', fakeAsync(inject(
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

    tick();

    const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
    const errorSpy = spyOn(toastsComponent, 'error');

    fixture.componentInstance.ngAfterViewInit();

    expect(errorSpy.calls.count())
      .withContext('error should be called once')
      .toBe(1);
  })));

  it('ngOnDestroy should call unsubscribe', fakeAsync(inject(
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

    tick();

    fixture.componentInstance.ngOnDestroy();

    expect(sub.unsubscribe.calls.count())
      .withContext('unsubscribe should be called once')
      .toBe(1);
  })));

  it('onOkPressed should validate form', fakeAsync(inject(
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

    tick();

    let validateFormSpy: jasmine.Spy<any>;
    let formSpy: jasmine.Spy<jasmine.Func>;

    const todoListTaskComponent = fixture.debugElement.query(By.directive(TodoListTaskComponentMock)).componentInstance;

    validateFormSpy = spyOn(todoListTaskComponent, 'validateForm');
    formSpy = spyOnProperty(todoListTaskComponent, 'form');

    formSpy.and.returnValue({
      valid: false,
    });

    fixture.componentInstance.onOkPressed();

    tick();

    expect(sub.add.calls.count())
      .withContext('add should be called once')
      .toBe(1);

    expect(vm.add.calls.count())
      .withContext('add should not be called')
      .toBe(0);

    expect(validateFormSpy.calls.count())
      .withContext('validateForm should be called')
      .toBe(1);

    expect(formSpy.calls.count())
      .withContext('form should be called')
      .toBe(1);
  })));
});
