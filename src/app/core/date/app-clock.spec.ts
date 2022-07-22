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

  it('date should combine year, hours, and minutes in UTC', inject([AppClock], (appClock: AppClock) => {
    const date = new Date();

    const year = 2000;
    const getUTCFullYearSpy = spyOn(date, 'getUTCFullYear');
    getUTCFullYearSpy.and.returnValue(year);

    const month = 5;
    const getUTCMonthSpy = spyOn(date, 'getUTCMonth');
    getUTCMonthSpy.and.returnValue(month);

    const day = 11;
    const getUTCDateSpy = spyOn(date, 'getUTCDate');
    getUTCDateSpy.and.returnValue(day);

    const utc = 12345;
    const utcSpy = spyOn(Date, 'UTC');
    utcSpy.and.returnValue(utc);

    expect(appClock.date(date))
      .withContext('date should return UTC value')
      .toBe(utc);

    expect(getUTCFullYearSpy.calls.count())
      .withContext('getUTCFullYear should be called')
      .toBe(1);

    expect(getUTCDateSpy.calls.count())
      .withContext('getUTCDate should be called')
      .toBe(1);

    expect(getUTCDateSpy.calls.count())
      .withContext('getUTCDate should be called')
      .toBe(1);

    expect(utcSpy.calls.count())
      .withContext('Date.UTC should be called')
      .toBe(1);
  }));

  it('date should combine year, hours, and minutes in UTC', inject([AppClock], (appClock: AppClock) => {
    const date = 12345;
    const dateSpy = spyOn(appClock, 'date');
    dateSpy.and.returnValue(date);

    const time = 67890;
    const timeSpy = spyOn(appClock, 'time');
    timeSpy.and.returnValue(time);

    expect(appClock.now())
      .withContext('now should return currect value')
      .toBe(date + time);

    expect(dateSpy.calls.count())
      .withContext('date should be called')
      .toBe(1);

    expect(timeSpy.calls.count())
      .withContext('time should be called')
      .toBe(1);
  }));
});
