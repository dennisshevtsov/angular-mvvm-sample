import { AddTodoListRequestDto,
         TodoListService,       } from 'src/app/todo-list/api';

export class AddTodoListViewModel {
  private todoListValue: AddTodoListRequestDto | undefined;

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get todoList(): AddTodoListRequestDto {
    return this.todoListValue ?? (this.todoListValue = new AddTodoListRequestDto());
  }

  public set todoList(todoList: AddTodoListRequestDto) {
    this.todoListValue = todoList;
  }

  public add(): void {
    this.service.addTodoList(this.todoList);
  }
}
