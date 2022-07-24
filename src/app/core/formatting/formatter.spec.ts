import { inject, TestBed, } from '@angular/core/testing';

import { Formatter,       } from './formatter';

describe('Formatter', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [Formatter]}));

  it('toLocalDate return formatted date', inject([Formatter], (formatter: Formatter) => {
    const utcDateValue = Date.UTC(2022, 1, 28, 23, 59, 0, 0);
    const original = new Date(utcDateValue);

    const formattedMonth = (original.getMonth() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const formattedDay = original.getDate().toLocaleString(undefined, {minimumIntegerDigits: 2});
    const formatted = `${original.getFullYear()}-${formattedMonth}-${formattedDay}`;

    expect(formatter.toLocalDate(utcDateValue))
      .withContext('toLocalDate should use local datetime value')
      .toBe(formatted);
  }));

  it('fromLocalDate return date', inject([Formatter], (formatter: Formatter) => {
    expect(formatter.fromLocalDate('2022-02-28'))
      .withContext('fromLocalDate should return parsed date')
      .toBe(Date.UTC(2022, 1, 28, 0, 0, 0, 0));
  }));

  it('toLocalTime return formatted time', inject([Formatter], (formatter: Formatter) => {
    const utcDateValue = Date.UTC(2022, 1, 28, 23, 59, 33, 0);
    const original = new Date(utcDateValue);

    const formattedHours = (original.getHours()).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const formattedMinutes = original.getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
    const formatted = `${formattedHours}:${formattedMinutes}`;

    expect(formatter.toLocalTime(utcDateValue))
      .withContext('toLocalTime should use local time value')
      .toBe(formatted);
  }));

  it('fromLocalTime return time', inject([Formatter], (formatter: Formatter) => {
    const timezone       = new Date().getTimezoneOffset() * 60 * 1000;
    const datetimeValue  = 14 * 60 * 60 * 1000 +
                           17 * 60 * 1000 +
                           timezone;
    const datetimeString = '14:17';

    expect(formatter.fromLocalTime(datetimeString))
      .withContext('fromLocalTime should return parsed time')
      .toBe(datetimeValue);
  }));

  it('toLocalHours return hours in local time', inject([Formatter], (formatter: Formatter) => {
    const utcHours         = 14;
    const utcMinuets       = 17;
    const utcDatetimeValue = utcHours   * 60 * 60 * 1000 +
                             utcMinuets * 60 * 1000 +
                             123;

    const timezoneInMinutes = new Date().getTimezoneOffset();
    const localHours = (((utcHours * 60 + utcMinuets - timezoneInMinutes) / 60) % 24) >> 0;

    expect(formatter.toLocalHours(utcDatetimeValue))
      .withContext('toLocalHours should return hours in local time')
      .toBe(localHours);
  }));
});
