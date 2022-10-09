import { inject, TestBed,              } from '@angular/core/testing';
import { FormBuilder, FormGroup,       } from '@angular/forms';

import { Observable, of, Subscription, } from 'rxjs';

import { AddTodoListDayTaskRequestDto,
         TodoListTaskDateDto,          } from 'src/app/todo-list-task/api';
import { TodoListTaskComponent,        } from './todo-list-task.component';

describe('TodoListTaskComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListTaskComponent, ],
      providers: [
        {
          provide: FormBuilder,
          useValue: jasmine.createSpyObj(FormBuilder, [ 'group', 'control', ]),
        },
      ],
    });

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: jasmine.createSpyObj(Subscription, [ 'add', 'unsubscribe', ]),
      });
  });

  it('ngOnInit should initialize form', inject(
    [ Subscription, FormBuilder, ],
    (subSpy: jasmine.SpyObj<Subscription>,
     fbSpy : jasmine.SpyObj<FormBuilder>) => {
    const requestDto = new AddTodoListDayTaskRequestDto(
      'test todo list id',
      'test todo list title',
      'test todo list description');

    const formSpy: jasmine.SpyObj<FormGroup> =
      jasmine.createSpyObj('FormGroup', [ 'setValue', 'get', ], [ 'valueChanges', ]);

    fbSpy.group.and.returnValue(formSpy);

    const descs = Object.getOwnPropertyDescriptors(formSpy);
    const vcSpy = descs.valueChanges.get! as jasmine.Spy<() => Observable<any>>;

    vcSpy.and.returnValue(of(requestDto));

    const fixture = TestBed.createComponent(TodoListTaskComponent);

    fixture.componentInstance.task = requestDto;

    fixture.detectChanges();

    expect(formSpy.setValue.calls.count())
      .withContext('setValue should be called')
      .toBe(1);

    expect(vcSpy.calls.count())
      .withContext('valueChanges should be subscribed')
      .toBe(1);

    expect(subSpy.add.calls.count())
      .withContext('add should be called')
      .toBe(1);
  }));

  it('ngOnDestroy should unsubscribe', inject(
    [ Subscription, FormBuilder, ],
    (subSpy: jasmine.SpyObj<Subscription>,
     fbSpy : jasmine.SpyObj<FormBuilder>) => {
    const requestDto = new AddTodoListDayTaskRequestDto(
      'test todo list id',
      'test todo list title',
      'test todo list description');

    const formSpy: jasmine.SpyObj<FormGroup> =
      jasmine.createSpyObj('FormGroup', [ 'setValue', 'get', ], [ 'valueChanges', ]);

    fbSpy.group.and.returnValue(formSpy);

    const descs = Object.getOwnPropertyDescriptors(formSpy);
    const vcSpy = descs.valueChanges.get! as jasmine.Spy<() => Observable<any>>;

    vcSpy.and.returnValue(of(requestDto));

    const fixture = TestBed.createComponent(TodoListTaskComponent);

    fixture.componentInstance.task = requestDto;

    fixture.detectChanges();

    expect(formSpy.setValue.calls.count())
      .withContext('setValue should be called')
      .toBe(1);

    expect(vcSpy.calls.count())
      .withContext('valueChanges should be subscribed')
      .toBe(1);

    expect(subSpy.add.calls.count())
      .withContext('add should be called')
      .toBe(1);

    fixture.componentInstance.ngOnDestroy();

    expect(subSpy.unsubscribe.calls.count())
      .withContext('unsubscribe should be called')
      .toBe(1);
  }));
});
