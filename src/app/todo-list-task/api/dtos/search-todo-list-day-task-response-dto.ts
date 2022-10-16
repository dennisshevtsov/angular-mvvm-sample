import { SearchTodoListTaskResponseDtoBase, } from './search-todo-list-task-response-dto-base';

export class SearchTodoListDayTaskResponseDto implements SearchTodoListTaskResponseDtoBase {
  public constructor(
    public todoListTaskId: string  = '',
    public completed     : boolean = false,
    public title         : string  = '',
    public description   : string  = '',
    public date          : number  = 0,
  ) { }
}
