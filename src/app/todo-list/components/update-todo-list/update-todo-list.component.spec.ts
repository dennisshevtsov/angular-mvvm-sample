import { Component        } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ComponentFixture } from '@angular/core/testing';
import { fakeAsync        } from '@angular/core/testing';
import { inject           } from '@angular/core/testing';
import { TestBed          } from '@angular/core/testing';
import { tick             } from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';

import { of           } from 'rxjs';
import { Subscription } from 'rxjs';
import { throwError   } from 'rxjs';

import { CoreModule        } from 'src/app/core';
import { PageComponent     } from 'src/app/core';
import { RouteCleaner      } from 'src/app/core';
import { TodoListLinks     } from 'src/app/core';
import { TodoListTaskLinks } from 'src/app/core';

import { UpdateTodoListRequestDto } from 'src/app/todo-list/api';
import { UpdateTodoListComponent  } from './update-todo-list.component';
import { UpdateTodoListViewModel  } from './update-todo-list.view-model';

@Component({
  selector: 'app-modal',
})
class ModalComponentMock {
  public show(): void {}
}

@Component({
  selector: 'app-toasts',
})
class ToastsComponentMock {
  public info(message: string): void {}

  public error(message: string): void {}
}

@Component({
  selector: 'todo-list',
})
class TodoListComponentMock {
  public validateForm(): void {}

  public get form(): any { return; }
}

describe('UpdateTodoListComponent', () => {
  let fixture: ComponentFixture<UpdateTodoListComponent>;

  beforeEach(() => {
    const vmSpy = jasmine.createSpyObj('UpdateTodoListViewModel', ['initialize', 'update'], ['todoList']);
    vmSpy.initialize.and.returnValue(of(void 0));

    const todoListPropertyDescriptor = Object.getOwnPropertyDescriptor(vmSpy, 'todoList')!;
    const todoListSpy = todoListPropertyDescriptor.get as jasmine.Spy<() => UpdateTodoListRequestDto>;

    todoListSpy.and.returnValue(new UpdateTodoListRequestDto());

    TestBed.overrideProvider(
      UpdateTodoListViewModel,
      {
        useValue: vmSpy,
      });

    TestBed.configureTestingModule({
      declarations: [
        UpdateTodoListComponent,
        ToastsComponentMock,
        TodoListComponentMock,
        PageComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({get: (key: string) => 'test'}),
            fragment: of({'added': ''}),
          },
        },
        {
          provide: TodoListLinks,
          useValue: jasmine.createSpyObj(
            TodoListLinks,
            [
              'addTodoListLink',
              'updateTodoListLink',
              'searchTodoListsLink',
            ]),
        },
        {
          provide: TodoListTaskLinks,
          useValue: jasmine.createSpyObj(
            TodoListTaskLinks,
            [
              'addTodoListTaskLink',
              'updateTodoListTaskLink',
              'searchTodoListTasksLink',
            ]),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    TestBed.overrideModule(
      CoreModule,
      {
        set: {
          declarations: [
            PageComponent,
            ModalComponentMock,
            ToastsComponentMock,
          ],
          exports: [
            PageComponent,
            ModalComponentMock,
            ToastsComponentMock,
          ],
        }
      }
    );

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

    TestBed.overrideProvider(
      RouteCleaner,
      {
        useValue: jasmine.createSpyObj(RouteCleaner, ['clean']),
      });

    fixture = TestBed.createComponent(UpdateTodoListComponent);
  });

  it('ngOnInit should call initialize', fakeAsync(inject(
    [
      Subscription,
      UpdateTodoListViewModel,
    ],
    (
      subSpy: jasmine.SpyObj<Subscription>,
      vmSpy: jasmine.SpyObj<UpdateTodoListViewModel>,
    ) => {
    subSpy.add.calls.reset();
    fixture.detectChanges();

    tick();

    expect(subSpy.add.calls.count())
      .withContext('add should be called twice')
      .toBe(2);

    expect(vmSpy.initialize.calls.count())
      .withContext('initialize should be called once')
      .toBe(1);
  })));

  it('ngOnDestroy should unsubscribe', fakeAsync(inject(
    [
      Subscription,
    ],
    (
      subSpy: jasmine.SpyObj<Subscription>,
    ) => {
    fixture.detectChanges();

    tick();

    fixture.componentInstance.ngOnDestroy();

    expect(subSpy.unsubscribe.calls.count())
      .withContext('unsubscribe should be called once')
      .toBe(1);
  })));

  it('onOkPressed should not call update', fakeAsync(inject(
    [
      Subscription,
      UpdateTodoListViewModel,
    ],
    (
      subSpy: jasmine.SpyObj<Subscription>,
      vmSpy: jasmine.SpyObj<UpdateTodoListViewModel>,
    ) => {
    subSpy.add.calls.reset();
    fixture.detectChanges();

    vmSpy.update.and.returnValue(of(void 0));

    const todoListComponent = fixture.debugElement.query(By.directive(TodoListComponentMock)).componentInstance;

    const validateFormSpy: jasmine.Spy<any> = spyOn(todoListComponent, 'validateForm');
    const formSpy: jasmine.Spy<jasmine.Func> = spyOnProperty(todoListComponent, 'form');

    formSpy.and.returnValue({
      valid: false,
    });

    tick();

    subSpy.add.calls.reset();
    fixture.componentInstance.onOkPressed();

    tick();

    expect(vmSpy.update.calls.count())
      .withContext('update should be called once')
      .toBe(0);

    expect(validateFormSpy.calls.count())
      .withContext('validateForm should be called')
      .toBe(1);

    expect(formSpy.calls.count())
      .withContext('form should be called')
      .toBe(1);

    expect(subSpy.add.calls.count())
      .withContext('add should not be called')
      .toBe(0);
  })));

  it('onOkPressed should call update', fakeAsync(inject(
    [
      Subscription,
      UpdateTodoListViewModel,
    ],
    (
      subSpy: jasmine.SpyObj<Subscription>,
      vmSpy: jasmine.SpyObj<UpdateTodoListViewModel>,
    ) => {
    fixture.detectChanges();

    vmSpy.update.and.returnValue(of(void 0));

    const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
    const infoSpy = spyOn(toastsComponent, 'info');
    const errorSpy = spyOn(toastsComponent, 'error');

    const todoListComponent = fixture.debugElement.query(By.directive(TodoListComponentMock)).componentInstance;

    const validateFormSpy: jasmine.Spy<any> = spyOn(todoListComponent, 'validateForm');
    const formSpy: jasmine.Spy<jasmine.Func> = spyOnProperty(todoListComponent, 'form');

    formSpy.and.returnValue({
      valid: true,
    });

    tick();

    subSpy.add.calls.reset();
    fixture.componentInstance.onOkPressed();

    tick();

    expect(vmSpy.update.calls.count())
      .withContext('update should be called once')
      .toBe(1);

    expect(infoSpy.calls.count())
      .withContext('update should be called once')
      .toBe(1);

    expect(errorSpy.calls.count())
      .withContext('update should not be called')
      .toBe(0);

    expect(validateFormSpy.calls.count())
      .withContext('validateForm should be called')
      .toBe(1);

    expect(formSpy.calls.count())
      .withContext('form should be called')
      .toBe(1);

    expect(subSpy.add.calls.count())
      .withContext('add should be called once')
      .toBe(1);
  })));

  it('onOkPressed should show error', fakeAsync(inject(
    [
      Subscription,
      UpdateTodoListViewModel,
    ],
    (
      subSpy: jasmine.SpyObj<Subscription>,
      vmSpy: jasmine.SpyObj<UpdateTodoListViewModel>,
    ) => {
    fixture.detectChanges();

    vmSpy.update.and.returnValue(throwError(() => ''));

    const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
    const infoSpy = spyOn(toastsComponent, 'info');
    const errorSpy = spyOn(toastsComponent, 'error');

    const todoListComponent = fixture.debugElement.query(By.directive(TodoListComponentMock)).componentInstance;

    const validateFormSpy: jasmine.Spy<any> = spyOn(todoListComponent, 'validateForm');
    const formSpy: jasmine.Spy<jasmine.Func> = spyOnProperty(todoListComponent, 'form');

    formSpy.and.returnValue({
      valid: true,
    });

    tick();

    subSpy.add.calls.reset();
    fixture.componentInstance.onOkPressed();

    tick();

    expect(vmSpy.update.calls.count())
      .withContext('update should be called once')
      .toBe(1);

    expect(infoSpy.calls.count())
      .withContext('update should not be called')
      .toBe(0);

    expect(errorSpy.calls.count())
      .withContext('update should be called once')
      .toBe(1);

    expect(validateFormSpy.calls.count())
      .withContext('validateForm should be called')
      .toBe(1);

    expect(formSpy.calls.count())
      .withContext('form should be called')
      .toBe(1);

    expect(subSpy.add.calls.count())
      .withContext('add should be called once')
      .toBe(1);
  })));
});
