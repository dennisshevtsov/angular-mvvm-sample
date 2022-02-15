import { Pipe, PipeTransform, } from '@angular/core';

import { Formatter, } from 'src/app/core/formatting';

@Pipe({
  name: 'todoListTaskTime',
})
export class TodoListTaskTimePipe implements PipeTransform {
  public constructor(
    private formatter: Formatter,
  ) {}

  public transform(value: any): any {
    const day = this.formatter.toLocalDate(value.day);

    if (value.fullDay) {
      return day;
    }

    const start = this.formatter.toLocalTime(value.start);
    const end = this.formatter.toLocalTime(value.end);

    return `${day} ${start}-${end}`;
  }
}
