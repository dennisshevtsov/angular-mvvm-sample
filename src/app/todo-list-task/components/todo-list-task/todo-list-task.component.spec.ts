import { Component        } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { inject  } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { FormGroup   } from '@angular/forms';

import { Observable   } from 'rxjs';
import { of           } from 'rxjs';
import { Subscription } from 'rxjs';

import { TodoListTaskComponent } from './todo-list-task.component';
import { TodoListTaskViewModel } from './todo-list-task.view-model';

@Component({
  selector: 'todo-list-task-period',
})
class TodoListTaskPeriodMock { }

describe('TodoListTaskComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListTaskPeriodMock, TodoListTaskComponent, ],
      providers: [
        {
          provide: FormBuilder,
          useValue: jasmine.createSpyObj(FormBuilder, [ 'group', 'control', ]),
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
    const requestDto = new TodoListTaskViewModel(
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
    const requestDto = new TodoListTaskViewModel(
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
