import { HOURS_IN_DAY, MILLISECONDS_IN_HOUR,
         MILLISECONDS_IN_MENUTE, } from './app-clock';

export class DateTime {
  private dateTimeValue: number;

  public constructor(value: number) {
    this.dateTimeValue = value;
  }

  public get value(): number {
    return this.dateTimeValue;
  }

  public set day(value: number) {
    let dateTimeValue = this.dateTimeValue;

    dateTimeValue %= HOURS_IN_DAY * MILLISECONDS_IN_HOUR;
    dateTimeValue += value;

    this.dateTimeValue = dateTimeValue;
  }

  public increaseHours(step: number): void {
    this.dateTimeValue += MILLISECONDS_IN_HOUR * step;
  }

  public decreaseHours(step: number): void {
    this.dateTimeValue -= MILLISECONDS_IN_HOUR * step;
  }

  public increaseMinutes(step: number): void {
    this.dateTimeValue += MILLISECONDS_IN_MENUTE * step;
  }

  public decreaseMinutes(step: number): void {
    this.dateTimeValue -= MILLISECONDS_IN_MENUTE * step;
  }
}
