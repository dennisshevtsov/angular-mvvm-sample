import { Pipe, PipeTransform, } from '@angular/core';

import { Formatter,           } from 'src/app/core/formatting';

@Pipe({
  name: 'todoListTaskTime',
})
export class TodoListTaskTimePipe implements PipeTransform {
  public constructor(
    private formatter: Formatter,
  ) {}

  public transform(value: any): any {
    if (value.fullDay) {
      return this.formatter.toLocalDate(value.day);
    }

    const start = this.formatter.toLocalDateTime(value.start);
    const end   = this.formatter.toLocalDateTime(value.end);

    return `${start} - ${end}`;
  }
}
