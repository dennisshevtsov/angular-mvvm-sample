import { SearchTodoListTasksRecordResponseDto, } from 'src/app/todo-list-task/api';

export class SearchTodoListTasksViewModel {
  public get tasks(): SearchTodoListTasksRecordResponseDto[] {
    return [];
  }

  public search(): void {}

  public complete(): void {}

  public delete(record: SearchTodoListTasksRecordResponseDto) {}
}
