import { inject, TestBed, } from '@angular/core/testing';

import { Formatter,       } from './formatter';

describe('Formatter', () => {
  beforeEach(() => TestBed.configureTestingModule({providers: [Formatter]}));

  it('toLocalDate return formatted date', inject([Formatter], (formatter: Formatter) => {
    const timezone = new Date().getTimezoneOffset() * 60 * 1000;

    const utcDateValue = Date.UTC(2022, 1, 28, 23, 59, 0, 0);
    const localDateValue = utcDateValue - timezone;

    const original = new Date(localDateValue);
    const formattedMonth = (original.getMonth() + 1).toLocaleString(undefined, {minimumIntegerDigits: 2});
    const formattedDay = original.getDate().toLocaleString(undefined, {minimumIntegerDigits: 2});
    const formatted = `${original.getFullYear()}-${formattedMonth}-${formattedDay}`;

    expect(formatter.toLocalDate(utcDateValue))
      .withContext('toLocalDate should use local datetime value')
      .toBe(formatted);
  }));
});
