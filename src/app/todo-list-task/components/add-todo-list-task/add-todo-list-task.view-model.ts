import { AddTodoListTaskRequestDto,
         TodoListTaskService,       } from 'src/app/todo-list-task/api';

export class AddTodoListTaskViewModel {
  private todoListIdValue: number | string | undefined;
  private todoListTaskIdValue: number | string | undefined;
  private taskValue: AddTodoListTaskRequestDto | undefined;

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get todoListId(): number | string {
    return this.todoListIdValue ?? 0;
  }

  public set todoListId(todoListId: number | string) {
    this.todoListIdValue = todoListId;
    this.task.todoListId = todoListId;
  }

  public get todoListTaskId(): number | string {
    return this.todoListTaskIdValue ?? 0;
  }

  public set todoListTaskId(todoListTaskId: number | string) {
    this.todoListTaskIdValue = todoListTaskId;
  }

  public get task(): AddTodoListTaskRequestDto {
    return this.taskValue ?? (this.taskValue = new AddTodoListTaskRequestDto(this.todoListId));
  }

  public set task(task: AddTodoListTaskRequestDto) {
    this.taskValue = task;
  }

  public add(): void {
    const responseDto = this.service.addTodoListTask(this.task);

    if (responseDto) {
      this.todoListTaskId = responseDto.todoListTaskId;
    }
  }
}
