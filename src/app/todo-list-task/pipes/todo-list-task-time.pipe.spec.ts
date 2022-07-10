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

  it('transform should return date', inject(
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
});
