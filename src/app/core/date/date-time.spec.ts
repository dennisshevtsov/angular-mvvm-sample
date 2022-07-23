import { DateTime, } from './date-time';

describe('DateTime', () => {
  it('value should return full value', () => {
    const value = 123456789;
    const datetime = new DateTime(value);

    expect(datetime.value)
      .withContext('value prop should get full value')
      .toBe(value);
  });

  it ('day should set day', () => {
    const hours = 5;
    const minutes = 23;

    const datetime = new DateTime(Date.UTC(2022, 2, 28, hours, minutes));

    const year = 2021;
    const month = 12;
    const day = 31;

    datetime.day = Date.UTC(year, month, day, 23, 59);

    expect(datetime.value)
      .withContext('day prop should set only day and keep time')
      .toBe(Date.UTC(year, month, day, hours, minutes));
  });

  it ('increaseHours should add step hours', () => {
    const year = 2021;
    const month = 12;
    const day = 31;
    const hours = 5;
    const minutes = 23;

    const datetime = new DateTime(Date.UTC(year, month, day, hours, minutes));

    const step = 8;
    datetime.increaseHours(step);

    expect(datetime.value)
      .withContext('value should return value to that step hours was added')
      .toBe(Date.UTC(year, month, day, hours + step, minutes));
  });

  it ('decreaseHours should remove step hours', () => {
    const year = 2021;
    const month = 12;
    const day = 31;
    const hours = 5;
    const minutes = 23;

    const datetime = new DateTime(Date.UTC(year, month, day, hours, minutes));

    const step = 6;
    datetime.decreaseHours(step);

    expect(datetime.value)
      .withContext('value should return value from that step hours was removed')
      .toBe(Date.UTC(year, month, day, hours - step, minutes));
  });

  it ('increaseMinutes should add step minutes', () => {
    const year = 2021;
    const month = 12;
    const day = 31;
    const hours = 5;
    const minutes = 23;

    const datetime = new DateTime(Date.UTC(year, month, day, hours, minutes));

    const step = 7;
    datetime.increaseMinutes(step);

    expect(datetime.value)
      .withContext('value should return value to that step minutes was added')
      .toBe(Date.UTC(year, month, day, hours, minutes + step));
  });

  it ('decreaseMinutes should remove step minutes', () => {
    const year = 2021;
    const month = 12;
    const day = 31;
    const hours = 5;
    const minutes = 23;

    const datetime = new DateTime(Date.UTC(year, month, day, hours, minutes));

    const step = 15;
    datetime.decreaseMinutes(step);

    expect(datetime.value)
      .withContext('value should return value from that step minutes was removed')
      .toBe(Date.UTC(year, month, day, hours, minutes - step));
  });
});
