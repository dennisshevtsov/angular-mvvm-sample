import { GetTodoListTaskRequestDto, TodoListTaskService,
         UpdateTodoListTaskRequestDto, } from 'src/app/todo-list-task/api';

export class UpdateTodoListTaskViewModel {
  private todoListIdValue    : number | string | undefined;
  private todoListTaskIdValue: number | string | undefined;
  private taskValue          : UpdateTodoListTaskRequestDto | undefined;

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get todoListId(): number | string {
    return this.todoListIdValue ?? 0;
  }

  public set todoListId(todoListId: number | string) {
    this.todoListIdValue = todoListId;
  }

  public get todoListTaskId(): number | string {
    return this.todoListTaskIdValue ?? 0;
  }

  public set todoListTaskId(todoListTaskId: number | string) {
    this.todoListTaskIdValue = todoListTaskId;
  }

  public get task(): UpdateTodoListTaskRequestDto {
    return this.taskValue ?? new UpdateTodoListTaskRequestDto();
  }

  public set task(task: UpdateTodoListTaskRequestDto) {
    this.taskValue = task;
  }

  public initialize(): void {
    const requestDto = new GetTodoListTaskRequestDto(
      this.todoListId,
      this.todoListTaskId,
    );

    const responseDto = this.service.getTodoListTask(requestDto);

    if (responseDto) {
      this.task = new UpdateTodoListTaskRequestDto(
        this.todoListId,
        this.todoListTaskId,
        responseDto.title,
        responseDto.description,
        responseDto.date,
      );
    }
  }

  public update(): void {
    this.service.updateTodoListTask(this.task);
  }
}
