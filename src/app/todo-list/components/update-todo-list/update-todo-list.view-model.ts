import { GetTodoListRequestDto,
         TodoListService,
         UpdateTodoListRequestDto, } from 'src/app/todo-list/api';

export class UpdateTodoListViewModel {
  private todoListValue: UpdateTodoListRequestDto | undefined;

  public constructor(
    private readonly service: TodoListService,
  ) {}

  public get todoList(): UpdateTodoListRequestDto {
    return this.todoListValue ?? (this.todoListValue = new UpdateTodoListRequestDto());
  }

  public set todoList(todoList: UpdateTodoListRequestDto) {
    this.todoListValue = todoList;
  }

  public initialize(): void {
    const requestDto = new GetTodoListRequestDto(this.todoList.todoListId);
    const responseDto = this.service.getTodoList(requestDto);

    if (responseDto) {
      this.todoList.title = responseDto.title;
      this.todoList.description = responseDto.description;
    }
  }

  public update(): void {
    this.service.updateTodoList(this.todoList);
  }
}
