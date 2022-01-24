import { TodoListTaskDateDto, } from './todo-list-task-date-dto';

export class GetTodoListTaskResponseDto {
  public constructor(
    public title       : string              = '',
    public description : string              = '',
    public date        : TodoListTaskDateDto = new TodoListTaskDateDto(),
  ) { }
}
