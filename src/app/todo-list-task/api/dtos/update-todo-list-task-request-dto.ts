import { TodoListTaskDateDto, } from './todo-list-task-date-dto';

export class UpdateTodoListTaskRequestDto {
  public constructor(
    public todoListId    : string              = '',
    public todoListTaskId: string              = '',
    public title         : string              = '',
    public description   : string              = '',
    public date          : TodoListTaskDateDto = new TodoListTaskDateDto(),
  ) {}
}
