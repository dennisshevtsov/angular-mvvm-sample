import { TodoListTaskDateDto, } from './todo-list-task-date-dto';

export class SearchTodoListTasksRecordResponseDto {
  public constructor(
    public todoListTaskId: number | string     = 0,
    public completed     : boolean             = false,
    public title         : string              = '',
    public description   : string              = '',
    public date          : TodoListTaskDateDto = new TodoListTaskDateDto(),
  ) { }
}
