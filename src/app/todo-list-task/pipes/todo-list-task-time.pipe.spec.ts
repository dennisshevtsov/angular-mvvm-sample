import { inject, TestBed,              } from '@angular/core/testing';
import { Formatter,            } from 'src/app/core';
import { TodoListTaskDateDto } from '../api';

import { TodoListTaskTimePipe, } from './todo-list-task-time.pipe';

describe('TodoListTaskTimePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoListTaskTimePipe,
        {
          provide: Formatter,
          useValue: jasmine.createSpyObj(Formatter, ['toLocalDate', 'toLocalTime']),
        },
      ],
    });
  });

  it('transform should return day', inject(
    [
      Formatter,
      TodoListTaskTimePipe,
    ],
    (
      formatterSpy: jasmine.SpyObj<Formatter>,
      pipe        : TodoListTaskTimePipe,
    ) => {
      const date = 'day';

      formatterSpy.toLocalDate.and.returnValue(date);

      const unformatted = new TodoListTaskDateDto(1000, true);
      const formatted = pipe.transform(unformatted);

      expect(formatted)
        .withContext('transform should return date')
        .toBe(date);

      expect(formatterSpy.toLocalDate.calls.count())
        .withContext('toLocalDate should be called')
        .toBe(1);

      expect(formatterSpy.toLocalDate.calls.first().args[0])
        .withContext('toLocalDate should be called with correct params')
        .toBe(unformatted.day);
  }));

  it('transform should return full formatted date', inject(
    [
      Formatter,
      TodoListTaskTimePipe,
    ],
    (
      formatterSpy: jasmine.SpyObj<Formatter>,
      pipe        : TodoListTaskTimePipe,
    ) => {
      const date = 'day';
      const time = 'time';

      formatterSpy.toLocalDate.and.returnValue(date);
      formatterSpy.toLocalTime.and.returnValue(time);

      const unformatted = new TodoListTaskDateDto(1000, false, 2000, 3000);
      const formatted = pipe.transform(unformatted);

      expect(formatted)
        .withContext('transform should return date')
        .toBe('day time-time');

      expect(formatterSpy.toLocalDate.calls.count())
        .withContext('toLocalDate should be called')
        .toBe(1);

      expect(formatterSpy.toLocalTime.calls.count())
        .withContext('toLocalTime should be called')
        .toBe(2);

      expect(formatterSpy.toLocalDate.calls.first().args[0])
        .withContext('toLocalDate should be called with correct params')
        .toBe(unformatted.day);

      expect(formatterSpy.toLocalDate.calls.mostRecent().args[0])
        .withContext('toLocalDate should be called with correct params')
        .toBe(unformatted.day);
  }));
});
