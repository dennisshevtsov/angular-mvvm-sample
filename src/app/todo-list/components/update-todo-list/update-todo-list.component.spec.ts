import { Component,                 } from '@angular/core';
import { ComponentFixture, TestBed,
         waitForAsync,              } from '@angular/core/testing';
import { ReactiveFormsModule,       } from '@angular/forms';
import { ActivatedRoute,
         RouterModule,              } from '@angular/router';

import { of, Subscription,          } from 'rxjs';

import { CoreModule,
         PageComponent,
         RouteCleaner,
         TodoListLinks,
         TodoListTaskLinks,         } from 'src/app/core';
import { UpdateTodoListRequestDto,  } from '../../api';
import { TodoListComponent,         } from '../todo-list/todo-list.component';
import { UpdateTodoListComponent,   } from './update-todo-list.component';
import { UpdateTodoListViewModel,   } from './update-todo-list.view-model';

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

    vm = jasmine.createSpyObj(
      'UpdateTodoListViewModel',
      [
        'initialize',
      ],
      [
        'todoList',
      ]);

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

  it('ngOnInit should call initialize', waitForAsync(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(add.calls.count())
        .withContext('add should be called twice')
        .toBe(2);

      expect(vm.initialize.calls.count())
        .withContext('initialize should be called once')
        .toBe(1);
    })
  }));

  it('ngOnDestroy should unsubscribe', () => {
    fixture.detectChanges();

    fixture.componentInstance.ngOnDestroy();

    expect(unsub.calls.count())
      .withContext('unsubscribe should be called once')
      .toBe(1);
  });
});
