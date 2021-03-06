import { inject, TestBed,      } from '@angular/core/testing';

import { Formatter,            } from 'src/app/core';
import { TodoListTaskDateDto,  } from 'src/app/todo-list-task/api';
import { TodoListTaskTimePipe, } from './todo-list-task-time.pipe';

describe('TodoListTaskTimePipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoListTaskTimePipe,
        {
          provide: Formatter,
          useValue: jasmine.createSpyObj(Formatter, ['toLocalDate', 'toLocalDateTime']),
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
      const time = 'datetime';

      formatterSpy.toLocalDateTime.and.returnValue(time);

      const unformatted = new TodoListTaskDateDto(1000, false, 2000, 3000);
      const formatted = pipe.transform(unformatted);

      expect(formatted)
        .withContext('transform should return date')
        .toBe('datetime - datetime');

      expect(formatterSpy.toLocalDate.calls.count())
        .withContext('toLocalDate should not be called')
        .toBe(0);

      expect(formatterSpy.toLocalDateTime.calls.count())
        .withContext('toLocalDateTime should be called')
        .toBe(2);

      expect(formatterSpy.toLocalDateTime.calls.first().args[0])
        .withContext('toLocalDateTime should be called with correct params')
        .toBe(unformatted.start);

      expect(formatterSpy.toLocalDateTime.calls.mostRecent().args[0])
        .withContext('toLocalDateTime should be called with correct params')
        .toBe(unformatted.end);
  }));
});
