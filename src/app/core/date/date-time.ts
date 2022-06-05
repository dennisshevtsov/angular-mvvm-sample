import { HOURS_IN_DAY,
         MILLISECONDS_IN_HOUR,
         MILLISECONDS_IN_MENUTE, } from './app-clock';

export class DateTime {
  private dateTimeValue: number;

  public constructor(value: number = 0) {
    this.dateTimeValue = value;
  }

  public get value(): number {
    return this.dateTimeValue;
  }

  public set day(value: number) {
    const dateTimeValue = this.dateTimeValue;
    const time = dateTimeValue % (HOURS_IN_DAY * MILLISECONDS_IN_HOUR);
    const day  = value - value % (HOURS_IN_DAY * MILLISECONDS_IN_HOUR);

    this.dateTimeValue = day + time;
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
