import { inject, TestBed,              } from '@angular/core/testing';
import { AbstractControl, FormBuilder,
         FormGroup                     } from '@angular/forms';

import { Observable, of, Subscription, } from 'rxjs';

import { TodoListTaskDateDto,          } from 'src/app/todo-list-task/api';
import { TodoListTaskPeriodComponent,  } from './todo-list-task-period.component';

describe('TodoListTaskPeriodComponent', () => {
  beforeEach(() => {
    const controlSpy: jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', [], [ 'valueChanges', ])
    const controlSpyDescs = Object.getOwnPropertyDescriptors(controlSpy);
    const valueChangesSpy = controlSpyDescs.valueChanges.get! as jasmine.Spy<() => Observable<any>>;
    valueChangesSpy.and.returnValue(of({}));

    const formSpy : jasmine.SpyObj<FormGroup> = jasmine.createSpyObj('FormGroup', [ 'get', 'setValue', ], [ 'value', 'valueChanges', ]);
    const formSpyDescs = Object.getOwnPropertyDescriptors(formSpy);
    const valueSpy = formSpyDescs.value.get! as jasmine.Spy<() => any>;

    formSpy.get.and.returnValue(controlSpy);
    valueSpy.and.returnValue({});

    const fbSpy : jasmine.SpyObj<FormBuilder> = jasmine.createSpyObj(FormBuilder, [ 'group', ]);
    fbSpy.group.and.returnValue(formSpy);

    TestBed.configureTestingModule({
      declarations: [ TodoListTaskPeriodComponent, ],
      providers: [
        { provide: FormBuilder    , useValue: fbSpy,      },
        { provide: FormGroup      , useValue: formSpy,    },
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

    const controlSpyDescs = Object.getOwnPropertyDescriptors(controlSpy);
    const valueChangesSpy = controlSpyDescs.valueChanges.get! as jasmine.Spy<() => Observable<any>>;

    expect(valueChangesSpy.calls.count())
      .withContext('valueChanges should be subscribed')
      .toBe(1);
  }));

  it('ngOnDestroy should unsubscribe',
     inject([Subscription], (subSpy: jasmine.SpyObj<Subscription>) => {
    const fixture = TestBed.createComponent(TodoListTaskPeriodComponent);

    fixture.detectChanges();

    subSpy.add.calls.reset();
    subSpy.unsubscribe.calls.reset();

    fixture.componentInstance.ngOnDestroy();

    expect(subSpy.add.calls.count())
      .withContext('add should not be called')
      .toBe(0);

    expect(subSpy.unsubscribe.calls.count())
      .withContext('add should be called')
      .toBe(1);
  }));

  it('writeValue should populate form',
     inject([FormGroup], (formSpy: jasmine.SpyObj<FormGroup>) => {
    const fixture = TestBed.createComponent(TodoListTaskPeriodComponent);

    fixture.detectChanges();

    fixture.componentInstance.writeValue(null!);

    expect(formSpy.setValue.calls.count())
      .withContext('setValue should not be called')
      .toBe(0);

    const periodDto = new TodoListTaskDateDto(100000, false, 200000, 300000)

    fixture.componentInstance.writeValue(periodDto);

    expect(formSpy.setValue.calls.count())
      .withContext('setValue should be called')
      .toBe(1);

    const setValueParam: any = formSpy.setValue.calls.first().args[0];

    expect(setValueParam)
      .withContext('setValue should be called with defined param')
      .toBeDefined();

    expect(setValueParam.day)
      .withContext('setValue should be called with correct day')
      .toBe(periodDto.day);

    expect(setValueParam.fullDay)
      .withContext('setValue should be called with correct fullDay')
      .toBe(periodDto.fullDay);

    expect(setValueParam.start)
      .withContext('setValue should be called with correct start')
      .toBe(periodDto.start);

    expect(setValueParam.end)
      .withContext('setValue should be called with correct end')
      .toBe(periodDto.end);
  }));

  it('registerOnChange should populate form',
     inject(
      [Subscription, FormGroup],
      (subSpy: jasmine.SpyObj<Subscription>,
       formSpy: jasmine.SpyObj<FormGroup>) => {
    const fixture = TestBed.createComponent(TodoListTaskPeriodComponent);

    fixture.detectChanges();

    const fn = (value: any) => {};

    const formSpyDescs = Object.getOwnPropertyDescriptors(formSpy);
    const valueChangesSpy = formSpyDescs.valueChanges.get! as jasmine.Spy<() => Observable<any>>;

    valueChangesSpy.and.returnValue(of({}));

    subSpy.add.calls.reset();
    valueChangesSpy.calls.reset();

    fixture.componentInstance.registerOnChange(fn);

    expect(subSpy.add.calls.count())
      .withContext('add should be called')
      .toBe(1);

    expect(valueChangesSpy.calls.count())
      .withContext('valueChanges should be called')
      .toBe(1);
  }));

  it('registerOnTouched should subscribe valueChanges',
     inject(
      [Subscription, FormGroup],
      (subSpy: jasmine.SpyObj<Subscription>,
       formSpy: jasmine.SpyObj<FormGroup>) => {
    const fixture = TestBed.createComponent(TodoListTaskPeriodComponent);

    fixture.detectChanges();

    const fn = () => {};

    const formSpyDescs = Object.getOwnPropertyDescriptors(formSpy);
    const valueChangesSpy = formSpyDescs.valueChanges.get! as jasmine.Spy<() => Observable<any>>;

    valueChangesSpy.and.returnValue(of({}));

    subSpy.add.calls.reset();
    valueChangesSpy.calls.reset();

    fixture.componentInstance.registerOnTouched(fn);

    expect(subSpy.add.calls.count())
      .withContext('add should be called')
      .toBe(1);

    expect(valueChangesSpy.calls.count())
      .withContext('valueChanges should be called')
      .toBe(1);
  }));
});
