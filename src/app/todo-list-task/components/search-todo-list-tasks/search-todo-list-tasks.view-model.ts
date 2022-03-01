import { SearchTodoListTasksRecordResponseDto, } from 'src/app/todo-list-task/api';

export class SearchTodoListTasksViewModel {
  private todoListIdValue: number | string | undefined;

  public get todoListId(): number | string {
    return this.todoListIdValue ?? 0;
  }

  public set todoListId(todoListId: number | string) {
    this.todoListIdValue = todoListId;
  }

  public get tasks(): SearchTodoListTasksRecordResponseDto[] {
    return [];
  }

  public search(): void {}

  public complete(): void {}

  public delete(record: SearchTodoListTasksRecordResponseDto) {}
}
