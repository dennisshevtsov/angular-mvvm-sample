import { inject, TestBed, } from '@angular/core/testing';

import { Formatter,     } from 'src/app/core/formatting';
import { TimeComponent, } from './time.component';

describe('TimeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeComponent],
      providers: [
        {
          provide: Formatter,
          useValue: jasmine.createSpyObj(
            Formatter,
            ['toLocalDate', 'fromLocalDate', 'toLocalHours', 'toLocalMinutes']),
        },
      ],
    })
  });

  it('day should returns days in datetime value', inject([Formatter], (formatterSpy: jasmine.SpyObj<Formatter>) => {
    const component = TestBed.createComponent(TimeComponent);

    const days = 3;
    const dateTimeValue = days * 24 * 60 * 60 * 1000;

    formatterSpy.toLocalDate.and.returnValue(days.toString());

    component.componentInstance.writeValue(dateTimeValue);
    component.detectChanges();

    expect(component.componentInstance.day)
      .withContext('day should return days in value')
      .toBe(days.toString());

    expect(formatterSpy.toLocalDate.calls.count())
      .withContext('toLocalDate should be called')
      .toBeGreaterThan(1);
  }));

  it('day should set days in datetime value', inject([Formatter], (formatterSpy: jasmine.SpyObj<Formatter>) => {
    const component = TestBed.createComponent(TimeComponent);

    formatterSpy.fromLocalDate.and.returnValue(0);

    const onChangeSpy = jasmine.createSpy('onChange', () => {});
    component.componentInstance.registerOnChange(onChangeSpy);

    const onTouchedSpy = jasmine.createSpy('onTouched', () => {});
    component.componentInstance.registerOnTouched(onTouchedSpy);

    const days = 3;
    const dateTimeValue = days * 24 * 60 * 60 * 1000;

    component.componentInstance.writeValue(dateTimeValue);
    component.detectChanges();

    component.componentInstance.setDisabledState(true);
    component.componentInstance.day = days.toString();

    expect(formatterSpy.fromLocalDate.calls.count())
      .withContext('fromLocalDate should not be called')
      .toBe(0);

    expect(onChangeSpy.calls.count())
      .withContext('onChange should not be called')
      .toBe(0);

    expect(onTouchedSpy.calls.count())
      .withContext('onTouched should not be called')
      .toBe(0);

    component.componentInstance.setDisabledState(false);
    component.componentInstance.day = days.toString();

    expect(formatterSpy.fromLocalDate.calls.count())
      .withContext('fromLocalDate should be called')
      .toBe(1);

    expect(onChangeSpy.calls.count())
      .withContext('onChange should be called')
      .toBe(1);

    expect(onTouchedSpy.calls.count())
      .withContext('onTouched should be called')
      .toBe(1);
  }));

  it('hours should return hours', inject([Formatter], (formatterSpy: jasmine.SpyObj<Formatter>) => {
    const component = TestBed.createComponent(TimeComponent);

    const hours = 5;
    formatterSpy.toLocalHours.and.returnValue(hours);

    const dateTimeValue = 1000;
    component.componentInstance.writeValue(dateTimeValue);
    component.detectChanges();

    formatterSpy.toLocalHours.calls.reset();

    expect(component.componentInstance.hours)
      .withContext('hours should return correct value')
      .toBe(hours);

    expect(formatterSpy.toLocalHours.calls.count())
      .withContext('toLocalHours should not be called')
      .toBe(1);

    expect(formatterSpy.toLocalHours.calls.first().args[0])
      .withContext('toLocalHours should take datetime value')
      .toBe(dateTimeValue);
  }));

  it('minutes should return minutes', inject([Formatter], (formatterSpy: jasmine.SpyObj<Formatter>) => {
    const component = TestBed.createComponent(TimeComponent);

    const minutes = 5;
    formatterSpy.toLocalMinutes.and.returnValue(minutes);

    const dateTimeValue = 1000;
    component.componentInstance.writeValue(dateTimeValue);
    component.detectChanges();

    formatterSpy.toLocalMinutes.calls.reset();

    expect(component.componentInstance.minutes)
      .withContext('hours should return correct value')
      .toBe(minutes);

    expect(formatterSpy.toLocalMinutes.calls.count())
      .withContext('toLocalMinutes should not be called')
      .toBe(1);

    expect(formatterSpy.toLocalMinutes.calls.first().args[0])
      .withContext('toLocalMinutes should take datetime value')
      .toBe(dateTimeValue);
  }));

  it('increaseHours should add 1 hour to datetime value', inject([Formatter], (formatterSpy: jasmine.SpyObj<Formatter>) => {
    const component = TestBed.createComponent(TimeComponent);

    const onChangeSpy = jasmine.createSpy('onChange', () => {});
    component.componentInstance.registerOnChange(onChangeSpy);

    const onTouchedSpy = jasmine.createSpy('onTouched', () => {});
    component.componentInstance.registerOnTouched(onTouchedSpy);

    const hours = 7;
    const dateTimeValue = hours * 60 * 60 * 1000;

    component.componentInstance.writeValue(dateTimeValue);
    component.detectChanges();

    component.componentInstance.setDisabledState(true);
    component.componentInstance.increaseHours();

    formatterSpy.toLocalHours.calls.reset();
    component.componentInstance.hours;

    expect(formatterSpy.toLocalHours.calls.first().args[0])
      .withContext('datetime value should be kept')
      .toBe(dateTimeValue);

    expect(onChangeSpy.calls.count())
      .withContext('onChange should not be called')
      .toBe(0);

    expect(onTouchedSpy.calls.count())
      .withContext('onTouched should not be called')
      .toBe(0);

    component.componentInstance.setDisabledState(false);
    component.componentInstance.increaseHours();

    formatterSpy.toLocalHours.calls.reset();
    component.componentInstance.hours;

    expect(formatterSpy.toLocalHours.calls.first().args[0])
      .withContext('1 hour should be added from datetime value')
      .toBe((hours + 1) * 60 * 60 * 1000);

    expect(onChangeSpy.calls.count())
      .withContext('onChange should be called')
      .toBe(1);

    expect(onTouchedSpy.calls.count())
      .withContext('onTouched should be called')
      .toBe(1);
  }));

  it('decreaseHours should remove 1 hour to datetime value', inject([Formatter], (formatterSpy: jasmine.SpyObj<Formatter>) => {
    const component = TestBed.createComponent(TimeComponent);

    const onChangeSpy = jasmine.createSpy('onChange', () => {});
    component.componentInstance.registerOnChange(onChangeSpy);

    const onTouchedSpy = jasmine.createSpy('onTouched', () => {});
    component.componentInstance.registerOnTouched(onTouchedSpy);

    const hours = 7;
    const dateTimeValue = hours * 60 * 60 * 1000;

    component.componentInstance.writeValue(dateTimeValue);
    component.detectChanges();

    component.componentInstance.setDisabledState(true);
    component.componentInstance.decreaseHours();

    formatterSpy.toLocalHours.calls.reset();
    component.componentInstance.hours;

    expect(formatterSpy.toLocalHours.calls.first().args[0])
      .withContext('datetime value should be kept')
      .toBe(dateTimeValue);

    expect(onChangeSpy.calls.count())
      .withContext('onChange should not be called')
      .toBe(0);

    expect(onTouchedSpy.calls.count())
      .withContext('onTouched should not be called')
      .toBe(0);

    component.componentInstance.setDisabledState(false);
    component.componentInstance.decreaseHours();

    formatterSpy.toLocalHours.calls.reset();
    component.componentInstance.hours;

    expect(formatterSpy.toLocalHours.calls.first().args[0])
      .withContext('1 hour should be removed from datetime value')
      .toBe((hours - 1) * 60 * 60 * 1000);

    expect(onChangeSpy.calls.count())
      .withContext('onChange should be called')
      .toBe(1);

    expect(onTouchedSpy.calls.count())
      .withContext('onTouched should be called')
      .toBe(1);
  }));
});
