import { Component } from '@angular/core';
import { Input     } from '@angular/core';

import { fakeAsync } from '@angular/core/testing';
import { inject    } from '@angular/core/testing';
import { TestBed   } from '@angular/core/testing';
import { tick      } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { RouterModule   } from '@angular/router';

import { of           } from 'rxjs';
import { Subscription } from 'rxjs';
import { throwError   } from 'rxjs';

import { PageComponent         } from 'src/app/core';
import { TodoListTaskNavigator } from 'src/app/core';

import { TodoListTaskViewModel    } from '../todo-list-task/todo-list-task.view-model';
import { AddTodoListTaskComponent } from './add-todo-list-task.component';
import { AddTodoListTaskViewModel } from './add-todo-list-task.view-model';

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
class TodoListTaskComponentMock {
  public validateForm(): void {}

  public get form(): any { return; }

  @Input()
  public task: any;
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
        {
          provide: TodoListTaskNavigator,
          useValue: jasmine.createSpyObj(TodoListTaskNavigator, [ 'navigateToUpdateTodoListTask', ]),
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

    const taskSpy = descs.task.get as jasmine.Spy<() => TodoListTaskViewModel>;
    taskSpy.and.returnValue(new TodoListTaskViewModel());

    const fixture = TestBed.createComponent(AddTodoListTaskComponent);
    fixture.detectChanges();

    tick();

    expect(vm.task.todoListId)
      .withContext('todoListId should be populated from URL')
      .toBe(todoListId);

    expect(vm.task.period)
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

    const taskSpy = descs.task.get as jasmine.Spy<() => TodoListTaskViewModel>;
    taskSpy.and.returnValue(new TodoListTaskViewModel());

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

    const taskSpy = descs.task.get as jasmine.Spy<() => TodoListTaskViewModel>;
    taskSpy.and.returnValue(new TodoListTaskViewModel());

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

    const taskSpy = descs.task.get as jasmine.Spy<() => TodoListTaskViewModel>;
    taskSpy.and.returnValue(new TodoListTaskViewModel());

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

    sub.add.calls.reset();

    fixture.componentInstance.onOkPressed();

    tick();

    expect(sub.add.calls.count())
      .withContext('add should not be called')
      .toBe(0);

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

  it('onOkPressed should navigate to update', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, AddTodoListTaskViewModel, TodoListTaskNavigator, ],
    (pm: jasmine.SpyObj<any>,
     sub: jasmine.SpyObj<Subscription>,
     vm: jasmine.SpyObj<AddTodoListTaskViewModel>,
     tltn: jasmine.SpyObj<TodoListTaskNavigator>) => {
    const todoListId = 'test todo list id';

    pm.get.and.returnValue(todoListId);

    const descs = Object.getOwnPropertyDescriptors(vm)!;

    const taskSpy = descs.task.get as jasmine.Spy<() => TodoListTaskViewModel>;
    taskSpy.and.returnValue(new TodoListTaskViewModel());

    const fixture = TestBed.createComponent(AddTodoListTaskComponent);
    fixture.detectChanges();

    tick();

    let validateFormSpy: jasmine.Spy<any>;
    let formSpy: jasmine.Spy<jasmine.Func>;

    const todoListTaskComponent = fixture.debugElement.query(By.directive(TodoListTaskComponentMock)).componentInstance;

    validateFormSpy = spyOn(todoListTaskComponent, 'validateForm');
    formSpy = spyOnProperty(todoListTaskComponent, 'form');

    formSpy.and.returnValue({
      valid: true,
    });

    sub.add.calls.reset();

    vm.add.and.returnValue(of(void 0));

    fixture.componentInstance.onOkPressed();

    tick();

    expect(sub.add.calls.count())
      .withContext('add should be called once')
      .toBe(1);

    expect(vm.add.calls.count())
      .withContext('add should be called once')
      .toBe(1);

    expect(validateFormSpy.calls.count())
      .withContext('validateForm should be called')
      .toBe(1);

    expect(formSpy.calls.count())
      .withContext('form should be called')
      .toBe(1);

    expect(tltn.navigateToUpdateTodoListTask.calls.count())
      .withContext('navigateToUpdateTodoListTask should be called')
      .toBe(1);
  })));

  it('onOkPressed should show error toast', fakeAsync(inject(
    [ PARAM_MAP_TOKEN, Subscription, AddTodoListTaskViewModel, TodoListTaskNavigator, ],
    (pm: jasmine.SpyObj<any>,
     sub: jasmine.SpyObj<Subscription>,
     vm: jasmine.SpyObj<AddTodoListTaskViewModel>,
     tltn: jasmine.SpyObj<TodoListTaskNavigator>) => {
    const todoListId = 'test todo list id';

    pm.get.and.returnValue(todoListId);

    const descs = Object.getOwnPropertyDescriptors(vm)!;

    const taskSpy = descs.task.get as jasmine.Spy<() => TodoListTaskViewModel>;
    taskSpy.and.returnValue(new TodoListTaskViewModel());

    const fixture = TestBed.createComponent(AddTodoListTaskComponent);
    fixture.detectChanges();

    tick();

    let validateFormSpy: jasmine.Spy<any>;
    let formSpy: jasmine.Spy<jasmine.Func>;

    const todoListTaskComponent = fixture.debugElement.query(By.directive(TodoListTaskComponentMock)).componentInstance;

    validateFormSpy = spyOn(todoListTaskComponent, 'validateForm');
    formSpy = spyOnProperty(todoListTaskComponent, 'form');

    formSpy.and.returnValue({
      valid: true,
    });

    sub.add.calls.reset();

    vm.add.and.returnValue(throwError(() => 'error'));

    const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
    const errorSpy = spyOn(toastsComponent, 'error');

    fixture.componentInstance.onOkPressed();

    tick();

    expect(sub.add.calls.count())
      .withContext('add should be called once')
      .toBe(1);

    expect(vm.add.calls.count())
      .withContext('add should be called once')
      .toBe(1);

    expect(validateFormSpy.calls.count())
      .withContext('validateForm should be called')
      .toBe(1);

    expect(formSpy.calls.count())
      .withContext('form should be called')
      .toBe(1);

    expect(tltn.navigateToUpdateTodoListTask.calls.count())
      .withContext('navigateToUpdateTodoListTask should not be called')
      .toBe(0);

    expect(errorSpy.calls.count())
      .withContext('error should be called')
      .toBe(1);
  })));
});
