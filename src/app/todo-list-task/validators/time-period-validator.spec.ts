import { AbstractControl,     } from '@angular/forms';

import { timePeriodValidator, } from './time-period-validator';

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

  it('timePeriodValidator should not validate pre-populate control', () => {
    const fullDayControlSpy : jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', [], ['value']);
    const fullDayControlSpyDescs = Object.getOwnPropertyDescriptors(fullDayControlSpy)!;
    const fullDayPropSpy = fullDayControlSpyDescs.value.get as jasmine.Spy<() => any>;

    fullDayPropSpy.and.returnValue(false);

    const startControlSpy : jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', ['setErrors'], []);
    const endControlSpy : jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', ['setErrors'], []);

    const timePeriodControlSpy: jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', ['get'], ['pristine','touched','dirty']);
    const timePeriodControlSpyDescs = Object.getOwnPropertyDescriptors(timePeriodControlSpy)!;
    const timePeriodPristinePropSpy = timePeriodControlSpyDescs.pristine.get as jasmine.Spy<() => boolean>;
    const timePeriodTouchedPropSpy = timePeriodControlSpyDescs.touched.get as jasmine.Spy<() => boolean>;
    const timePeriodDirtyPropSpy = timePeriodControlSpyDescs.dirty.get as jasmine.Spy<() => boolean>;

    timePeriodPristinePropSpy.and.returnValue(true);
    timePeriodTouchedPropSpy.and.returnValue(false);
    timePeriodDirtyPropSpy.and.returnValue(false);

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

    expect(timePeriodPristinePropSpy.calls.count())
      .withContext('timePeriod.pristine should be called')
      .toBe(1);

    expect(timePeriodTouchedPropSpy.calls.count())
      .withContext('timePeriod.touched should be called')
      .toBe(1);

    expect(timePeriodDirtyPropSpy.calls.count())
      .withContext('timePeriod.dirty should be called')
      .toBe(1);
  });

  it('timePeriodValidator should populate errors', () => {
    const fullDayControlSpy : jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', [], ['value']);
    const fullDayControlSpyDescs = Object.getOwnPropertyDescriptors(fullDayControlSpy)!;
    const fullDayPropSpy = fullDayControlSpyDescs.value.get as jasmine.Spy<() => any>;

    fullDayPropSpy.and.returnValue(false);

    const startControlSpy : jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', ['setErrors'], ['value']);
    const startControlSpyDescs = Object.getOwnPropertyDescriptors(startControlSpy)!;
    const startControlValuePropSpy = startControlSpyDescs.value.get as jasmine.Spy<() => any>;

    const endControlSpy : jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', ['setErrors'], ['value']);
    const endControlSpyDescs = Object.getOwnPropertyDescriptors(endControlSpy)!;
    const endControlValuePropSpy = endControlSpyDescs.value.get as jasmine.Spy<() => any>;

    const timePeriodControlSpy: jasmine.SpyObj<AbstractControl> = jasmine.createSpyObj('AbstractControl', ['get'], ['pristine','touched','dirty']);
    const timePeriodControlSpyDescs = Object.getOwnPropertyDescriptors(timePeriodControlSpy)!;
    const timePeriodPristinePropSpy = timePeriodControlSpyDescs.pristine.get as jasmine.Spy<() => boolean>;
    const timePeriodTouchedPropSpy = timePeriodControlSpyDescs.touched.get as jasmine.Spy<() => boolean>;
    const timePeriodDirtyPropSpy = timePeriodControlSpyDescs.dirty.get as jasmine.Spy<() => boolean>;

    timePeriodPristinePropSpy.and.returnValue(false);
    timePeriodTouchedPropSpy.and.returnValue(true);
    timePeriodDirtyPropSpy.and.returnValue(true);

    startControlValuePropSpy.and.returnValue('');
    endControlValuePropSpy.and.returnValue('');

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
      .withContext('timePeriodValidator should return defined errors')
      .toBeDefined();

    expect(errors!['endRequired'])
      .withContext('timePeriodValidator should return endRequired')
      .toEqual(true);

    expect(errors!['startRequired'])
      .withContext('timePeriodValidator should return startRequired')
      .toEqual(true);

    expect(timePeriodControlSpy.get.calls.count())
      .withContext('timePeriodControl.get should be called')
      .toBe(3);

    expect(fullDayPropSpy.calls.count())
      .withContext('fullDayControl.value should be called')
      .toBe(1);

    expect(timePeriodPristinePropSpy.calls.count())
      .withContext('timePeriod.pristine should be called')
      .toBe(1);

    expect(startControlValuePropSpy.calls.count())
      .withContext('startControl.value should be called')
      .toBe(2);

    expect(endControlValuePropSpy.calls.count())
      .withContext('endControl.value should be called')
      .toBe(2);

    expect(startControlSpy.setErrors.calls.count())
      .withContext('startControl.setErrors should be called')
      .toBe(1);

    expect(endControlSpy.setErrors.calls.count())
      .withContext('endControl.setErrors should be called')
      .toBe(1);
  });
});
