import { AbstractControl, } from '@angular/forms';
import { timePeriodValidator } from './time-period-validator';

describe('timePeriodValidator', () => {
  it('timePeriodValidator should not validate if it is full day', () => {
    const fullDayControlSpy : jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', [], ['value']);
    const fullDayControlSpyDescs = Object.getOwnPropertyDescriptors(fullDayControlSpy)!;
    const fullDayPropSpy = fullDayControlSpyDescs.value.get as jasmine.Spy<() => any>;

    fullDayPropSpy.and.returnValue(true);

    const startControlSpy : jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', ['setErrors'], ['pristine','touched','dirty']);
    const endControlSpy : jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', ['setErrors'], ['pristine','touched','dirty']);
    const timePeriodControlSpy: jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', ['get'], []);

    timePeriodControlSpy.get.and.callFake(name => {
      if (name == 'fullDay') {
        return fullDayControlSpy;
      }

      if (name == 'start') {
        return startControlSpy;
      }

      if (name == 'end') {
        return endControlSpy;
      }

      return null;
    });

    const errors = timePeriodValidator(timePeriodControlSpy);

    expect(errors)
      .withContext('timePeriodValidator should return empty errors')
      .toEqual({});

    expect(timePeriodControlSpy.get.calls.count())
      .withContext('timePeriodControl.get should be called')
      .toBe(3);

    expect(fullDayPropSpy.calls.count())
      .withContext('fullDayControl.value should be called')
      .toBe(1);
  });
});
