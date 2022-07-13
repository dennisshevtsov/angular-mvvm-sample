import { inject, TestBed, } from '@angular/core/testing';

import { Formatter,       } from 'src/app/core/formatting';
import { DateComponent,   } from './date.component';

describe('DateComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateComponent],
      providers: [
        {
          provide: Formatter,
          useValue: jasmine.createSpyObj(Formatter, ['toLocalDate', 'fromLocalDate']),
        },
      ],
    });
  });

  it('value should get formatted date', inject(
    [Formatter],
    (formatterSpy: jasmine.SpyObj<Formatter>) => {
      const numberDate = 10000;
      const formattedDate = 'formatted date';

      formatterSpy.toLocalDate.and.returnValue(formattedDate);

      const fixture = TestBed.createComponent(DateComponent);

      fixture.componentInstance.writeValue(numberDate);
      fixture.detectChanges();

      expect(fixture.componentInstance.value)
        .withContext('value should return formatted date')
        .toBe(formattedDate);

      expect(formatterSpy.toLocalDate.calls.count())
        .withContext('toLocalDate should be called')
        .toBeGreaterThan(1);

      expect(formatterSpy.toLocalDate.calls.first().args[0])
        .withContext('toLocalDate should take correct params')
        .toBe(numberDate);
  }));
});
