import { Component,                         } from '@angular/core';
import { fakeAsync, inject, TestBed, tick,  } from '@angular/core/testing';
import { By,                                } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap,          } from '@angular/router';

import { of, Subscription, throwError,      } from 'rxjs';

import { PageComponent, TodoListTaskLinks,
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

@Component({
  selector: 'todo-list-task',
})
export class TodoListTaskComponentMock {
  public validateForm(): void {}

  public get form(): any { return; }
}

describe('UpdateTodoListTaskComponent', () => {
  beforeEach(() => {
    const paramMapSpy = jasmine.createSpyObj(
      PARAM_MAP_TOKEN, [ 'get', ]);

    TestBed.configureTestingModule({
      declarations: [
        UpdateTodoListTaskComponent,
        ToastsComponentMock,
        TodoListTaskComponentMock,
        PageComponent,
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
          useValue: jasmine.createSpyObj(TodoListTaskLinks, ['searchTodoListTasksLink', 'addTodoListTaskLink']),
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
            'update',
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

  it('ngOnInit should initialize vm', fakeAsync(inject(
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

  it('ngOnDestroy should unsubscribe', inject(
    [
      Subscription,
      UpdateTodoListTaskViewModel,
    ],
    (
      subSpy: jasmine.SpyObj<Subscription>,
      vmSpy: jasmine.SpyObj<UpdateTodoListTaskViewModel>,
    ) => {
    const vmSpyDescs = Object.getOwnPropertyDescriptors(vmSpy);
    const taskPropSpy = vmSpyDescs.task.get as jasmine.Spy<() => UpdateTodoListTaskRequestDto>;

    taskPropSpy.and.returnValue(new UpdateTodoListTaskRequestDto());

    const fixture = TestBed.createComponent(UpdateTodoListTaskComponent);

    fixture.detectChanges();

    fixture.componentInstance.ngOnDestroy();

    expect(subSpy.unsubscribe.calls.count())
      .withContext('sub.unsubscribe should be called')
      .toBe(1);
  }));

  it('onOkPressed should validate form', fakeAsync(inject(
    [
      Subscription,
      UpdateTodoListTaskViewModel,
    ],
    (
      subSpy: jasmine.SpyObj<Subscription>,
      vmSpy: jasmine.SpyObj<UpdateTodoListTaskViewModel>,
    ) => {
    const vmSpyDescs = Object.getOwnPropertyDescriptors(vmSpy);
    const taskPropSpy = vmSpyDescs.task.get as jasmine.Spy<() => UpdateTodoListTaskRequestDto>;

    taskPropSpy.and.returnValue(new UpdateTodoListTaskRequestDto());

    const fixture = TestBed.createComponent(UpdateTodoListTaskComponent);

    const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
    const infoSpy = spyOn(toastsComponent, 'info');
    const errorSpy = spyOn(toastsComponent, 'error');

    fixture.detectChanges();

    tick();

    const todoListTaskComponent = fixture.debugElement.query(By.directive(TodoListTaskComponentMock)).componentInstance;

    const validateFormSpy: jasmine.Spy<any> = spyOn(todoListTaskComponent, 'validateForm');
    const formSpy: jasmine.Spy<jasmine.Func> = spyOnProperty(todoListTaskComponent, 'form');

    formSpy.and.returnValue({
      valid: false,
    });

    subSpy.add.calls.reset();
    infoSpy.calls.reset();

    fixture.componentInstance.onOkPressed();

    expect(validateFormSpy.calls.count())
      .withContext('validateForm should be called')
      .toBe(1);

    expect(formSpy.calls.count())
      .withContext('form should be called')
      .toBe(1);

    expect(subSpy.add.calls.count())
      .withContext('subscritpion.add should not be called')
      .toBe(0);

    expect(vmSpy.update.calls.count())
      .withContext('vm.update should not be called')
      .toBe(0);

    expect(infoSpy.calls.count())
      .withContext('info should not be called')
      .toBe(0);

    expect(errorSpy.calls.count())
      .withContext('error should not be called')
      .toBe(0);

    validateFormSpy.calls.reset();
    formSpy.calls.reset();

    formSpy.and.returnValue({
      valid: true,
    });

    vmSpy.update.and.returnValue(of(void 0));

    fixture.componentInstance.onOkPressed();

    expect(validateFormSpy.calls.count())
      .withContext('validateForm should be called')
      .toBe(1);

    expect(formSpy.calls.count())
      .withContext('form should be called')
      .toBe(1);

    expect(subSpy.add.calls.count())
      .withContext('subscritpion.add should be called')
      .toBe(1);

    expect(vmSpy.update.calls.count())
      .withContext('vm.update should be called')
      .toBe(1);

    expect(infoSpy.calls.count())
      .withContext('info should be called')
      .toBe(1);

    expect(errorSpy.calls.count())
      .withContext('error should not be called')
      .toBe(0);

    validateFormSpy.calls.reset();
    formSpy.calls.reset();
    subSpy.add.calls.reset();
    vmSpy.update.calls.reset();
    infoSpy.calls.reset();

    vmSpy.update.and.returnValue(throwError(() => 'error'));

    fixture.componentInstance.onOkPressed();

    expect(validateFormSpy.calls.count())
      .withContext('validateForm should be called')
      .toBe(1);

    expect(formSpy.calls.count())
      .withContext('form should be called')
      .toBe(1);

    expect(subSpy.add.calls.count())
      .withContext('subscritpion.add should be called')
      .toBe(1);

    expect(vmSpy.update.calls.count())
      .withContext('vm.update should be called')
      .toBe(1);

    expect(infoSpy.calls.count())
      .withContext('info should not be called')
      .toBe(0);

    expect(errorSpy.calls.count())
      .withContext('error should be called')
      .toBe(1);
  })));
});
