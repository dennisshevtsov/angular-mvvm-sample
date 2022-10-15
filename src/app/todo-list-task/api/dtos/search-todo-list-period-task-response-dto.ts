import { SearchTodoListTaskResponseDtoBase, } from './search-todo-list-task-response-dto-base';

export class SearchTodoListPeriodTaskResponseDto implements SearchTodoListTaskResponseDtoBase {
  public constructor(
    public todoListTaskId: string  = '',
    public completed     : boolean = false,
    public title         : string  = '',
    public description   : string  = '',
    public begin         : string  = '',
    public end           : string  = '',
  ) { }
}
