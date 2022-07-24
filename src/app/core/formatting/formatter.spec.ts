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
});
