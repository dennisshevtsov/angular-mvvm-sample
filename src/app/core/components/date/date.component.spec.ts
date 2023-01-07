import { NO_ERRORS_SCHEMA } from '@angular/core';

import { inject  } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { Formatter     } from 'src/app/core/formatting';
import { DateComponent } from './date.component';

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
      schemas: [NO_ERRORS_SCHEMA],
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
        .withContext('toLocalDate should take correct param')
        .toBe(numberDate);
  }));

  it('value should call onChange and onTouched', inject(
    [Formatter],
    (formatterSpy: jasmine.SpyObj<Formatter>) => {
      const numberDate = 10000;
      const formattedDate = 'formatted date';

      formatterSpy.fromLocalDate.and.returnValue(numberDate);
      formatterSpy.toLocalDate.and.returnValue(formattedDate);

      const fixture = TestBed.createComponent(DateComponent);

      fixture.componentInstance.writeValue(numberDate);

      let touched = false;
      fixture.componentInstance.registerOnTouched(() => touched = true);

      let onChange = (value: any) => {
        expect(value)
          .withContext('onChange should take correct param')
          .toBe(numberDate);
      };
      fixture.componentInstance.registerOnChange(onChange);
      fixture.componentInstance.setDisabledState(true);

      fixture.detectChanges();

      fixture.componentInstance.value = formattedDate;

      expect(formatterSpy.fromLocalDate.calls.count())
        .withContext('fromLocalDate should not be called')
        .toBe(0);

      fixture.componentInstance.setDisabledState(false);
      fixture.detectChanges();

      fixture.componentInstance.value = formattedDate;

      expect(formatterSpy.fromLocalDate.calls.count())
        .withContext('fromLocalDate should be called')
        .toBe(1);

      expect(formatterSpy.fromLocalDate.calls.first().args[0])
        .withContext('fromLocalDate should take correct param')
        .toBe(formattedDate);
  }));
});
