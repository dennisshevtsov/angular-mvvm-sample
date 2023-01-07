import { Component } from '@angular/core';

import { ComponentFixture } from '@angular/core/testing';
import { fakeAsync        } from '@angular/core/testing';
import { TestBed          } from '@angular/core/testing';
import { tick             } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';

import { ActivatedRoute } from '@angular/router';
import { RouterModule   } from '@angular/router';

import { of           } from 'rxjs';
import { Subscription } from 'rxjs';
import { throwError   } from 'rxjs';

import { CoreModule        } from 'src/app/core';
import { PageComponent     } from 'src/app/core';
import { RouteCleaner      } from 'src/app/core';
import { TodoListLinks     } from 'src/app/core';
import { TodoListTaskLinks } from 'src/app/core';

import { UpdateTodoListRequestDto } from 'src/app/todo-list/api';
import { TodoListComponent        } from 'src/app/todo-list/components/todo-list/todo-list.component';
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

describe('UpdateTodoListComponent', () => {
  let fixture: ComponentFixture<UpdateTodoListComponent>;

  let unsub: jasmine.Spy<() => void>;
  let add  : jasmine.Spy<(sub: Subscription) => void>;
  let vm   : jasmine.SpyObj<UpdateTodoListViewModel>;
  let rc   : jasmine.SpyObj<RouteCleaner>;
  let tll  : jasmine.SpyObj<TodoListLinks>;
  let tltl : jasmine.SpyObj<TodoListTaskLinks>;

  beforeEach(() => {
    tll = jasmine.createSpyObj(
      TodoListLinks,
      [
        'addTodoListLink',
        'updateTodoListLink',
        'searchTodoListsLink',
      ]);
    tltl = jasmine.createSpyObj(
      TodoListTaskLinks,
      [
        'addTodoListTaskLink',
        'updateTodoListTaskLink',
        'searchTodoListTasksLink',
      ]);

    vm = jasmine.createSpyObj('UpdateTodoListViewModel', ['initialize', 'update'], ['todoList']);
    vm.initialize.and.returnValue(of(void 0));

    const todoListPropertyDescriptor = Object.getOwnPropertyDescriptor(vm, 'todoList')!;
    const todoListSpy = todoListPropertyDescriptor.get as jasmine.Spy<() => UpdateTodoListRequestDto>;

    todoListSpy.and.returnValue(new UpdateTodoListRequestDto());

    TestBed.overrideProvider(
      UpdateTodoListViewModel,
      {
        useValue: vm,
      });

    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        UpdateTodoListComponent,
      ],
      imports: [
        CoreModule,
        ReactiveFormsModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => 'test',
            }),
            fragment: of({
              'added': '',
            }),
          },
        },
        {
          provide: TodoListLinks,
          useValue: tll,
        },
        {
          provide: TodoListTaskLinks,
          useValue: tltl,
        },
      ],
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

    const sub = new Subscription();

    unsub = spyOn(sub, 'unsubscribe');
    add = spyOn(sub, 'add');

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: sub,
      },
    );

    rc = jasmine.createSpyObj(
      RouteCleaner,
      [
        'clean',
      ]);

    TestBed.overrideProvider(
      RouteCleaner,
      {
        useValue: rc,
      });

    fixture = TestBed.createComponent(UpdateTodoListComponent);
  });

  it('ngOnInit should call initialize', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    expect(add.calls.count())
      .withContext('add should be called twice')
      .toBe(2);

    expect(vm.initialize.calls.count())
      .withContext('initialize should be called once')
      .toBe(1);
  }));

  it('ngOnDestroy should unsubscribe', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.componentInstance.ngOnDestroy();

    expect(unsub.calls.count())
      .withContext('unsubscribe should be called once')
      .toBe(1);
  }));

  it('onOkPressed should not call update', fakeAsync(() => {
    fixture.detectChanges();

    vm.update.and.returnValue(of(void 0));

    const titleControl = fixture.debugElement.query(By.css('#txtTitle')).nativeElement;

    titleControl.value = '';
    titleControl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    tick();

    fixture.componentInstance.onOkPressed();

    tick();

    expect(vm.update.calls.count())
      .withContext('update should be called once')
      .toBe(0);
  }));

  it('onOkPressed should call update', fakeAsync(() => {
    fixture.detectChanges();

    vm.update.and.returnValue(of(void 0));

    const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
    const infoSpy = spyOn(toastsComponent, 'info');
    const errorSpy = spyOn(toastsComponent, 'error');

    const titleControl = fixture.debugElement.query(By.css('#txtTitle')).nativeElement;

    titleControl.value = 'test';
    titleControl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    tick();

    fixture.componentInstance.onOkPressed();

    tick();

    expect(vm.update.calls.count())
      .withContext('update should be called once')
      .toBe(1);

    expect(infoSpy.calls.count())
      .withContext('update should be called once')
      .toBe(1);

    expect(errorSpy.calls.count())
      .withContext('update should not be called')
      .toBe(0);
  }));

  it('onOkPressed should show error', fakeAsync(() => {
    fixture.detectChanges();

    vm.update.and.returnValue(throwError(() => ''));

    const toastsComponent = fixture.debugElement.query(By.directive(ToastsComponentMock)).componentInstance;
    const infoSpy = spyOn(toastsComponent, 'info');
    const errorSpy = spyOn(toastsComponent, 'error');

    const titleControl = fixture.debugElement.query(By.css('#txtTitle')).nativeElement;

    titleControl.value = 'test';
    titleControl.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    tick();

    fixture.componentInstance.onOkPressed();

    tick();

    expect(vm.update.calls.count())
      .withContext('update should be called once')
      .toBe(1);

    expect(infoSpy.calls.count())
      .withContext('update should not be called')
      .toBe(0);

    expect(errorSpy.calls.count())
      .withContext('update should be called once')
      .toBe(1);
  }));
});
