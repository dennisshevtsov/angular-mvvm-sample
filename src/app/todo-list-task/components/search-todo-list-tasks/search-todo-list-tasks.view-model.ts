import { map, Observable, } from 'rxjs';

import { CompleteTodoListTaskRequestDto,
         DeleteTodoListTaskRequestDto,
         SearchTodoListTasksRecordResponseDto,
         SearchTodoListTasksRequestDto,
         TodoListTaskService,                  } from 'src/app/todo-list-task/api';

export class SearchTodoListTasksViewModel {
  private todoListIdValue: undefined | number | string;
  private recordValue    : undefined | SearchTodoListTasksRecordResponseDto;
  private tasksValue     : undefined | SearchTodoListTasksRecordResponseDto[];

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

  public search(): Observable<void> {
    const requestDto = new SearchTodoListTasksRequestDto(this.todoListId);

    return this.service.searchTodoListTasks(requestDto)
                       .pipe(map(responseDtos => {
                         this.tasks = responseDtos;
                       }));
  }

  public complete(): Observable<void> {
    const requestDto = new CompleteTodoListTaskRequestDto(
      this.todoListId,
      this.selected.todoListTaskId,
    );

    return this.service.completeTodoListTask(requestDto);
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
