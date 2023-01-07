import { GetTodoListTaskResponseDtoBase } from './get-todo-list-task-response-dto-base';

export class GetTodoListPeriodTaskResponseDto implements GetTodoListTaskResponseDtoBase {
  public constructor(
    public todoListId    : string  = '',
    public todoListTaskId: string  = '',
    public title         : string  = '',
    public description   : string  = '',
    public completed     : boolean = false,
    public begin         : number  = 0,
    public end           : number  = 0,
  ) { }
}
