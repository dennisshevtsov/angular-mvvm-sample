import { inject, TestBed, } from '@angular/core/testing';

import { AppClock,        } from './app-clock';

describe('AppClock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppClock],
    });
  });

  it('time should combine hours and minutes in UTC', inject([AppClock], (appClock: AppClock) => {
    const date = new Date();

    const hours = 12;
    const getUTCHoursSpy = spyOn(date, 'getUTCHours');
    getUTCHoursSpy.and.returnValue(hours);

    const minutes = 23;
    const getUTCMinutesSpy = spyOn(date, 'getUTCMinutes');
    getUTCMinutesSpy.and.returnValue(minutes);

    expect(appClock.time(date))
      .withContext('time should return correct value')
      .toBe(hours * 60 * 60 * 1000 + minutes * 60 * 1000);

    expect(getUTCHoursSpy.calls.count())
      .withContext('getUTCHours should be called')
      .toBe(1);

    expect(getUTCMinutesSpy.calls.count())
      .withContext('getUTCMinutes should be called')
      .toBe(1);
  }));
});
