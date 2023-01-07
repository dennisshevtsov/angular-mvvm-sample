import { Pipe          } from '@angular/core';
import { PipeTransform } from '@angular/core';

import { Formatter } from 'src/app/core/formatting';

import { SearchTodoListDayTaskResponseDto    } from 'src/app/todo-list-task/api';
import { SearchTodoListPeriodTaskResponseDto } from 'src/app/todo-list-task/api';

@Pipe({
  name: 'todoListTaskTime',
})
export class TodoListTaskTimePipe implements PipeTransform {
  public constructor(
    private formatter: Formatter,
  ) { }

  public transform(value: SearchTodoListDayTaskResponseDto | SearchTodoListPeriodTaskResponseDto): string {
    if (value instanceof SearchTodoListDayTaskResponseDto) {
      return this.formatter.toLocalDate(value.date);
    }

    if (value instanceof SearchTodoListPeriodTaskResponseDto) {
      const begin = this.formatter.toLocalDateTime(value.begin);
      const end   = this.formatter.toLocalDateTime(value.end);

      return `${begin} - ${end}`;
    }

    return '(no date)';
  }
}
