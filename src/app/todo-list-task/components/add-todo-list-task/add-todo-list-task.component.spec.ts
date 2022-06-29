import { inject, TestBed, waitForAsync, } from '@angular/core/testing';
import { ActivatedRoute, RouterModule,  } from '@angular/router';

import { of, Subscription, } from 'rxjs';

import { AddTodoListTaskRequestDto, } from 'src/app/todo-list-task/api';
import { AddTodoListTaskComponent,  } from './add-todo-list-task.component';
import { AddTodoListTaskViewModel,  } from './add-todo-list-task.view-model';

describe('AddTodoListTaskComponent', () => {
  const todoListId = 'test todo list id';

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoListTaskComponent, ],
      imports: [ RouterModule.forRoot([]), ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({ get: (key: string) => todoListId, }),
        },
      }],
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
    [Subscription, AddTodoListTaskViewModel, ],
    (sub: jasmine.SpyObj<Subscription>,
     vm: jasmine.SpyObj<AddTodoListTaskViewModel>) => {
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

  it('ngOnDestroy should call unsubscribe', waitForAsync(inject(
    [ Subscription, AddTodoListTaskViewModel, ],
    (sub: jasmine.SpyObj<Subscription>,
     vm: jasmine.SpyObj<AddTodoListTaskViewModel>) => {
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
