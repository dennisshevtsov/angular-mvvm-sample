import { TodoListTaskDateDto, } from './todo-list-task-date-dto';

export class AddTodoListTaskRequestDto {
  public constructor(
    public todoListId    : number | string     = 0,
    public title         : string              = '',
    public description   : string              = '',
    public date          : TodoListTaskDateDto = new TodoListTaskDateDto(),
  ) { }
}
