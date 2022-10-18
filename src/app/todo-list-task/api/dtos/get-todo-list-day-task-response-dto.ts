import { GetTodoListTaskResponseDtoBase, } from './get-todo-list-task-response-dto-base';

export class GetTodoListDayTaskResponseDto implements GetTodoListTaskResponseDtoBase {
  public constructor(
    public todoListId    : string  = '',
    public todoListTaskId: string  = '',
    public title         : string  = '',
    public description   : string  = '',
    public completed     : boolean = false,
    public date          : number  = 0,
  ) { }
}
