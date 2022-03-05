import { CompleteTodoListTaskRequestDto,
         DeleteTodoListTaskRequestDto,
         SearchTodoListTasksRecordResponseDto,
         SearchTodoListTasksRequestDto,
         TodoListTaskService,                  } from 'src/app/todo-list-task/api';

export class SearchTodoListTasksViewModel {
  private todoListIdValue: number | string | undefined;
  private recordValue: SearchTodoListTasksRecordResponseDto | undefined;
  private tasksValue: SearchTodoListTasksRecordResponseDto[] | undefined;

  public constructor(
    private readonly service: TodoListTaskService,
  ) {}

  public get todoListId(): number | string {
    return this.todoListIdValue ?? 0;
  }

  public set todoListId(todoListId: number | string) {
    this.todoListIdValue = todoListId;
  }

  public get selected(): SearchTodoListTasksRecordResponseDto {
    return this.recordValue ?? new SearchTodoListTasksRecordResponseDto(0);
  }

  public set selected(record: SearchTodoListTasksRecordResponseDto) {
    this.recordValue = record;
  }

  public get tasks(): SearchTodoListTasksRecordResponseDto[] {
    return this.tasksValue ?? [];
  }

  public set tasks(tasks: SearchTodoListTasksRecordResponseDto[]) {
    this.tasksValue = tasks;
  }

  public search(): void {
    const requestDto = new SearchTodoListTasksRequestDto(this.todoListId);
    const responseDtos = this.service.searchTodoListTasks(requestDto);

    this.tasks = responseDtos;
  }

  public complete(): void {
    const requestDto = new CompleteTodoListTaskRequestDto(
      this.todoListId,
      this.selected.todoListTaskId,
    );

    this.service.completeTodoListTask(requestDto);
  }

  public delete() {
    const requestDto = new DeleteTodoListTaskRequestDto(
      this.todoListId,
      this.selected.todoListTaskId,
    );

    this.service.deleteTodoListTask(requestDto);
    this.search();
  }
}
