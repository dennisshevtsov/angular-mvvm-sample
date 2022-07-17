import { inject, TestBed, } from '@angular/core/testing';

import { Formatter,     } from 'src/app/core/formatting';
import { TimeComponent, } from './time.component';

describe('TimeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeComponent],
      providers: [
        {
          provide: Formatter,
          useValue: jasmine.createSpyObj(
            Formatter,
            ['toLocalDate', 'fromLocalDate', 'toLocalHours', 'toLocalMinutes']),
        },
      ],
    })
  });

  it('', inject([Formatter], (formatterSpy: jasmine.SpyObj<Formatter>) => {
    const component = TestBed.createComponent(TimeComponent);

    const days = 3;
    const dateTimeValue = days * 24 * 60 * 60 * 1000;

    formatterSpy.toLocalDate.and.returnValue(days.toString());

    component.componentInstance.writeValue(dateTimeValue);
    component.detectChanges();

    expect(component.componentInstance.day)
      .withContext('day should return days in value')
      .toBe(days.toString());

    expect(formatterSpy.toLocalDate.calls.count())
      .withContext('toLocalDate should be called')
      .toBeGreaterThan(1);
  }));
});
