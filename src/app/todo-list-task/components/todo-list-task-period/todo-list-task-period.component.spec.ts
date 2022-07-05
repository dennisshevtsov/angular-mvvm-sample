import { inject, TestBed,              } from '@angular/core/testing';
import { AbstractControl, FormBuilder,
         FormGroup                     } from '@angular/forms';

import { Observable, of, Subscription, } from 'rxjs';

import { TodoListTaskPeriodComponent,  } from './todo-list-task-period.component';

describe('TodoListTaskPeriodComponent', () => {
  const controlSpy: jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', [], [ 'valueChanges', ])
  const controlSpyDescs = Object.getOwnPropertyDescriptors(controlSpy);
  const valueChangesSpy = controlSpyDescs.valueChanges.get! as jasmine.Spy<() => Observable<any>>;
  valueChangesSpy.and.returnValue(of({}));

  const formSpy : jasmine.SpyObj<FormGroup> = jasmine.createSpyObj('FormGroup', [ 'get', ], [ 'value', ]);
  const formSpyDescs = Object.getOwnPropertyDescriptors(formSpy);
  const valueSpy = formSpyDescs.value.get! as jasmine.Spy<() => any>;

  formSpy.get.and.returnValue(controlSpy);
  valueSpy.and.returnValue({});

  const fbSpy : jasmine.SpyObj<FormBuilder> = jasmine.createSpyObj(FormBuilder, [ 'group', ]);
  fbSpy.group.and.returnValue(formSpy);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListTaskPeriodComponent, ],
      providers: [
        { provide: FormBuilder    , useValue: fbSpy,      },
        { provide: AbstractControl, useValue: controlSpy, }, ],
    });

    TestBed.overrideProvider(Subscription, { useValue: jasmine.createSpyObj(Subscription, [ 'add', 'unsubscribe', ])});
  });

  it('ngOnInit should subscribe validation to full day control',
     inject(
      [Subscription, AbstractControl],
      (subSpy    : jasmine.SpyObj<Subscription>,
       controlSpy: jasmine.SpyObj<AbstractControl>) => {
    const fixture = TestBed.createComponent(TodoListTaskPeriodComponent);

    fixture.detectChanges();

    expect(subSpy.add.calls.count())
      .withContext('add should be called')
      .toBe(1);

      const valueChangesSpy = controlSpyDescs.valueChanges.get! as jasmine.Spy<() => Observable<any>>;

    expect(valueChangesSpy.calls.count())
      .withContext('valueChanges should be subscribed')
      .toBe(1);
  }));
});
